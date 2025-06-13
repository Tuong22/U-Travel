"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, Search } from "lucide-react"
import { Button } from "antd"
import Carousel from "../Carousel/Carousel"
import { hanoiProperties } from "../../mock/hanoi"
import PropertyCategoryCard from "../PropertyCategoryCard/PropertyCategoryCard"

export default function ExploreSection() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <section id="explore" className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          <h2 className="text-2xl font-bold">Explore</h2>
        </div>

        <Button
          type="primary"
          className="bg-orange-500 hover:bg-orange-600 rounded-full px-6"
          icon={<Search className="w-4 h-4" />}
        >
          Browse all
        </Button>
      </div>

      {/* Explore Carousel - only show when not collapsed */}
      {!collapsed && (
        <Carousel>
          {hanoiProperties.map((property) => (
            <PropertyCategoryCard key={property.id} property={property} />
          ))}
        </Carousel>
      )}
    </section>
  )
}
