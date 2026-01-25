"use client"

import { useEffect, useRef, Suspense } from "react"
import Image from "next/image"
import { useSearchParams } from "next/navigation"

declare global {
  interface Window {
    fbq?: any
  }
}

function StarterContent() {
  const params = useSearchParams()
  const origem = params.get("origem")?.toLowerCase()
  const isFromTetel = origem === "tetelpontocom"

  const scrollTracked = useRef(false)

  // WhatsApp único para TODAS as CTAs
  const WHATSAPP_URL =
    "https://wa.me/5582999176900?text=Oi%2C+vim+pela+LP+Pacote+Starter+Tetel.+Quero+falar+antes+de+comprar+(compra+assistida)."

  const fbq = (...args: any[]) => {
    try {
      if (typeof window !== "undefined" && window.fbq) window.fbq(...args)
    } catch {}
  }

  useEffect(() => {
    fbq("track", "ViewContent", { page: "lp_starter_tetel" })

    const onScroll = () => {
      const pct = (window.scrollY + window.innerHeight) / document.body.scrollHeight
      if (pct >= 0.5 && !scrollTracked.current) {
        scrollTracked.current = true
        fbq("trackCustom", "ScrollDepth50", { page: "lp_starter_tetel" })
      }
    }

    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // CTA principal (mantém IntentBuy, mas leva ao WhatsApp)
  const handleBuy = () => {
    fbq("trackCustom", "IntentBuy", { page: "lp_starter_tetel" })
    setTimeout(() => {
      window.open(WHATSAPP_URL, "_blank", "noopener,noreferrer")
    }, 150)
  }

  // CTA de intenção (WhatsApp)
  const handleTalk = () => {
    fbq("trackCustom", "IntentTalk", { page: "lp_starter_tetel" })
    setTimeout(() => {
      window.open(WHATSAPP_URL, "_blank", "noopener,noreferrer")
    }, 150)
  }

  return (
    <main className="min-h-screen bg-[#FFF6EF] text-[#1F1A17]">
      <header className="sticky top-0 z-50 backdrop-blur bg-white/60 border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="font-semibold">Pacote Starter Tetel</div>
          <button
            onClick={handleBuy}
            className="rounded-xl bg-[#1F1A17] text-white px-4 py-2 text-sm font-semibold hover:opacity-90 transition"
          >
            Comprar agora
          </button>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
            {isFromTetel ? "Você já deu o primeiro passo pela TetelPontocom." : "Você já deu o primeiro passo."}
          </h1>

          <p className="mt-4 text-base md:text-lg text-[#4B423C]">
            O Pacote Starter Tetel organiza, direciona e consolida quem já iniciou sua jornada com IA e execução prática.
          </p>

          <ul className="mt-6 space-y-2 text-sm text-[#4B423C]">
            <li>✅ Estrutura clara de execução</li>
            <li>✅ Integração IA + humano</li>
            <li>✅ Direção prática, sem promessas</li>
          </ul>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleBuy}
              className="rounded-2xl bg-[#1F1A17] text-white px-6 py-3 text-sm font-semibold whitespace-nowrap"
            >
              Quero o Pacote Starter agora
            </button>

            <button
              onClick={handleTalk}
              className="rounded-2xl bg-white/80 text-[#1F1A17] px-6 py-3 text-sm font-semibold hover:bg-white transition border border-black/5 whitespace-nowrap"
            >
              Falar antes no WhatsApp
            </button>
          </div>

          <p className="mt-2 text-xs text-[#4B423C]">
            Compra assistida — início guiado no WhatsApp
          </p>

          <div className="mt-4 flex gap-6 text-sm text-[#1F1A17]/80">
            <span>🛡️ Garantia de 7 dias</span>
            <span>✨ Acesso guiado</span>
          </div>
        </div>

        <div className="flex justify-center md:justify-end">
          <Image
            src="/images/hero-pacotestarter.png"
            alt="Pacote Starter Tetel"
            width={900}
            height={900}
            priority
            className="max-w-[560px] w-full rounded-3xl shadow-xl"
          />
        </div>
      </section>

      <footer className="border-t border-black/5 bg-white/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 text-xs text-center text-neutral-700">
          © 2026 Tetel — Ecossistema de soluções simples e humanas.
        </div>
      </footer>
    </main>
  )
}

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FFF6EF]" />}>
      <StarterContent />
    </Suspense>
  )
}
