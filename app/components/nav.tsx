import Link from 'next/link'
import Image from 'next/image'

export function Navbar() {
  return (
    <aside className="-ml-[8px] mb-16 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          className="flex flex-row items-center relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
          id="nav"
        >
          <div className="flex flex-row space-x-0 pr-10">
            <Link
              href="/"
              className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex items-center gap-2 relative py-1 px-2 m-1"
            >
              <Image
                src="/dog-logo.png"
                alt="airouz"
                width={24}
                height={24}
                className="rounded-sm"
              />
              <span className="font-medium">airouz</span>
            </Link>
          </div>
        </nav>
      </div>
    </aside>
  )
}
