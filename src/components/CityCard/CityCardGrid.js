import CityCard from "./CityCard"

export default function CityCardGrid({ cities, onClick }) {
  return (
    <section className="py-8 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {cities.map((city) => (
          <CityCard
            key={city.id}
            id={city.id}
            name={city.name}
            country={city.country}
            image={city.image}
            onClick={onClick}
            avatar={city.avatar}
          />
        ))}
      </div>
    </section>
  )
}
