import Link from "next/link";
import { getBlogPosts, getBlogPostBySlug } from "../_data";
import HeaderBar from "../../components/HeaderBar";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return (
      <>
        <HeaderBar />
        <main className="main-content-area blog-post-detail">
          <h2 className="page-title-hero">Blog Post Not Found</h2>
          <p>The requested blog post could not be found.</p>
          <Link href="/blog" className="them007-card__cta back-to-blog">
            Back to Blog <span className="them007-card__cta-arrow" aria-hidden>→</span>
          </Link>
        </main>
      </>
    );
  }

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  const titleText = post.title.replace(/<[^>]*>/g, "");

  return (
    <>
      <HeaderBar />
      <main
        className="main-content-area blog-post-detail"
        role="main"
        aria-label="Blog article"
      >
      <article itemScope itemType="https://schema.org/BlogPosting">
        <header>
          <h1
            className="blog-post__title"
            itemProp="headline"
            dangerouslySetInnerHTML={{ __html: post.title }}
          />

          <div className="blog-post-meta" role="doc-subtitle">
            {post.author && (
              <span itemProp="author" itemScope itemType="https://schema.org/Person">
                <span itemProp="name">By {post.author}</span>
              </span>
            )}
            {formattedDate && (
              <time dateTime={post.publishedAt} itemProp="datePublished">
                Published: {formattedDate}
              </time>
            )}
            {post.topic && (
              <span className="blog-post-meta__topic">
                Topic: <span itemProp="articleSection">{post.topic}</span>
              </span>
            )}
          </div>
        </header>

        {post.fullpageImg && (
          <div className="blog-post-image-container">
            <img
              src={post.fullpageImg}
              alt={titleText}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        )}

        <div
          className="blog-post-content"
          itemProp="articleBody"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <nav aria-label="Blog navigation">
          <Link
            href="/blog"
            className="them007-card__cta back-to-blog"
            aria-label="Back to blog listing"
          >
            Back to Blog <span className="them007-card__cta-arrow" aria-hidden>→</span>
          </Link>
        </nav>
      </article>
    </main>
    </>
  );
}
