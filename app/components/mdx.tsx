import Link from 'next/link'
import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { highlight } from 'sugar-high'
import React from 'react'
import remarkGfm from 'remark-gfm'
import { MermaidDiagram } from './mermaid'

function Pre({ children, ...props }: React.ComponentProps<'pre'>) {
  const codeEl = children as React.ReactElement
  const code = codeEl?.props?.children
  const className: string = codeEl?.props?.className || ''
  const language = className.replace(/language-/, '')

  if (language === 'mermaid') {
    const chart = String(code).replace(/\n$/, '')
    return <MermaidDiagram chart={chart} />
  }

  return (
    <pre {...props}>
      <code className={className}>{code}</code>
    </pre>
  )
}

function Table({ data }: { data: { headers: string[]; rows: string[][] } }) {
  let headers = data.headers.map((header, index) => (
    <th key={index}>{header}</th>
  ))
  let rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ))

  return (
    <div className="my-4 overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-800">
      <table>
        <thead>
          <tr>{headers}</tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  )
}

function CustomLink({ href, children, ...rest }: { href?: string; children?: React.ReactNode } & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (!href) return <a {...rest}>{children}</a>

  if (href.startsWith('/')) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    )
  }

  if (href.startsWith('#')) {
    return <a href={href} {...rest}>{children}</a>
  }

  return <a target="_blank" rel="noopener noreferrer" href={href} {...rest}>{children}</a>
}

function RoundedImage({ alt, ...rest }: React.ComponentProps<typeof Image>) {
  return <Image alt={alt || ''} className="rounded-lg" {...rest} />
}

function Code({ children, ...props }: React.ComponentProps<'code'>) {
  let codeHTML = highlight(String(children))
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />
}

function slugify(str: React.ReactNode): string {
  const text = React.Children.toArray(str)
    .map((child) => (typeof child === 'string' ? child : ''))
    .join('')
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/&/g, '-and-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-+/g, '-')
}

function createHeading(level: number) {
  const Heading = ({ children }: { children: React.ReactNode }) => {
    let slug = slugify(children)
    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement('a', {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: 'anchor',
        }),
      ],
      children
    )
  }

  Heading.displayName = `Heading${level}`

  return Heading
}

let components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  a: CustomLink,
  code: Code,
  pre: Pre,
}

export function CustomMDX(props: { source: string; components?: Record<string, React.ComponentType> }) {
  return (
    <MDXRemote
      {...props}
      options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
      components={{ ...components, ...(props.components || {}) }}
    />
  )
}
