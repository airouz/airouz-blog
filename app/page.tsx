import Link from 'next/link'
import { formatDate, getBlogPosts } from 'app/blog/utils'

export default function Page() {
  let allBlogs = getBlogPosts()
  const sorted = [...allBlogs].sort(
    (a, b) => new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime()
  )

  return (
    <section>
      <div className="my-8">
        <div className="space-y-8">
          {sorted.map((post) => (
            <Link
              key={post.slug}
              className="block group"
              href={`/blog/${post.slug}`}
            >
              <article className="flex flex-col space-y-2">
                <div className="flex items-baseline gap-3">
                  <time className="text-sm text-neutral-500 dark:text-neutral-500 tabular-nums shrink-0">
                    {formatDate(post.metadata.publishedAt, false)}
                  </time>
                  <h2 className="text-neutral-900 dark:text-neutral-100 tracking-tight font-medium group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
                    {post.metadata.title}
                  </h2>
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-2">
                  {post.metadata.summary}
                </p>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
