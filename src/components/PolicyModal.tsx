import { X } from 'lucide-react'

type DocType = 'privacy' | 'terms'

interface Props {
  type: DocType
  onClose: () => void
}

export function PolicyModal({ type, onClose }: Props) {
  const isPrivacy = type === 'privacy'

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-ink/40 backdrop-blur-sm">
      <div className="w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-2xl border border-border flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border flex-shrink-0">
          <h2 className="font-display font-bold text-base text-ink">
            {isPrivacy ? 'Política de Privacidade' : 'Termos de Uso'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-muted hover:text-ink hover:bg-paper transition-colors active:scale-90"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5 text-sm font-body text-ink leading-relaxed space-y-5">
          {isPrivacy ? (
            <>
              <p className="text-xs text-muted">Última atualização: junho de 2026</p>

              <div>
                <h3 className="font-display font-semibold text-ink mb-1">1. Quem somos</h3>
                <p className="text-muted">O MindNote é um aplicativo de anotação de pensamentos por voz, operado em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).</p>
              </div>

              <div>
                <h3 className="font-display font-semibold text-ink mb-1">2. Dados coletados</h3>
                <p className="text-muted">Coletamos apenas os dados estritamente necessários para o funcionamento: nome completo, endereço de e-mail e senha (armazenada localmente). Nenhum dado de voz é retido — a transcrição ocorre no próprio dispositivo e apenas o texto resultante é salvo.</p>
              </div>

              <div>
                <h3 className="font-display font-semibold text-ink mb-1">3. Armazenamento</h3>
                <p className="text-muted">Todos os dados ficam armazenados localmente no seu dispositivo (localStorage). Nenhuma informação pessoal é transmitida ou armazenada em servidores externos, exceto o registro de cadastro enviado para fins de conformidade.</p>
              </div>

              <div>
                <h3 className="font-display font-semibold text-ink mb-1">4. Seus direitos (art. 18 da LGPD)</h3>
                <p className="text-muted">Você tem direito a: acessar seus dados, corrigi-los, exportá-los (botão de download disponível no app) e excluí-los a qualquer momento, sem necessidade de solicitação a terceiros.</p>
              </div>

              <div>
                <h3 className="font-display font-semibold text-ink mb-1">5. Compartilhamento</h3>
                <p className="text-muted">Não vendemos, alugamos nem compartilhamos dados pessoais com terceiros para fins comerciais.</p>
              </div>

              <div>
                <h3 className="font-display font-semibold text-ink mb-1">6. Contato</h3>
                <p className="text-muted">Dúvidas sobre privacidade? Entre em contato pelo e-mail: privacidade@mindnote.app</p>
              </div>
            </>
          ) : (
            <>
              <p className="text-xs text-muted">Última atualização: junho de 2026</p>

              <div>
                <h3 className="font-display font-semibold text-ink mb-1">1. Aceitação</h3>
                <p className="text-muted">Ao criar uma conta no MindNote, você concorda com estes Termos de Uso. Se não concordar, não utilize o serviço.</p>
              </div>

              <div>
                <h3 className="font-display font-semibold text-ink mb-1">2. Uso permitido</h3>
                <p className="text-muted">O MindNote é um serviço pessoal de anotações por voz. Você pode usá-lo para registrar pensamentos, ideias e lembretes de uso pessoal e não comercial.</p>
              </div>

              <div>
                <h3 className="font-display font-semibold text-ink mb-1">3. Responsabilidade pelo conteúdo</h3>
                <p className="text-muted">Você é o único responsável pelo conteúdo dos seus pensamentos registrados. Não utilize o serviço para registrar conteúdos ilegais, difamatórios ou que violem direitos de terceiros.</p>
              </div>

              <div>
                <h3 className="font-display font-semibold text-ink mb-1">4. Disponibilidade</h3>
                <p className="text-muted">O MindNote é fornecido "como está". Não garantimos disponibilidade ininterrupta e nos reservamos o direito de modificar ou encerrar o serviço mediante aviso prévio.</p>
              </div>

              <div>
                <h3 className="font-display font-semibold text-ink mb-1">5. Propriedade intelectual</h3>
                <p className="text-muted">O código, design e marca MindNote são propriedade dos seus desenvolvedores. Os dados gerados por você pertencem exclusivamente a você.</p>
              </div>

              <div>
                <h3 className="font-display font-semibold text-ink mb-1">6. Alterações nos termos</h3>
                <p className="text-muted">Podemos atualizar estes termos periodicamente. Notificaremos sobre mudanças relevantes dentro do próprio aplicativo.</p>
              </div>

              <div>
                <h3 className="font-display font-semibold text-ink mb-1">7. Lei aplicável</h3>
                <p className="text-muted">Estes termos são regidos pelas leis brasileiras, incluindo a LGPD (Lei nº 13.709/2018) e o Marco Civil da Internet (Lei nº 12.965/2014).</p>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border flex-shrink-0">
          <button
            onClick={onClose}
            className="w-full bg-ink text-white font-display font-semibold text-sm py-3 rounded-xl hover:bg-[#222] active:scale-95 transition-all"
          >
            Entendi
          </button>
        </div>
      </div>
    </div>
  )
}
