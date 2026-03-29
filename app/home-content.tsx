'use client'

import Link from 'next/link'
import { useState } from 'react'
import { formatDate } from './blog/utils-client'

type SortKey = 'date' | 'title'

type Post = {
  slug: string
  metadata: {
    title: string
    publishedAt: string
    summary: string
    image?: string
  }
}

export default function HomeContent({ posts }: { posts: Post[] }) {
  const [sortBy, setSortBy] = useState<SortKey>('date')

  const sorted = [...posts].sort((a, b) => {
    if (sortBy === 'title') {
      return a.metadata.title.localeCompare(b.metadata.title, 'ko')
    }
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime()
  })

  return (
    <section>
      <div className="my-8">
        <div className="flex items-center gap-2 mb-6">
          <button
            onClick={() => setSortBy('date')}
            className={`px-3 py-1 text-xs rounded-md transition-colors ${
              sortBy === 'date'
                ? 'bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100'
                : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'
            }`}
          >
            최신순
          </button>
          <button
            onClick={() => setSortBy('title')}
            className={`px-3 py-1 text-xs rounded-md transition-colors ${
              sortBy === 'title'
                ? 'bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100'
                : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'
            }`}
          >
            제목순
          </button>
        </div>
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
