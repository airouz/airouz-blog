'use client'

import { useEffect, useId, useRef, useState } from 'react'

export function MermaidDiagram({ chart }: { chart: string }) {
   const [svg, setSvg] = useState('')
  const [error, setError] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)
  const id = useId()

  useEffect(() => {
    const mermaidId = `mermaid-${id.replace(/:/g, '-')}`

    import('mermaid').then(({ default: mermaid }) => {
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: 'loose',
        fontFamily: 'inherit',
        theme: 'default',
      })

      mermaid
        .render(mermaidId, chart)
        .then(({ svg }: { svg: string }) => {
          setSvg(svg)
        })
        .catch((err: Error) => {
          setError(err.message)
        })
    })
  }, [chart, id])

  if (error) {
    return (
      <pre style={{ color: 'red', padding: '1rem', overflow: 'auto' }}>
        <code>Mermaid Error: {error}</code>
      </pre>
    )
  }

  if (!svg) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100px',
          opacity: 0.5,
        }}
      >
        Loading diagram...
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="mermaid-diagram notflex justify-center my-6 overflow-x-auto"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}
