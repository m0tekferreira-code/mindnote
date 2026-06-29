# MindNote

Aplicativo web para captura de pensamentos por voz. O usuário aperta um botão, fala, e o pensamento é transcrito e salvo automaticamente no histórico.

---

## Funcionalidades

- **Gravação por voz** — transcrição em tempo real via Web Speech API (pt-BR)
- **Salvo ao parar** — ao soltar o botão de parar, o pensamento já está no histórico
- **Anotação manual** — campo de texto para digitar diretamente
- **Histórico completo** — todos os pensamentos organizados por data
- **Exportar JSON** — download dos pensamentos em arquivo `.json`
- **Configurações de usuário** — alterar nome, e-mail e senha
- **Landing page** — página de apresentação pública com seção LGPD
- **Política de Privacidade e Termos de Uso** — exibidos no cadastro com aceite obrigatório
- **Webhook de cadastro** — dados do usuário e confirmação de aceite enviados automaticamente ao criar conta

---

## Tecnologias

| Camada | Tecnologia |
|---|---|
| Framework | React 18 + TypeScript |
| Estilo | Tailwind CSS |
| Ícones | Lucide React |
| Fontes | Space Grotesk (títulos) + Inter (texto) |
| Build | Vite |
| Armazenamento | localStorage (JSON) |
| Voz | Web Speech API (nativa do navegador) |

---

## Estrutura do projeto

```
src/
├── App.tsx                  # Roteamento entre landing, auth e app
├── main.tsx                 # Entry point
├── index.css                # Tailwind + reset base
│
├── components/
│   ├── LandingPage.tsx      # Página inicial pública
│   ├── AuthScreen.tsx       # Login e cadastro
│   ├── HomeScreen.tsx       # Tela principal do app
│   ├── SettingsScreen.tsx   # Configurações de usuário
│   ├── RecordButton.tsx     # Botão de gravação com animação
│   ├── ThoughtCard.tsx      # Card de pensamento no histórico
│   └── PolicyModal.tsx      # Modal com Política e Termos
│
├── hooks/
│   └── useSpeech.ts         # Hook da Web Speech API
│
└── lib/
    └── storage.ts           # CRUD de usuários e pensamentos no localStorage
```

---

## Como rodar localmente

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build
```

Acesse `http://localhost:5173` no navegador.

> **Atenção:** a gravação por voz requer **HTTPS** ou `localhost`. Em produção, certifique-se de servir o app com SSL.

---

## Armazenamento de dados

Todos os dados ficam no `localStorage` do navegador, sem backend externo:

| Chave | Conteúdo |
|---|---|
| `mn_users` | Array de usuários cadastrados |
| `mn_session` | Usuário da sessão ativa |
| `mn_thoughts` | Array de todos os pensamentos |

### Exemplo de pensamento (JSON)

```json
{
  "id": "uuid",
  "userId": "uuid",
  "text": "Ligar para o João amanhã sobre o projeto.",
  "createdAt": "2026-06-29T14:32:00.000Z"
}
```

---

## Webhook de cadastro

Ao criar conta, os dados são enviados via `POST` para:

```
https://webhook.praxisis.com.br/webhook/api/v1/cadastro
```

### Payload enviado

```json
{
  "id": "uuid",
  "name": "Nome do usuário",
  "email": "email@exemplo.com",
  "createdAt": "2026-06-29T14:00:00.000Z",
  "lgpdAccepted": true,
  "lgpdAcceptedAt": "2026-06-29T14:00:00.000Z",
  "termsAccepted": true,
  "termsAcceptedAt": "2026-06-29T14:00:00.000Z"
}
```

---

## Privacidade e LGPD

O MindNote foi desenvolvido em conformidade com a **Lei Geral de Proteção de Dados (Lei nº 13.709/2018)**:

- Nenhum dado de voz é armazenado — apenas o texto transcrito
- Dados ficam exclusivamente no dispositivo do usuário
- Coleta mínima: apenas nome e e-mail
- O usuário pode exportar ou excluir seus dados a qualquer momento
- Aceite explícito da Política de Privacidade e Termos de Uso no cadastro (com timestamp registrado)

---

## Compatibilidade com reconhecimento de voz

| Navegador | Suporte |
|---|---|
| Chrome / Edge | ✅ Completo |
| Safari (iOS/macOS) | ✅ Completo |
| Firefox | ❌ Não suportado |

---

## Licença

Projeto proprietário. Todos os direitos reservados.
