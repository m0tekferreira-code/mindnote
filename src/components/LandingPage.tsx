import { useState } from 'react'
import { Mic, History, Download, ArrowRight, Brain, Zap, Shield, Lock, UserCheck, FileText } from 'lucide-react'

interface Props {
  onGetStarted: () => void
}

export function LandingPage({ onGetStarted }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white font-body text-ink overflow-x-hidden">

      {/* NAV */}
      <nav className="border-b border-border px-5 md:px-10 py-4 flex items-center justify-between sticky top-0 bg-white/90 backdrop-blur-sm z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-ink flex items-center justify-center">
            <Brain className="w-4 h-4 text-white" />
          </div>
          <span className="font-display font-bold text-base text-ink">MindNote</span>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#funcionalidades" className="text-sm text-muted hover:text-ink transition-colors">Funcionalidades</a>
          <a href="#como-funciona" className="text-sm text-muted hover:text-ink transition-colors">Como funciona</a>
          <button
            onClick={onGetStarted}
            className="bg-ink text-white text-sm font-display font-semibold px-5 py-2.5 rounded-xl hover:bg-[#222] active:scale-95 transition-all"
          >
            Começar grátis
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(v => !v)}
          className="md:hidden flex flex-col gap-1.5 p-2"
        >
          <span className={`block w-5 h-0.5 bg-ink transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-0.5 bg-ink transition-all ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-ink transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-b border-border px-5 py-4 flex flex-col gap-4 z-40">
          <a href="#funcionalidades" onClick={() => setMenuOpen(false)} className="text-sm text-muted hover:text-ink transition-colors">Funcionalidades</a>
          <a href="#como-funciona" onClick={() => setMenuOpen(false)} className="text-sm text-muted hover:text-ink transition-colors">Como funciona</a>
          <button
            onClick={onGetStarted}
            className="bg-ink text-white text-sm font-display font-semibold px-5 py-3 rounded-xl active:scale-95 transition-all"
          >
            Começar grátis
          </button>
        </div>
      )}

      {/* HERO */}
      <section className="px-5 md:px-10 pt-20 pb-24 max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-accent-light border border-accent/20 text-accent text-xs font-display font-semibold px-3 py-1.5 rounded-full mb-8">
          <Zap className="w-3 h-3" />
          Capture ideias na velocidade do pensamento
        </div>

        <h1 className="font-display font-bold text-4xl md:text-6xl text-ink leading-tight tracking-tight mb-6">
          Seus pensamentos,<br />
          <span className="text-accent">sem esforço.</span>
        </h1>

        <p className="text-muted text-base md:text-lg font-body max-w-xl mx-auto leading-relaxed mb-10">
          Fale e o MindNote escreve. Capture qualquer ideia em segundos, sem digitar, sem perder o fio do raciocínio.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onGetStarted}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-ink text-white font-display font-semibold text-sm px-7 py-4 rounded-xl hover:bg-[#222] active:scale-95 transition-all"
          >
            Criar conta grátis
            <ArrowRight className="w-4 h-4" />
          </button>
          <a
            href="#como-funciona"
            className="w-full sm:w-auto text-center text-muted text-sm font-body hover:text-ink transition-colors py-4"
          >
            Ver como funciona →
          </a>
        </div>
      </section>

      {/* MOCKUP / VISUAL */}
      <section className="px-5 md:px-10 pb-24 max-w-sm mx-auto">
        <div className="bg-paper border border-border rounded-3xl overflow-hidden shadow-sm">
          {/* Fake app header */}
          <div className="bg-white border-b border-border px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-ink flex items-center justify-center">
                <Brain className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-display font-bold text-sm">MindNote</span>
            </div>
            <div className="w-6 h-6 rounded-full bg-paper border border-border" />
          </div>
          {/* Mic area */}
          <div className="bg-white border-b border-border px-5 py-8 flex flex-col items-center gap-4">
            <p className="font-display font-semibold text-sm text-ink">Pressione para gravar</p>
            <div className="relative">
              <span className="absolute inset-0 rounded-full bg-accent opacity-15 scale-125 animate-pulse" />
              <div className="relative w-16 h-16 rounded-full bg-accent flex items-center justify-center shadow-md">
                <Mic className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>
          {/* Fake thoughts */}
          <div className="px-4 py-4 flex flex-col gap-2">
            {[
              { text: 'Ligar para o João sobre o projeto amanhã.', time: 'Hoje, 14:32' },
              { text: 'Ideia: criar um app de meditação guiada.', time: 'Hoje, 11:08' },
              { text: 'Comprar café e pão de queijo na volta.', time: 'Ontem, 19:45' },
            ].map((t, i) => (
              <div key={i} className="bg-white border border-border rounded-2xl px-4 py-3">
                <p className="text-ink text-xs font-body leading-relaxed">{t.text}</p>
                <p className="text-muted text-[10px] font-body mt-1">{t.time}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="funcionalidades" className="px-5 md:px-10 py-20 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-display font-semibold text-muted uppercase tracking-widest text-center mb-3">Funcionalidades</p>
          <h2 className="font-display font-bold text-2xl md:text-4xl text-ink text-center mb-14 tracking-tight">
            Tudo que você precisa,<br />nada que atrapalha.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Mic className="w-5 h-5 text-accent" />,
                title: 'Voz para texto',
                desc: 'Fale e veja seu pensamento transcrito em tempo real. Sem digitar nada.',
              },
              {
                icon: <History className="w-5 h-5 text-accent" />,
                title: 'Histórico completo',
                desc: 'Todos os seus pensamentos organizados por data, sempre acessíveis.',
              },
              {
                icon: <Download className="w-5 h-5 text-accent" />,
                title: 'Exportar em JSON',
                desc: 'Baixe seus dados a qualquer momento em formato aberto e legível.',
              },
            ].map((f, i) => (
              <div key={i} className="border border-border rounded-2xl p-6 hover:border-accent/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-accent-light flex items-center justify-center mb-4">
                  {f.icon}
                </div>
                <h3 className="font-display font-semibold text-ink text-base mb-2">{f.title}</h3>
                <p className="text-muted text-sm font-body leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="como-funciona" className="px-5 md:px-10 py-20 border-t border-border bg-paper">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-display font-semibold text-muted uppercase tracking-widest text-center mb-3">Como funciona</p>
          <h2 className="font-display font-bold text-2xl md:text-4xl text-ink text-center mb-14 tracking-tight">
            Três passos. Só isso.
          </h2>

          <div className="flex flex-col gap-0">
            {[
              { num: '01', title: 'Crie sua conta', desc: 'Cadastro rápido com nome, e-mail e senha. Menos de 30 segundos.' },
              { num: '02', title: 'Aperte e fale', desc: 'Toque no botão de microfone, fale seu pensamento. Ao soltar, já está salvo.' },
              { num: '03', title: 'Acesse o histórico', desc: 'Todos os pensamentos ficam organizados, prontos para rever ou exportar.' },
            ].map((step, i) => (
              <div key={i} className={`flex gap-6 py-8 ${i < 2 ? 'border-b border-border' : ''}`}>
                <span className="font-display font-bold text-3xl text-border w-10 flex-shrink-0">{step.num}</span>
                <div>
                  <h3 className="font-display font-semibold text-ink text-base mb-1">{step.title}</h3>
                  <p className="text-muted text-sm font-body leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LGPD */}
      <section className="px-5 md:px-10 py-20 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-xs font-display font-semibold text-muted uppercase tracking-widest mb-3">Privacidade & LGPD</p>
              <h2 className="font-display font-bold text-2xl md:text-4xl text-ink tracking-tight leading-tight">
                Preparado para a<br />
                <span className="text-accent">Lei Geral de Proteção de Dados.</span>
              </h2>
            </div>
            <p className="text-muted text-sm font-body max-w-xs leading-relaxed">
              Seus dados são seus. O MindNote foi construído com privacidade desde o início — em conformidade com a LGPD (Lei nº 13.709/2018).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Lock className="w-5 h-5 text-accent" />,
                title: 'Dados só no seu dispositivo',
                desc: 'Nenhuma informação sua é enviada para servidores externos. Tudo fica armazenado localmente no seu aparelho.',
              },
              {
                icon: <UserCheck className="w-5 h-5 text-accent" />,
                title: 'Você controla seus dados',
                desc: 'Exporte ou exclua seus pensamentos a qualquer momento. Sem burocracia, sem necessidade de solicitar a ninguém.',
              },
              {
                icon: <FileText className="w-5 h-5 text-accent" />,
                title: 'Coleta mínima de dados',
                desc: 'Coletamos apenas nome e e-mail para criar sua conta. Nada além do estritamente necessário para o funcionamento.',
              },
            ].map((item, i) => (
              <div key={i} className="bg-paper border border-border rounded-2xl p-6">
                <div className="w-10 h-10 rounded-xl bg-accent-light flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="font-display font-semibold text-ink text-base mb-2">{item.title}</h3>
                <p className="text-muted text-sm font-body leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 border border-border rounded-2xl px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <Shield className="w-5 h-5 text-accent flex-shrink-0" />
            <p className="text-sm font-body text-muted leading-relaxed">
              <span className="font-semibold text-ink">Transparência total:</span> o MindNote não vende, não compartilha e não monetiza nenhum dado pessoal. Em conformidade com os artigos 6º, 8º e 18º da LGPD.
            </p>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="px-5 md:px-10 py-24 border-t border-border">
        <div className="max-w-xl mx-auto text-center">
          <div className="w-14 h-14 rounded-2xl bg-ink flex items-center justify-center mx-auto mb-6">
            <Brain className="w-7 h-7 text-white" />
          </div>
          <h2 className="font-display font-bold text-2xl md:text-4xl text-ink tracking-tight mb-4">
            Comece a capturar<br />seus pensamentos hoje.
          </h2>
          <p className="text-muted text-sm font-body mb-8">Grátis, sem cartão de crédito, sem complicação.</p>
          <button
            onClick={onGetStarted}
            className="flex items-center gap-2 bg-ink text-white font-display font-semibold text-sm px-8 py-4 rounded-xl hover:bg-[#222] active:scale-95 transition-all mx-auto"
          >
            Criar conta grátis
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border px-5 md:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-ink flex items-center justify-center">
            <Brain className="w-3 h-3 text-white" />
          </div>
          <span className="font-display font-semibold text-sm text-ink">MindNote</span>
        </div>
        <p className="text-xs text-muted font-body">© 2026 MindNote. Todos os direitos reservados.</p>
        <div className="flex items-center gap-1.5 bg-accent-light border border-accent/20 px-3 py-1.5 rounded-full">
          <Shield className="w-3 h-3 text-accent" />
          <p className="text-xs text-accent font-display font-semibold">Conforme LGPD</p>
        </div>
      </footer>

    </div>
  )
}
