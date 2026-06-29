import { Mic, MicOff } from 'lucide-react'

interface Props {
  isListening: boolean
  onStart: () => void
  onStop: () => void
  supported: boolean
}

export function RecordButton({ isListening, onStart, onStop, supported }: Props) {
  return (
    <div className="relative flex items-center justify-center">
      {/* Pulse rings when listening */}
      {isListening && (
        <>
          <span className="absolute w-20 h-20 rounded-full bg-accent opacity-20 animate-pulse_ring" />
          <span className="absolute w-20 h-20 rounded-full bg-accent opacity-10 animate-pulse_ring" style={{ animationDelay: '0.3s' }} />
        </>
      )}

      <button
        onClick={isListening ? onStop : onStart}
        disabled={!supported}
        className={`
          relative z-10 w-20 h-20 rounded-full flex items-center justify-center
          shadow-lg active:scale-90 transition-all duration-150
          ${isListening
            ? 'bg-red-500 hover:bg-red-600'
            : 'bg-accent hover:bg-[#5A52E0]'}
          ${!supported ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        {isListening
          ? <MicOff className="w-8 h-8 text-white" />
          : <Mic className="w-8 h-8 text-white" />}
      </button>
    </div>
  )
}
