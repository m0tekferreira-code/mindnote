export interface User {
  id: string
  name: string
  email: string
  password: string
  createdAt: string
}

export interface Thought {
  id: string
  userId: string
  text: string
  createdAt: string
}

// --- USERS ---
export function getUsers(): User[] {
  try {
    return JSON.parse(localStorage.getItem('mn_users') || '[]')
  } catch {
    return []
  }
}

export function saveUsers(users: User[]): void {
  localStorage.setItem('mn_users', JSON.stringify(users))
}

export function findUserByEmail(email: string): User | undefined {
  return getUsers().find(u => u.email.toLowerCase() === email.toLowerCase())
}

export function createUser(name: string, email: string, password: string): User {
  const users = getUsers()
  const user: User = {
    id: crypto.randomUUID(),
    name,
    email,
    password,
    createdAt: new Date().toISOString(),
  }
  users.push(user)
  saveUsers(users)
  return user
}

// --- SESSION ---
export function getSession(): User | null {
  try {
    const raw = localStorage.getItem('mn_session')
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function setSession(user: User): void {
  localStorage.setItem('mn_session', JSON.stringify(user))
}

export function clearSession(): void {
  localStorage.removeItem('mn_session')
}

// --- THOUGHTS ---
export function getThoughts(userId: string): Thought[] {
  try {
    const all: Thought[] = JSON.parse(localStorage.getItem('mn_thoughts') || '[]')
    return all.filter(t => t.userId === userId).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  } catch {
    return []
  }
}

export function saveThought(userId: string, text: string): Thought {
  const all: Thought[] = JSON.parse(localStorage.getItem('mn_thoughts') || '[]')
  const thought: Thought = {
    id: crypto.randomUUID(),
    userId,
    text,
    createdAt: new Date().toISOString(),
  }
  all.push(thought)
  localStorage.setItem('mn_thoughts', JSON.stringify(all))
  return thought
}

export function deleteThought(id: string): void {
  const all: Thought[] = JSON.parse(localStorage.getItem('mn_thoughts') || '[]')
  localStorage.setItem('mn_thoughts', JSON.stringify(all.filter(t => t.id !== id)))
}

export function updateUser(id: string, changes: Partial<Pick<User, 'name' | 'email' | 'password'>>): User {
  const users = getUsers()
  const idx = users.findIndex(u => u.id === id)
  if (idx === -1) throw new Error('Usuário não encontrado')
  users[idx] = { ...users[idx], ...changes }
  saveUsers(users)
  setSession(users[idx])
  return users[idx]
}

export function exportThoughtsAsJson(userId: string): void {
  const thoughts = getThoughts(userId)
  const blob = new Blob([JSON.stringify(thoughts, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'pensamentos.json'
  a.click()
  URL.revokeObjectURL(url)
}
