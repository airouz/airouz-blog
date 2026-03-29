import Link from 'next/link'
import { formatDate, getBlogPosts } from 'app/blog/utils'
import HomeContent from './home-content'

export default function Page() {
  let allBlogs = getBlogPosts()

  return <HomeContent posts={allBlogs} />
}
