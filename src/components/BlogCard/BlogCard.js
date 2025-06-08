export default function BlogCard({ title, category, image, slug, onClick }) {
  const handleCardClick = () => {
    if (onClick) {
      onClick({ title, category, image, slug })
    }
  }

  return (
    <div className="flex flex-col cursor-pointer" onClick={handleCardClick}>
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-200">
        <img
          src={image || "/placeholder.svg?height=400&width=400"}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="mt-3">
        <h3 className="text-lg font-medium text-gray-800">{title}</h3>
        <p className="mt-1 text-sm text-gray-500">{category}</p>
      </div>
    </div>
  )
}
