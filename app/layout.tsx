import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { MainNav } from '@/components/ui/navbar'
import { ToasterProvider } from '@/providers/toast-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Postamat Dashboard',
  description: 'Postamat dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" >
      <body className={inter.className}>
      <ToasterProvider />
      <MainNav className="mx-6 my-4" />
        {children}</body>
    </html>
  )
}
