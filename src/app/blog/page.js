import { getBlogPosts } from "./_data";
import BlogCard from "../components/BlogCard";
import HeaderBar from "../components/HeaderBar";

export default async function BlogListingPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <HeaderBar />
      <main className="main-content-area">
      <h2 className="page-title-hero">Our Blog</h2>
      <section className="blog-posts-grid" aria-label="Blog posts">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </section>
    </main>
    </>
  );
}
