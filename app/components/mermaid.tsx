'use client'

import { useEffect, useRef } from 'react'
import mermaid from 'mermaid'

mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  themeVariables: {
    background: '#171717',
    primaryColor: '#3b82f6',
    primaryTextColor: '#e5e5e5',
    primaryBorderColor: '#404040',
    lineColor: '#737373',
    secondaryColor: '#262626',
    tertiaryColor: '#1e1e1e',
    fontFamily: 'inherit',
  },
})

export function MermaidDiagram({ chart }: { chart: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const id = `mermaid-${Math.random().toString(36).slice(2, 9)}`

    const render = async () => {
      try {
        const { svg } = await mermaid.render(id, chart)
        if (containerRef.current) {
          containerRef.current.innerHTML = svg
        }
      } catch (e) {
        if (containerRef.current) {
          containerRef.current.textContent = chart
          containerRef.current.className = 'mermaid-error'
        }
      }
    }

    render()

    return () => {
      const el = document.getElementById(id)
      if (el) el.remove()
    }
  }, [chart])

  return (
    <div
      ref={containerRef}
      className="my-6 flex justify-center overflow-x-auto"
    />
  )
}
