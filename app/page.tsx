"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { CheckCircle2, CheckCircle, Rocket, ArrowRight, Home } from "lucide-react"
import Image from "next/image"

declare global {
  interface Window {
    fbq?: any
    _fbq?: any
  }
}

export default function UpsellPacoteStarter() {
  const [isFromTetel, setIsFromTetel] = useState(false)

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search)
      const origem = params.get("origem")?.toLowerCase()

      if (origem === "tetelpontocom") {
        sessionStorage.setItem("tetel_origem", "tetelpontocom")
        setIsFromTetel(true)
        return
      }

      const saved = sessionStorage.getItem("tetel_origem")
      if (saved === "tetelpontocom") {
        setIsFromTetel(true)
      }
    } catch {
      // Fallback silencioso
    }
  }, [])

  useEffect(() => {
    console.log("[v0] Inicializando Meta Pixel...")

    // Inicializa o Meta Pixel
    if (typeof window !== "undefined" && !window.fbq) {
      ;((f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) => {
        if (f.fbq) return
        n = f.fbq = () => {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
        }
        if (!f._fbq) f._fbq = n
        n.push = n
        n.loaded = true
        n.version = "2.0"
        n.queue = []
        t = b.createElement(e)
        t.async = true
        t.src = v
        s = b.getElementsByTagName(e)[0]
        s.parentNode.insertBefore(t, s)
      })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js")

      window.fbq("init", "1305167264321996")
      window.fbq("track", "PageView")
      window.fbq("track", "ViewContent", { page: "upsell_pacote_starter" })
      console.log("[v0] Meta Pixel inicializado com sucesso")
    } else if (window.fbq) {
      window.fbq("track", "PageView")
      window.fbq("track", "ViewContent", { page: "upsell_pacote_starter" })
      console.log("[v0] Meta Pixel já estava carregado")
    }
  }, [])

  const track = (eventType: string, eventName: string, data: Record<string, any> = {}) => {
    try {
      if (typeof window !== "undefined" && window.fbq) {
        window.fbq(eventType, eventName, data)
        console.log("[v0] Evento rastreado:", eventName, data)
      } else {
        console.log("[v0] Pixel não disponível, evento não rastreado:", eventName)
      }
    } catch (error) {
      console.error("[v0] Erro ao rastrear evento:", error)
    }
  }

  const lead = (source: string) => {
    track("track", "Lead", { source })
  }

  const handleCheckout = (e: React.MouseEvent<HTMLAnchorElement>, source: string) => {
    e.preventDefault()
    const url = e.currentTarget.href

    console.log("[v0] Clique no checkout detectado:", source)
    track("track", "AddToCart", { item: source })

    // Navigate after a small delay to ensure tracking completes
    setTimeout(() => {
      console.log("[v0] Redirecionando para:", url)
      window.location.href = url
    }, 300)
  }

  const handleDecline = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const url = e.currentTarget.href

    console.log("[v0] Clique na recusa detectado")
    track("trackCustom", "UpsellDecline", { page: "upsell_pacote_starter" })

    // Navigate after tracking
    setTimeout(() => {
      console.log("[v0] Redirecionando para:", url)
      window.location.href = url
    }, 300)
  }

  const CHECKOUT_UPSELL = "https://pay.kiwify.com.br/OFdb2n2"
  const LINK_RECUSA = "https://pravoce.tetel.online"

  const container = "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"

  const texto = isFromTetel
    ? {
        titulo: "Você já deu o primeiro passo pela TetelPontocom.",
        subtitulo:
          "Agora complete seu kit de entrada com o Pacote Starter Tetel — o passo seguinte para crescer com propósito.",
        cta: "Quero o Pacote Starter agora",
      }
    : {
        titulo: "Você já deu o primeiro passo.",
        subtitulo: "Agora complete seu kit de entrada com conteúdo bônus e benefícios reais.",
        cta: "Quero o Pacote Starter agora",
      }

  return (
    <>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=1305167264321996&ev=PageView&noscript=1"
          alt=""
        />
      </noscript>

      <main className="min-h-screen bg-gradient-to-b from-[#fff8ef] via-[#fff3e6] to-[#ffe8dd] text-[#1a1a1a]">
        {/* Header */}
        <header className="border-b border-black/5 bg-white/60 backdrop-blur">
          <div className={`${container} py-3 flex items-center justify-center gap-2 text-sm`}>
            <Rocket className="h-4 w-4" />
            <span>Oferta exclusiva • disponível apenas agora</span>
          </div>
        </header>

        {/* HERO */}
        <section className="min-h-screen bg-[#FFF6EF] text-[#1F1A17] flex flex-col items-center justify-center px-6 py-16">
          {/* HERO REESTRUTURADA */}
          <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16">
            {/* Texto principal */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold leading-snug mb-3">{texto.titulo}</h1>
              <p className="text-[#4B423C] text-base mb-6">{texto.subtitulo}</p>

              <ul className="space-y-3 text-sm text-[#4B423C] mb-6 text-left md:text-left mx-auto md:mx-0 max-w-md">
                {[
                  "Inclui o Faça Caixa Agora completo.",
                  "Vem com Minha IA Premium integrada.",
                  "Bônus exclusivos e suporte inicial.",
                  "Ideal para quem quer resultados rápidos e sólidos.",
                ].map((t, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-[#FF6B00] mt-0.5 flex-shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>

              <a
                href="https://kiwify.com.br/pacote-starter-tetel"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => lead("CTA - Pacote Starter Tetel")}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#1F1A17] text-white px-6 py-3 text-base shadow-sm hover:opacity-90 transition"
              >
                {texto.cta} <ArrowRight className="h-5 w-5" />
              </a>
            </div>

            {/* Imagem ilustrativa */}
            <div className="flex justify-center md:justify-end flex-1">
              <Image
                src="/images/hero-starter-tetel.png"
                alt="Pacote Starter Tetel"
                width={450}
                height={500}
                className="rounded-2xl shadow-md max-w-[380px] md:max-w-[480px] h-auto"
                priority
              />
            </div>
          </div>

          {isFromTetel && (
            <div className="relative -mt-10 md:-mt-6 z-20 text-center">
              <a
                href="https://tetelpontocom.tetel.online"
                className="inline-flex items-center gap-2 rounded-2xl bg-[#EEDFD2] text-[#1F1A17] px-6 py-3 text-base font-medium hover:bg-[#EBD2BF] transition"
              >
                <Home className="h-5 w-5" /> Voltar à TetelPontocom
              </a>
            </div>
          )}
        </section>

        {/* REFORÇO DE VALOR */}
        <section className="bg-white/70">
          <div className={`${container} py-12`}>
            <h2 className="text-xl sm:text-2xl font-semibold">Por que ativar agora?</h2>
            <div className="mt-6 grid sm:grid-cols-3 gap-6">
              <Reason
                title="Resultados mais rápidos"
                desc="Você recebe direção extra para consolidar o que já começou."
              />
              <Reason title="Conteúdo exclusivo" desc="Material que não está aberto ao público geral." />
              <Reason title="Selo Tetel" desc="Garantia de linguagem humana e prática, sem enrolação." />
            </div>
          </div>
        </section>

        {/* DEPOIMENTO */}
        <section className="bg-white">
          <div className={`${container} py-12`}>
            <div className="rounded-2xl border border-black/5 p-6 shadow-sm bg-white">
              <p className="text-sm text-neutral-800">
                "Eu já tinha comprado o Faça Caixa Agora e peguei esse pacote. O guia me deu clareza de posicionamento e
                o desconto no Analyzer valeu muito. É um empurrão certeiro." —{" "}
                <span className="font-semibold">Marcos L.</span>
              </p>
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="bg-[#1a1a1a] text-white">
          <div className={`${container} py-14 text-center`}>
            <h3 className="text-2xl sm:text-3xl font-bold">Complete seu kit de entrada Tetel.</h3>
            <p className="mt-2 text-white/80">
              A oferta aparece uma única vez. Se fechar esta página, ela não será exibida novamente.
            </p>
            <a
              href={CHECKOUT_UPSELL}
              onClick={(e) => handleCheckout(e, "pacote_starter_tetel_final")}
              className="mt-6 inline-flex items-center justify-center rounded-2xl bg-white text-[#1a1a1a] px-6 py-3 text-sm font-semibold hover:opacity-90 transition"
            >
              Quero o Pacote Starter agora
            </a>
          </div>
        </section>

        {/* Trust Seals Section */}
        <section className="bg-white/70">
          <div className={`${container} py-10`}>
            <div className="flex flex-wrap items-center justify-center gap-6 opacity-90">
              <img src="/images/selos/garantia.png" alt="Garantia 7 Dias" className="h-16" />
              <img src="/images/selos/ssl.png" alt="Compra Segura SSL" className="h-16" />
              <img src="/images/selos/kiwify.png" alt="Checkout Kiwify Seguro" className="h-16" />
              <img src="/images/selos/pagamento-seguro.png" alt="Pagamento Seguro" className="h-16" />
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-white/70 border-t border-black/5">
          <div className={`${container} py-8 text-sm text-neutral-700`}>
            <p className="text-center mb-4">
              © {new Date().getFullYear()} Tetel — Ecossistema de soluções simples e humanas.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
              <a
                href="https://tetel.online/pravoce"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                PraVocê · Tetel
              </a>
              <a
                href="https://minhaia.tetel.online"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Minha IA
              </a>
              <a
                href="https://facacaixaagora.tetel.online"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Faça Caixa Agora
              </a>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}

function Bullet({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-amber-600">{icon}</div>
      <p className="text-sm text-neutral-800">{text}</p>
    </div>
  )
}

function Reason({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm border border-black/5">
      <div className="flex items-center gap-2 text-amber-600">
        <CheckCircle2 className="h-5 w-5" />
        <h4 className="font-semibold">{title}</h4>
      </div>
      <p className="mt-2 text-sm text-neutral-700">{desc}</p>
    </div>
  )
}
