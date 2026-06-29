import { useState, useEffect, useRef } from 'react'
import { Download, LogOut, Brain, Settings } from 'lucide-react'
import { useSpeech } from '../hooks/useSpeech'
import { RecordButton } from './RecordButton'
import { ThoughtCard } from './ThoughtCard'
import { SettingsScreen } from './SettingsScreen'
import { getThoughts, saveThought, deleteThought, exportThoughtsAsJson, clearSession } from '../lib/storage'
import type { User, Thought } from '../lib/storage'

interface Props {
  user: User
  onLogout: () => void
}

export function HomeScreen({ user: initialUser, onLogout }: Props) {
  const [user, setUser] = useState(initialUser)
  const [thoughts, setThoughts] = useState<Thought[]>([])
  const [editText, setEditText] = useState('')
  const [saved, setSaved] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const { isListening, transcript, error, startListening, stopListening, resetTranscript, supported } = useSpeech()
  const prevListening = useRef(false)

  useEffect(() => {
    setThoughts(getThoughts(user.id))
  }, [user.id])

  // When mic stops → auto-save transcript immediately
  useEffect(() => {
    if (prevListening.current && !isListening && transcript.trim()) {
      const text = transcript.trim()
      const t = saveThought(user.id, text)
      setThoughts(prev => [t, ...prev])
      setSaved(true)
      setTimeout(() => setSaved(false), 1500)
      resetTranscript()
    }
    prevListening.current = isListening
  }, [isListening, transcript, resetTranscript, user.id])

  function handleSave() {
    const text = editText.trim()
    if (!text) return
    const t = saveThought(user.id, text)
    setThoughts(prev => [t, ...prev])
    setEditText('')
    setSaved(true)
    setTimeout(() => setSaved(false), 1500)
  }

  function handleDelete(id: string) {
    deleteThought(id)
    setThoughts(prev => prev.filter(t => t.id !== id))
  }

  function handleLogout() {
    clearSession()
    onLogout()
  }

  const firstName = user.name.split(' ')[0]

  if (showSettings) {
    return (
      <SettingsScreen
        user={user}
        onBack={() => setShowSettings(false)}
        onUpdate={updated => setUser(updated)}
      />
    )
  }

  return (
    <div className="min-h-screen bg-paper flex flex-col max-w-lg mx-auto">
      {/* Header */}
      <header className="bg-white border-b border-border px-5 pt-12 pb-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-accent flex items-center justify-center">
            <Brain className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-xs text-muted font-body">Olá, {firstName}</p>
            <h1 className="font-display font-bold text-base text-ink leading-tight">MindNote</h1>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => exportThoughtsAsJson(user.id)}
            className="p-2 rounded-xl hover:bg-paper transition-colors text-muted hover:text-ink active:scale-90"
            title="Exportar JSON"
          >
            <Download className="w-5 h-5" />
          </button>
          <button
            onClick={() => setShowSettings(true)}
            className="p-2 rounded-xl hover:bg-paper transition-colors text-muted hover:text-ink active:scale-90"
            title="Configurações"
          >
            <Settings className="w-5 h-5" />
          </button>
          <button
            onClick={handleLogout}
            className="p-2 rounded-xl hover:bg-paper transition-colors text-muted hover:text-red-500 active:scale-90"
            title="Sair"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Record zone */}
      <div className="bg-white border-b border-border px-5 py-6 flex flex-col items-center gap-5">
        <div className="text-center">
          <p className="font-display font-semibold text-ink text-sm">
            {isListening ? 'Ouvindo...' : 'Pressione para gravar'}
          </p>
          {!isListening && !editText && (
            <p className="text-muted text-xs font-body mt-0.5">Fale seu pensamento ou escreva abaixo</p>
          )}
        </div>

        <RecordButton
          isListening={isListening}
          onStart={startListening}
          onStop={stopListening}
          supported={supported}
        />

        {/* Live transcript */}
        {isListening && transcript && (
          <div className="w-full bg-accent-light border border-accent/20 rounded-xl px-4 py-3">
            <p className="text-accent text-sm font-body italic leading-relaxed">{transcript}</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <p className="text-red-500 text-xs font-body text-center">{error}</p>
        )}
        {!supported && (
          <p className="text-muted text-xs font-body text-center">Reconhecimento de voz não suportado neste navegador.</p>
        )}

        {/* Text editor */}
        <div className="w-full flex flex-col gap-2">
          <textarea
            value={editText}
            onChange={e => setEditText(e.target.value)}
            placeholder="Seu pensamento aparece aqui após a gravação, ou escreva diretamente..."
            rows={3}
            className="w-full border border-border rounded-xl px-4 py-3 text-sm font-body text-ink bg-paper focus:outline-none focus:border-accent transition-colors resize-none"
          />
          <button
            onClick={handleSave}
            disabled={!editText.trim()}
            className={`w-full py-3 rounded-xl font-display font-semibold text-sm transition-all active:scale-95
              ${editText.trim()
                ? 'bg-accent text-white hover:bg-[#5A52E0]'
                : 'bg-border text-muted cursor-not-allowed'}
            `}
          >
            {saved ? 'Salvo!' : 'Salvar pensamento'}
          </button>
        </div>
      </div>

      {/* History */}
      <div className="flex-1 px-4 py-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-semibold text-ink text-sm">
            Histórico
          </h2>
          <span className="text-xs font-body text-muted bg-border px-2 py-0.5 rounded-full">
            {thoughts.length} {thoughts.length === 1 ? 'pensamento' : 'pensamentos'}
          </span>
        </div>

        {thoughts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <div className="w-14 h-14 rounded-2xl bg-accent-light flex items-center justify-center">
              <Brain className="w-7 h-7 text-accent" />
            </div>
            <p className="text-muted text-sm font-body text-center">
              Nenhum pensamento ainda.<br />Grave ou escreva o primeiro!
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3 pb-10">
            {thoughts.map(t => (
              <ThoughtCard key={t.id} thought={t} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
