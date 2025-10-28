import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Pacote Starter Tetel · Oferta exclusiva pós-compra",
  description:
    "Complete seu kit de entrada no digital com o Pacote Starter Tetel — conteúdo e benefícios para acelerar seus resultados.",
  openGraph: {
    title: "Pacote Starter Tetel · Upsell",
    description:
      "Aproveite a oportunidade única: Guia Bônus de Autoridade e Presença, 20% OFF em Instagram Analyzer e acesso antecipado ao TetelPontocom.",
    type: "website",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
