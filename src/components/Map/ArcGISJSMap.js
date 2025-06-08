import { useEffect, useRef, useState } from "react"
import MapView from "@arcgis/core/views/MapView"
import Map from "@arcgis/core/Map"
import Graphic from "@arcgis/core/Graphic"
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer"
import Point from "@arcgis/core/geometry/Point"

export default function ArcGISJSAPI({ properties, zoomToCoordinates }) {
  const mapDiv = useRef(null)
  const viewRef = useRef(null)
  const graphicsLayerRef = useRef(null)
  const [popupData, setPopupData] = useState(null)
  const [screenPosition, setScreenPosition] = useState(null)
  const [isViewReady, setIsViewReady] = useState(false)

  const updateScreenPosition = (data) => {
    if (!viewRef.current || !isViewReady) {
      return
    }

    const view = viewRef.current

    try {
      if (
        typeof data.longitude !== "number" ||
        typeof data.latitude !== "number" ||
        isNaN(data.longitude) ||
        isNaN(data.latitude)
      ) {
        return
      }

      if (!view.ready) {
        view.when(() => {
          updateScreenPosition(data)
        })
        return
      }

      const point = new Point({
        longitude: data.longitude,
        latitude: data.latitude,
        spatialReference: view.spatialReference,
      })

      const screen = view.toScreen(point)
      const container = view.container
      const width = container.clientWidth
      const height = container.clientHeight

      if (
        screen &&
        typeof screen.x === "number" &&
        typeof screen.y === "number" &&
        !isNaN(screen.x) &&
        !isNaN(screen.y) &&
        screen.x >= 0 &&
        screen.x <= width &&
        screen.y >= 0 &&
        screen.y <= height
      ) {
        setScreenPosition(screen)
      } else {
        setScreenPosition(null)
      }
    } catch (error) {
      setScreenPosition(null)
    }
  }

  const zoomToLocation = (coordinates, zoomLevel = 16) => {
    if (!viewRef.current || !isViewReady || !coordinates || coordinates.length < 2) {
      return
    }

    try {
      const view = viewRef.current

      view
        .goTo(
          {
            center: [coordinates[0], coordinates[1]],
            zoom: zoomLevel,
          },
          {
            duration: 1000, 
            easing: "ease-in-out",
          },
        )
        .catch((error) => {
          console.error("Error zooming to location:", error)
        })
    } catch (error) {
      console.error("Error in zoomToLocation:", error)
    }
  }

  const updateMarkers = () => {
    if (!viewRef.current || !graphicsLayerRef.current || !isViewReady) {
      return
    }

    try {
      graphicsLayerRef.current.removeAll()

      properties.forEach((spot) => {
        if (!spot.coordinates || spot.coordinates.length < 2) {
          console.warn("Invalid coordinates for property:", spot)
          return
        }

        const point = new Point({
          longitude: spot.coordinates[0],
          latitude: spot.coordinates[1],
        })

        const graphic = new Graphic({
          geometry: point,
          symbol: {
            type: "simple-marker",
            color: [255, 0, 0],
            size: 12,
            outline: {
              color: [255, 255, 255],
              width: 2,
            },
          },
          attributes: {
            title: spot.title,
            address: spot.address,
            latitude: spot.coordinates[1],
            longitude: spot.coordinates[0],
          },
          popupTemplate: null,
        })

        graphicsLayerRef.current.add(graphic)
      })

      console.log(`Updated map with ${properties.length} markers`)
    } catch (error) {
      console.error("Error updating markers:", error)
    }
  }

  useEffect(() => {
    if (zoomToCoordinates && isViewReady) {
      zoomToLocation(zoomToCoordinates)
    }
  }, [zoomToCoordinates, isViewReady])

  useEffect(() => {
    if (isViewReady && properties) {
      updateMarkers()
    }
  }, [properties, isViewReady])

  useEffect(() => {
    if (popupData && isViewReady) {
      updateScreenPosition(popupData)
    } else {
      setScreenPosition(null)
    }
  }, [popupData, isViewReady])

  useEffect(() => {
    if (!popupData || !viewRef.current || !isViewReady) return

    const view = viewRef.current
    const watcher = view.watch("extent", () => {
      if (popupData) {
        updateScreenPosition(popupData)
      }
    })

    return () => watcher.remove()
  }, [popupData, isViewReady])

  useEffect(() => {
    if (!mapDiv.current) {
      return
    }

    try {
      const map = new Map({
        basemap: "streets-vector",
      })

      const view = new MapView({
        container: mapDiv.current,
        map,
        center: [105.85, 21.03],
        zoom: 10,
      })

      viewRef.current = view

      const graphicsLayer = new GraphicsLayer({})
      graphicsLayerRef.current = graphicsLayer
      map.add(graphicsLayer)

      view
        .when(() => {
          setIsViewReady(true)

          view.on("click", async (event) => {
            try {
              const response = await view.hitTest(event)

              if (response.results && response.results.length > 0) {
                const result = response.results.find((r) => r.graphic?.attributes?.title)

                if (result && result.graphic) {
                  const attributes = result.graphic.attributes
                  const popupInfo = {
                    title: attributes.title,
                    address: attributes.address,
                    latitude: attributes.latitude,
                    longitude: attributes.longitude,
                  }
                  setPopupData(popupInfo)
                } else {
                  setPopupData(null)
                }
              } else {
                setPopupData(null)
              }
            } catch (error) {
              console.error("Error in click handler:", error)
            }
          })
        })
        .catch((error) => {
          console.error("Error initializing view:", error)
        })
    } catch (error) {
      console.error("Error creating map:", error)
    }

    return () => {
      if (viewRef.current) {
        try {
          viewRef.current.destroy()
          viewRef.current = null
          graphicsLayerRef.current = null
          setIsViewReady(false)
        } catch (error) {
          console.error("Error cleaning up view:", error)
        }
      }
    }
  }, [])

  return (
    <div className="relative w-full h-screen">
      <div ref={mapDiv} className="w-full h-full" />
      <CustomPopup
        screen={screenPosition}
        data={popupData}
        onClose={() => {
          setPopupData(null)
          setScreenPosition(null)
        }}
      />
    </div>
  )
}

function CustomPopup({ screen, data, onClose }) {
  if (!screen || !data) return null

  if (isNaN(screen.x) || isNaN(screen.y)) {
    console.error("Invalid screen position:", screen)
    return null
  }

  const style = {
    position: "absolute",
    left: Math.max(10, screen.x + 10),
    top: Math.max(10, screen.y - 80),
    background: "white",
    padding: "12px",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    zIndex: 1000,
    minWidth: "200px",
    maxWidth: "300px",
    border: "1px solid #ccc",
  }

  return (
    <div style={style}>
      <div className="flex justify-between items-start mb-2">
        <strong className="text-lg">{data.title}</strong>
        <button
          onClick={onClose}
          className="ml-2 text-gray-500 hover:text-gray-700 text-xl leading-none"
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          ×
        </button>
      </div>
      <p className="text-sm text-gray-600 mb-2">{data.address}</p>
    </div>
  )
}
