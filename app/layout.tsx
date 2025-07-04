import type { Metadata } from 'next'
import './globals.css'
import Link from "next/link";

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <header>
          <Link href="/">
            <img src="/placeholder-logo.png" alt="Logo" style={{ cursor: "pointer" }} />
          </Link>
        </header>
        {children}
      </body>
    </html>
  )
}
