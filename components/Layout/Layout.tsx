import { Header } from './Header'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <div className="text-white">
        <Header />
        <div className="pt-[52px]">{children}</div>
      </div>
    </>
  )
}
