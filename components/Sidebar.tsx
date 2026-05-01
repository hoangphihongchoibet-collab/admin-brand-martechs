'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Image, Building2, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect } from 'react'

const navItems = [
  { href: '/admin/brands', label: 'Brands', icon: Building2 },
  { href: '/admin/banners', label: 'Banners', icon: Image },
]

const SIDEBAR_EXPANDED = '200px'
const SIDEBAR_COLLAPSED = '52px'

export default function Sidebar() {
  const pathname = usePathname()
  const [hovered, setHovered] = useState<string | null>(null)
  const [collapsed, setCollapsed] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('sidebar_collapsed') === 'true'
    setCollapsed(stored)
    document.documentElement.style.setProperty('--sidebar-w', stored ? SIDEBAR_COLLAPSED : SIDEBAR_EXPANDED)
    setMounted(true)
  }, [])

  const toggle = () => {
    const next = !collapsed
    setCollapsed(next)
    localStorage.setItem('sidebar_collapsed', String(next))
    document.documentElement.style.setProperty('--sidebar-w', next ? SIDEBAR_COLLAPSED : SIDEBAR_EXPANDED)
  }

  return (
    <aside style={{
      width: mounted ? (collapsed ? SIDEBAR_COLLAPSED : SIDEBAR_EXPANDED) : SIDEBAR_EXPANDED,
      background: '#FFFFFF',
      borderRight: '1px solid var(--border)',
      height: '100vh',
      position: 'fixed',
      top: 0,
      left: 0,
      display: 'flex',
      flexDirection: 'column',
      transition: 'width 0.2s ease',
      overflow: 'hidden',
      zIndex: 50,
    }}>

      {/* Header */}
      <div style={{
        height: '52px',
        padding: '0 14px',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: collapsed ? 'center' : 'space-between',
        flexShrink: 0,
      }}>
        {!collapsed && (
          <span style={{
            fontSize: '13px', fontWeight: 700,
            color: 'var(--text)', whiteSpace: 'nowrap',
            letterSpacing: '-0.01em',
          }}>
            MartechS Banners
          </span>
        )}
        <button
          onClick={toggle}
          title={collapsed ? 'Mở rộng' : 'Thu nhỏ'}
          style={{
            background: 'none', border: 'none',
            cursor: 'pointer', color: 'var(--text-muted)',
            padding: '5px', borderRadius: '6px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, transition: 'color 0.12s, background 0.12s',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-hover)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--text)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'none'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)' }}
        >
          {collapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
        </button>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '10px 6px' }}>
        {!collapsed && (
          <div style={{
            fontSize: '10px', fontWeight: 600, color: 'var(--text-muted)',
            padding: '6px 8px 8px',
            textTransform: 'uppercase', letterSpacing: '0.07em',
            whiteSpace: 'nowrap',
          }}>
            Navigation
          </div>
        )}
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              onMouseEnter={() => setHovered(href)}
              onMouseLeave={() => setHovered(null)}
              title={collapsed ? label : undefined}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: collapsed ? 'center' : 'flex-start',
                gap: collapsed ? 0 : '9px',
                padding: collapsed ? '9px' : '8px 10px',
                borderRadius: '7px',
                textDecoration: 'none',
                fontSize: '13px',
                fontWeight: isActive ? 600 : 400,
                marginBottom: '2px',
                transition: 'all 0.12s',
                whiteSpace: 'nowrap',
                color: isActive ? '#2563EB' : 'var(--text-secondary)',
                background: isActive ? '#EFF6FF' : hovered === href ? '#F8FAFC' : 'transparent',
                borderLeft: collapsed ? 'none' : `3px solid ${isActive ? '#2563EB' : 'transparent'}`,
              }}
            >
              <Icon size={15} strokeWidth={isActive ? 2.2 : 1.8} style={{ flexShrink: 0 }} />
              {!collapsed && label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div style={{
          padding: '12px 16px',
          borderTop: '1px solid var(--border)',
          fontSize: '11px', color: 'var(--text-muted)',
          whiteSpace: 'nowrap',
        }}>
          Ad Banner System
        </div>
      )}
    </aside>
  )
}
