import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { createUser, findUserByEmail, setSession } from '../lib/storage'
import { PolicyModal } from './PolicyModal'
import type { User } from '../lib/storage'

interface Props {
  onAuth: (user: User) => void
}

type Mode = 'login' | 'signup'
type PolicyDoc = 'privacy' | 'terms' | null

const WEBHOOK_URL = 'https://webhook.praxisis.com.br/webhook/api/v1/cadastro'

async function sendToWebhook(user: User, acceptedAt: string) {
  try {
    await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        lgpdAccepted: true,
        lgpdAcceptedAt: acceptedAt,
        termsAccepted: true,
        termsAcceptedAt: acceptedAt,
      }),
    })
  } catch {
    // falha silenciosa — não bloqueia o cadastro
  }
}

export function AuthScreen({ onAuth }: Props) {
  const [mode, setMode] = useState<Mode>('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [accepted, setAccepted] = useState(false)
  const [policyDoc, setPolicyDoc] = useState<PolicyDoc>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (mode === 'signup') {
      if (!name.trim()) { setError('Informe seu nome.'); return }
      if (!email.trim()) { setError('Informe seu e-mail.'); return }
      if (password.length < 6) { setError('Senha deve ter no mínimo 6 caracteres.'); return }
      if (!accepted) { setError('Você precisa aceitar a Política de Privacidade e os Termos de Uso.'); return }
      if (findUserByEmail(email)) { setError('Este e-mail já está cadastrado.'); return }

      setLoading(true)
      const user = createUser(name.trim(), email.trim(), password)
      const acceptedAt = new Date().toISOString()
      await sendToWebhook(user, acceptedAt)
      setSession(user)
      setLoading(false)
      onAuth(user)
    } else {
      const user = findUserByEmail(email)
      if (!user || user.password !== password) {
        setError('E-mail ou senha incorretos.')
        return
      }
      setSession(user)
      onAuth(user)
    }
  }

  return (
    <>
      {policyDoc && (
        <PolicyModal type={policyDoc} onClose={() => setPolicyDoc(null)} />
      )}

      <div className="min-h-screen bg-paper flex flex-col items-center justify-center px-6">
        {/* Logo */}
        <div className="mb-10 text-center">
          <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-3">
            <span className="text-white text-2xl font-display font-bold">M</span>
          </div>
          <h1 className="font-display font-bold text-2xl text-ink">MindNote</h1>
          <p className="text-muted text-sm font-body mt-1">Seus pensamentos, organizados.</p>
        </div>

        {/* Card */}
        <div className="w-full max-w-sm bg-white rounded-2xl border border-border p-6">
          <h2 className="font-display font-semibold text-lg text-ink mb-5">
            {mode === 'login' ? 'Bem-vindo de volta' : 'Criar conta'}
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {mode === 'signup' && (
              <div className="flex flex-col gap-1">
                <label className="text-xs font-body font-medium text-muted uppercase tracking-wide">Nome</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Seu nome"
                  className="w-full border border-border rounded-xl px-4 py-3 text-sm font-body text-ink bg-paper focus:outline-none focus:border-accent transition-colors"
                />
              </div>
            )}

            <div className="flex flex-col gap-1">
              <label className="text-xs font-body font-medium text-muted uppercase tracking-wide">E-mail</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full border border-border rounded-xl px-4 py-3 text-sm font-body text-ink bg-paper focus:outline-none focus:border-accent transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-body font-medium text-muted uppercase tracking-wide">Senha</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••"
                  className="w-full border border-border rounded-xl px-4 py-3 pr-12 text-sm font-body text-ink bg-paper focus:outline-none focus:border-accent transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Aceite de termos — só no cadastro */}
            {mode === 'signup' && (
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <div className="relative flex-shrink-0 mt-0.5">
                  <input
                    type="checkbox"
                    checked={accepted}
                    onChange={e => setAccepted(e.target.checked)}
                    className="sr-only"
                  />
                  <div
                    onClick={() => setAccepted(v => !v)}
                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors
                      ${accepted ? 'bg-accent border-accent' : 'border-border bg-paper'}`}
                  >
                    {accepted && (
                      <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-xs font-body text-muted leading-relaxed">
                  Li e aceito a{' '}
                  <button
                    type="button"
                    onClick={() => setPolicyDoc('privacy')}
                    className="text-accent underline underline-offset-2 hover:text-[#5A52E0]"
                  >
                    Política de Privacidade
                  </button>
                  {' '}e os{' '}
                  <button
                    type="button"
                    onClick={() => setPolicyDoc('terms')}
                    className="text-accent underline underline-offset-2 hover:text-[#5A52E0]"
                  >
                    Termos de Uso
                  </button>
                  , em conformidade com a LGPD.
                </span>
              </label>
            )}

            {error && (
              <p className="text-red-500 text-xs font-body">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent text-white font-display font-semibold text-sm py-3 rounded-xl hover:bg-[#5A52E0] active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Criando conta...
                </>
              ) : (
                mode === 'login' ? 'Entrar' : 'Criar conta'
              )}
            </button>
          </form>

          <div className="mt-5 text-center">
            <p className="text-sm font-body text-muted">
              {mode === 'login' ? 'Não tem conta?' : 'Já tem conta?'}{' '}
              <button
                onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(''); setAccepted(false) }}
                className="text-accent font-medium"
              >
                {mode === 'login' ? 'Cadastre-se' : 'Entrar'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
