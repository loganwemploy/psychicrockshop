import Link from "next/link";

export default function BlogCard({ post }) {
  const titlePlain = post.title.replace(/<[^>]*>/g, "");

  return (
    <article
      className="them007-card"
      key={post.id}
      itemScope
      itemType="https://schema.org/BlogPosting"
    >
      <span
        className="them007-card__icon"
        style={{ backgroundColor: post.color }}
        aria-hidden
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden
        >
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
          />
        </svg>
      </span>

      <Link
        href={`/blog/${post.slug}`}
        className="them007-card__title-link"
        itemProp="url"
      >
        <h3
          className="them007-card__title"
          itemProp="headline"
          dangerouslySetInnerHTML={{ __html: post.title }}
        />
      </Link>

      <p
        className="them007-card__description"
        itemProp="description"
        dangerouslySetInnerHTML={{ __html: post.excerpt }}
      />

      <Link
        href={`/blog/${post.slug}`}
        className="them007-card__cta"
        aria-label={`Read more: ${titlePlain}`}
      >
        Read more <span className="them007-card__cta-arrow" aria-hidden>→</span>
      </Link>
    </article>
  );
}
