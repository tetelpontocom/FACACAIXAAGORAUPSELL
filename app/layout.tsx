import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Pacote Starter Tetel · Oferta exclusiva',
  description: 'Complete seu kit de entrada no ecossistema TetelPontocom com o Pacote Starter Tetel.',
  generator: 'v0.app',
  openGraph: {
    title: 'Pacote Starter Tetel',
    description: 'Um passo estruturado para quem já começou e quer avançar com clareza.',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
