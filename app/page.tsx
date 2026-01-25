"use client"

import { useEffect } from "react"
import Image from "next/image"

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

export default function StarterTetelPage() {
  useEffect(() => {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "PageView")
      window.fbq("track", "ViewContent", {
        page: "lp_starter_tetel",
      })
    }
  }, [])

  return (
    <main className="min-h-screen bg-[#FFF6EF] text-[#1F1A17]">
      {/* HERO — imagem atual mantida */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-12">
        <Image
          src="/images/hero-starter-tetel.png"
          alt="Pacote Starter Tetel"
          width={1600}
          height={900}
          priority
          className="rounded-2xl shadow-md"
        />
      </section>

      {/* CONTEÚDO */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">
          Você já deu o primeiro passo.
        </h1>
        <p className="text-[#4B423C] mb-6">
          O Pacote Starter Tetel organiza, direciona e consolida quem já iniciou
          sua jornada com IA e execução prática.
        </p>

        <ul className="space-y-3 text-sm mb-8">
          <li>✔️ Estrutura clara de execução</li>
          <li>✔️ Integração IA + humano</li>
          <li>✔️ Direção prática, sem promessas</li>
        </ul>

        <a
          href="https://pay.kiwify.com.br/OFdb2n2"
          className="inline-block bg-[#1F1A17] text-white px-6 py-3 rounded-xl"
          onClick={() => {
            if (window.fbq) {
              window.fbq("track", "AddToCart", {
                produto: "pacote_starter_tetel",
              })
            }
          }}
        >
          Quero o Pacote Starter agora
        </a>
      </section>
    </main>
  )
}
