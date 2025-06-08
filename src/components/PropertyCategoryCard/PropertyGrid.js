import PropertyCategoryCard from "./PropertyCategoryCard";

export default function PropertyGrid({ properties, title }) {
  return (
    <section className="pt-12 px-4 max-w-7xl mx-auto">
      {title && (
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
          <div className="w-16 h-1 bg-gray-800 mt-4"></div>
        </div>
      )}

      <div className="grid grid-cols-1 min-[600px]:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <PropertyCategoryCard key={property.id} property={property} />
        ))}
      </div>
    </section>
  )
}
