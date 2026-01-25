"use client"

// page.tsx — Starter Tetel (formato espelhado do modelo Faça Caixa Agora)
// Padrão TetelPontocom — V0 Free Safe Mode
// PageView canônico fica no layout.tsx

import { useEffect, useRef, Suspense } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { Sparkles, ShieldCheck, Package } from "lucide-react"

declare global {
  interface Window {
    fbq?: any
    _fbq?: any
  }
}

function StarterTetelContent() {
  const searchParams = useSearchParams()
  const origem = searchParams.get("origem")
  const isFromTetel = origem?.toLowerCase() === "tetelpontocom"
  const scrollTracked = useRef(false)

  // ✅ Ajuste apenas se você quiser outro texto padrão no WhatsApp
  const WHATSAPP_BASE =
    "https://wa.me/5582999176900?text=Oi%2C+vim+pela+LP+Pacote+Starter+Tetel."

  // ✅ Checkout (compra)
  const CHECKOUT_URL = "https://pay.kiwify.com.br/OFdb2n2"

  useEffect(() => {
    // ViewContent (sem PageView)
    ;(window as any).fbq?.("track", "ViewContent", { page: "lp_starter_tetel" })

    const onScroll = () => {
      const scrollPercent =
        (window.scrollY + window.innerHeight) / document.body.scrollHeight

      if (scrollPercent >= 0.5 && !scrollTracked.current) {
        scrollTracked.current = true
        ;(window as any).fbq?.("trackCustom", "ScrollDepth50", { page: "lp_starter_tetel" })
      }
    }

    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  function openWhatsApp(message: string) {
    const url = `${WHATSAPP_BASE}%0A%0A${encodeURIComponent(message)}`
    window.open(url, "_blank", "noopener,noreferrer")
  }

  // CTA COMPRA (compra real) — evento + redireciona pro checkout
  function handleIntentBuy() {
    ;(window as any).fbq?.("trackCustom", "IntentBuy", { page: "lp_starter_tetel" })
    // pequena espera para o evento "pegar"
    setTimeout(() => {
      window.location.href = CHECKOUT_URL
    }, 150)
  }

  // CTA INTENÇÃO (WhatsApp) — evento + WhatsApp
  function handleIntentTalk() {
    ;(window as any).fbq?.("trackCustom", "IntentTalk", { page: "lp_starter_tetel" })
    openWhatsApp("Quero falar antes de comprar o Pacote Starter Tetel (compra assistida).")
  }

  const container = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"

  const texto = isFromTetel
    ? {
        titulo: "Você já deu o primeiro passo pela TetelPontocom.",
        subtitulo:
          "Agora complete seu kit de entrada com o Pacote Starter Tetel — o passo seguinte para crescer com propósito.",
      }
    : {
        titulo: "Você já deu o primeiro passo.",
        subtitulo:
          "O Pacote Starter Tetel organiza, direciona e consolida quem já iniciou sua jornada com IA e execução prática.",
      }

  return (
    <div className="min-h-screen text-[#1a1a1a] bg-[#FFF6EF]">
      {/* Header (mesma lógica do modelo) */}
      <header className="sticky top-0 z-50 backdrop-blur bg-white/60 border-b border-black/5">
        <div className={`${container} flex items-center justify-between py-3`}>
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            <span className="font-semibold">Pacote Starter Tetel</span>
          </div>

          <button
            onClick={handleIntentBuy}
            className="rounded-xl bg-[#1a1a1a] text-white px-4 py-2 text-sm font-semibold hover:opacity-90 transition"
          >
            Comprar agora
          </button>
        </div>
      </header>

      {/* Hero (formato espelhado do modelo, com a imagem atual) */}
      <section className="relative">
        <div className={`${container} py-10 md:py-16 grid md:grid-cols-2 gap-10 items-center`}>
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
              {texto.titulo}
            </h1>

            <p className="mt-4 text-lg text-[#222]">
              {texto.subtitulo}
            </p>

            <ul className="mt-6 space-y-2 text-sm text-[#2a2522] inline-block text-left">
              <li className="flex items-start gap-2">
                <span className="mt-0.5">✅</span>
                <span>Estrutura clara de execução</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5">✅</span>
                <span>Integração IA + humano</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5">✅</span>
                <span>Direção prática, sem promessas</span>
              </li>
            </ul>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              {/* CTA COMPRA */}
              <button
                onClick={handleIntentBuy}
                className="rounded-2xl bg-[#1a1a1a] text-white px-6 py-3 text-sm font-semibold"
              >
                Quero o Pacote Starter agora
              </button>

              {/* CTA INTENÇÃO (WhatsApp) */}
              <button
                onClick={handleIntentTalk}
                className="rounded-2xl bg-white/80 text-[#1a1a1a] px-6 py-3 text-sm font-semibold hover:bg-white transition border border-black/5"
              >
                Falar antes no WhatsApp
              </button>
            </div>

            {/* Microtexto (igual estrutura do modelo) */}
            <p className="mt-2 text-xs text-neutral-700">
              Compra assistida — início guiado no WhatsApp
            </p>

            <div className="mt-4 flex gap-6 justify-center md:justify-start text-sm text-[#1a1a1a]/80">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5" />
                Garantia de 7 dias
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Acesso guiado
              </div>
            </div>
          </div>

          {/* Imagem (mantendo a atual) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center md:justify-end"
          >
            <Image
              src="/images/hero-starter-tetel.png"
              alt="Pacote Starter Tetel — Minha IA Premium + Guia de Autoridade"
              width={900}
              height={900}
              priority
              className="max-w-[520px] w-full rounded-3xl shadow-xl"
            />
          </motion.div>
        </div>
      </section>

      {/* Rodapé simples (pode manter o seu atual se preferir) */}
      <footer className="border-t border-black/5 bg-white/60">
        <div className={`${container} py-8 text-xs text-neutral-700 text-center`}>
          © {new Date().getFullYear()} Tetel — Ecossistema de soluções simples e humanas.
        </div>
      </footer>
    </div>
  )
}

export default function StarterTetelPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FFF6EF]" />}>
      <StarterTetelContent />
    </Suspense>
  )
}
