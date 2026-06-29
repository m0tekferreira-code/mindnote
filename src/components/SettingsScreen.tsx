import { useState } from 'react'
import { ArrowLeft, Mail, Lock, User as UserIcon, Check, Eye, EyeOff } from 'lucide-react'
import { updateUser, findUserByEmail } from '../lib/storage'
import type { User } from '../lib/storage'

interface Props {
  user: User
  onBack: () => void
  onUpdate: (user: User) => void
}

type Section = 'menu' | 'name' | 'email' | 'password'

export function SettingsScreen({ user, onBack, onUpdate }: Props) {
  const [section, setSection] = useState<Section>('menu')

  // Name
  const [name, setName] = useState(user.name)
  const [nameError, setNameError] = useState('')
  const [nameSaved, setNameSaved] = useState(false)

  // Email
  const [email, setEmail] = useState(user.email)
  const [emailError, setEmailError] = useState('')
  const [emailSaved, setEmailSaved] = useState(false)

  // Password
  const [currentPass, setCurrentPass] = useState('')
  const [newPass, setNewPass] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [passError, setPassError] = useState('')
  const [passSaved, setPassSaved] = useState(false)

  function saveName() {
    setNameError('')
    if (!name.trim()) { setNameError('Informe seu nome.'); return }
    const updated = updateUser(user.id, { name: name.trim() })
    onUpdate(updated)
    setNameSaved(true)
    setTimeout(() => { setNameSaved(false); setSection('menu') }, 1200)
  }

  function saveEmail() {
    setEmailError('')
    if (!email.trim()) { setEmailError('Informe um e-mail.'); return }
    const existing = findUserByEmail(email.trim())
    if (existing && existing.id !== user.id) { setEmailError('Este e-mail já está em uso.'); return }
    const updated = updateUser(user.id, { email: email.trim() })
    onUpdate(updated)
    setEmailSaved(true)
    setTimeout(() => { setEmailSaved(false); setSection('menu') }, 1200)
  }

  function savePassword() {
    setPassError('')
    if (currentPass !== user.password) { setPassError('Senha atual incorreta.'); return }
    if (newPass.length < 6) { setPassError('Nova senha deve ter no mínimo 6 caracteres.'); return }
    if (newPass !== confirmPass) { setPassError('As senhas não coincidem.'); return }
    updateUser(user.id, { password: newPass })
    setPassSaved(true)
    setCurrentPass(''); setNewPass(''); setConfirmPass('')
    setTimeout(() => { setPassSaved(false); setSection('menu') }, 1200)
  }

  function goBack() {
    if (section === 'menu') onBack()
    else setSection('menu')
  }

  return (
    <div className="min-h-screen bg-paper flex flex-col max-w-lg mx-auto">
      {/* Header */}
      <header className="bg-white border-b border-border px-5 pt-12 pb-4 flex items-center gap-3 sticky top-0 z-10">
        <button
          onClick={goBack}
          className="p-2 -ml-2 rounded-xl text-muted hover:text-ink hover:bg-paper transition-colors active:scale-90"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="font-display font-bold text-base text-ink">
          {section === 'menu' ? 'Configurações' :
           section === 'name' ? 'Alterar nome' :
           section === 'email' ? 'Alterar e-mail' : 'Alterar senha'}
        </h1>
      </header>

      <div className="flex-1 px-4 py-6">

        {/* MENU */}
        {section === 'menu' && (
          <div className="flex flex-col gap-3">
            {/* Avatar */}
            <div className="bg-white border border-border rounded-2xl px-5 py-5 flex items-center gap-4 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-accent-light flex items-center justify-center flex-shrink-0">
                <span className="font-display font-bold text-accent text-lg">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="min-w-0">
                <p className="font-display font-semibold text-ink text-base truncate">{user.name}</p>
                <p className="text-muted text-xs font-body truncate">{user.email}</p>
              </div>
            </div>

            {/* Options */}
            <div className="bg-white border border-border rounded-2xl overflow-hidden">
              <button
                onClick={() => setSection('name')}
                className="w-full flex items-center gap-4 px-5 py-4 hover:bg-paper transition-colors active:bg-paper border-b border-border"
              >
                <div className="w-9 h-9 rounded-xl bg-accent-light flex items-center justify-center flex-shrink-0">
                  <UserIcon className="w-4 h-4 text-accent" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <p className="font-display font-medium text-ink text-sm">Nome</p>
                  <p className="text-muted text-xs font-body truncate">{user.name}</p>
                </div>
                <ArrowLeft className="w-4 h-4 text-muted rotate-180" />
              </button>

              <button
                onClick={() => setSection('email')}
                className="w-full flex items-center gap-4 px-5 py-4 hover:bg-paper transition-colors active:bg-paper border-b border-border"
              >
                <div className="w-9 h-9 rounded-xl bg-accent-light flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-accent" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <p className="font-display font-medium text-ink text-sm">E-mail</p>
                  <p className="text-muted text-xs font-body truncate">{user.email}</p>
                </div>
                <ArrowLeft className="w-4 h-4 text-muted rotate-180" />
              </button>

              <button
                onClick={() => setSection('password')}
                className="w-full flex items-center gap-4 px-5 py-4 hover:bg-paper transition-colors active:bg-paper"
              >
                <div className="w-9 h-9 rounded-xl bg-accent-light flex items-center justify-center flex-shrink-0">
                  <Lock className="w-4 h-4 text-accent" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-display font-medium text-ink text-sm">Senha</p>
                  <p className="text-muted text-xs font-body">Alterar senha de acesso</p>
                </div>
                <ArrowLeft className="w-4 h-4 text-muted rotate-180" />
              </button>
            </div>
          </div>
        )}

        {/* NAME */}
        {section === 'name' && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-body font-medium text-muted uppercase tracking-wide">Nome completo</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Seu nome"
                className="w-full border border-border rounded-xl px-4 py-3 text-sm font-body text-ink bg-white focus:outline-none focus:border-accent transition-colors"
                autoFocus
              />
              {nameError && <p className="text-red-500 text-xs font-body">{nameError}</p>}
            </div>
            <button
              onClick={saveName}
              className="w-full bg-accent text-white font-display font-semibold text-sm py-3 rounded-xl hover:bg-[#5A52E0] active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              {nameSaved ? <><Check className="w-4 h-4" /> Salvo!</> : 'Salvar nome'}
            </button>
          </div>
        )}

        {/* EMAIL */}
        {section === 'email' && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-body font-medium text-muted uppercase tracking-wide">Novo e-mail</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="novo@email.com"
                className="w-full border border-border rounded-xl px-4 py-3 text-sm font-body text-ink bg-white focus:outline-none focus:border-accent transition-colors"
                autoFocus
              />
              {emailError && <p className="text-red-500 text-xs font-body">{emailError}</p>}
            </div>
            <button
              onClick={saveEmail}
              className="w-full bg-accent text-white font-display font-semibold text-sm py-3 rounded-xl hover:bg-[#5A52E0] active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              {emailSaved ? <><Check className="w-4 h-4" /> Salvo!</> : 'Salvar e-mail'}
            </button>
          </div>
        )}

        {/* PASSWORD */}
        {section === 'password' && (
          <div className="flex flex-col gap-4">
            {[
              { label: 'Senha atual', value: currentPass, set: setCurrentPass, show: showCurrent, toggleShow: () => setShowCurrent(v => !v) },
              { label: 'Nova senha', value: newPass, set: setNewPass, show: showNew, toggleShow: () => setShowNew(v => !v) },
              { label: 'Confirmar nova senha', value: confirmPass, set: setConfirmPass, show: showConfirm, toggleShow: () => setShowConfirm(v => !v) },
            ].map(({ label, value, set, show, toggleShow }) => (
              <div key={label} className="flex flex-col gap-1">
                <label className="text-xs font-body font-medium text-muted uppercase tracking-wide">{label}</label>
                <div className="relative">
                  <input
                    type={show ? 'text' : 'password'}
                    value={value}
                    onChange={e => set(e.target.value)}
                    placeholder="••••••"
                    className="w-full border border-border rounded-xl px-4 py-3 pr-12 text-sm font-body text-ink bg-white focus:outline-none focus:border-accent transition-colors"
                  />
                  <button
                    type="button"
                    onClick={toggleShow}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted"
                  >
                    {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            ))}

            {passError && <p className="text-red-500 text-xs font-body">{passError}</p>}

            <button
              onClick={savePassword}
              className="w-full bg-accent text-white font-display font-semibold text-sm py-3 rounded-xl hover:bg-[#5A52E0] active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              {passSaved ? <><Check className="w-4 h-4" /> Salvo!</> : 'Alterar senha'}
            </button>
          </div>
        )}

      </div>
    </div>
  )
}
