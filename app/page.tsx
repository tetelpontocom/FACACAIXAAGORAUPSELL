"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ShieldCheck, Sparkles, Gift, CheckCircle2, Rocket, ArrowRight, Home } from "lucide-react"

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
      }
    : {
        titulo: "Você já deu o primeiro passo.",
        subtitulo: "Agora complete seu kit de entrada com conteúdo bônus e benefícios reais.",
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
        <section className={`${container} py-10 sm:py-14`}>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">
                {texto.titulo} <br />
                <span className="underline decoration-amber-400/60">{texto.subtitulo}</span>
              </h1>
              <p className="mt-4 text-lg text-neutral-800">
                Ative o <strong>Pacote Starter Tetel</strong> e acelere seus resultados no digital com conteúdo bônus e
                benefícios reais.
              </p>

              <dl className="mt-6 space-y-2 text-[#1a1a1a]/90">
                <div className="flex items-start gap-2">
                  <Rocket className="h-4 w-4 text-amber-600 mt-1" />
                  <p>
                    <strong>Minha IA Premium</strong> (valor oficial R$ 27,00) — acesso completo incluso no Pacote
                    Starter.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <Gift className="h-4 w-4 text-amber-600 mt-1" />
                  <p>
                    <strong>Guia Bônus de Autoridade e Presença</strong> (PDF leve e prático)
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <Sparkles className="h-4 w-4 text-amber-600 mt-1" />
                  <p>
                    <strong>20% OFF</strong> no Instagram Analyzer
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <ShieldCheck className="h-4 w-4 text-amber-600 mt-1" />
                  <p>
                    <strong>Acesso antecipado</strong> às indicações do TetelPontocom
                  </p>
                </div>
              </dl>

              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <a
                  href={CHECKOUT_UPSELL}
                  onClick={(e) => handleCheckout(e, "pacote_starter_tetel")}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#1a1a1a] text-white px-6 py-3 text-sm font-semibold hover:opacity-90 transition"
                >
                  Sim, quero o Pacote Starter agora
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href={LINK_RECUSA}
                  onClick={handleDecline}
                  className="inline-flex items-center justify-center rounded-2xl border border-[#1a1a1a]/15 px-6 py-3 text-sm hover:bg-white transition"
                >
                  Não, obrigado. Quero seguir sem o pacote
                </a>
              </div>

              <p className="mt-3 text-xs text-neutral-600">
                Oferta única desta página. Se sair agora, ela não será mostrada novamente.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="w-full flex justify-center"
            >
              <img
                src="/images/hero-starter-tetel.png"
                alt="Pacote Starter Tetel"
                className="w-full max-w-md rounded-3xl shadow-xl"
              />
            </motion.div>
          </div>
        </section>

        {isFromTetel && (
          <section className="bg-white/50">
            <div className={`${container} py-8 text-center`}>
              <a
                href="https://tetelpontocom.tetel.online"
                className="inline-flex items-center gap-2 rounded-2xl bg-[#EEDFD2] text-[#1a1a1a] px-6 py-3 text-sm font-medium hover:bg-[#EBD2BF] transition"
              >
                <Home className="h-5 w-5" /> Voltar à TetelPontocom
              </a>
            </div>
          </section>
        )}

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
