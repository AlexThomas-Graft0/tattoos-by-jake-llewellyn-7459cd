import { CookieBanner } from "@/components/CookieBanner";
import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'Tattoos by Jake Llewellyn',
  description: 'Tattoos by Jake Llewellyn',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-[#FBFBF9] text-[#1C293C] min-h-screen antialiased selection:bg-[#FDC800] selection:text-[#1C293C]">
        {children}
              <CookieBanner />
      </body>
    </html>
  )
}