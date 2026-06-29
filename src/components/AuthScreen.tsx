import { useState } from 'react'
import { createUser, findUserByEmail, setSession } from '../lib/storage'
import type { User } from '../lib/storage'

interface Props {
  onAuth: (user: User) => void
}

type Mode = 'login' | 'signup'

export function AuthScreen({ onAuth }: Props) {
  const [mode, setMode] = useState<Mode>('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (mode === 'signup') {
      if (!name.trim()) { setError('Informe seu nome.'); return }
      if (!email.trim()) { setError('Informe seu e-mail.'); return }
      if (password.length < 6) { setError('Senha deve ter no mínimo 6 caracteres.'); return }
      if (findUserByEmail(email)) { setError('Este e-mail já está cadastrado.'); return }
      const user = createUser(name.trim(), email.trim(), password)
      setSession(user)
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
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted text-xs font-body"
              >
                {showPassword ? 'Ocultar' : 'Ver'}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-xs font-body">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-accent text-white font-display font-semibold text-sm py-3 rounded-xl hover:bg-[#5A52E0] active:scale-95 transition-all"
          >
            {mode === 'login' ? 'Entrar' : 'Criar conta'}
          </button>
        </form>

        <div className="mt-5 text-center">
          <p className="text-sm font-body text-muted">
            {mode === 'login' ? 'Não tem conta?' : 'Já tem conta?'}{' '}
            <button
              onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError('') }}
              className="text-accent font-medium"
            >
              {mode === 'login' ? 'Cadastre-se' : 'Entrar'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
