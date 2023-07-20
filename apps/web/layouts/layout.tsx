import React, { ReactNode } from 'react'
import { Header } from './header'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  )
}

export default Layout
