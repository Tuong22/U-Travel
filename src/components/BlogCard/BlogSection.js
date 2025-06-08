import BlogCard from "./BlogCard"

export default function BlogSection({ blogPosts }) {
  const handleBlogClick = (blog) => {
    console.log("Blog clicked:", blog)
  }
  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {blogPosts.map((post) => (
          <BlogCard
            key={post.id}
            title={post.title}
            category={post.category}
            image={post.image}
            slug={post.slug}
            onClick={handleBlogClick}
          />
        ))}
      </div>
    </section>
  )
}
