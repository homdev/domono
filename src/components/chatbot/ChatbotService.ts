import { ChatMessage } from './types'

export async function sendMessage(messages: Pick<ChatMessage, 'role' | 'content'>[]) {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    })

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`)
    }

    const data = await response.json()
    return data.response
  } catch (error) {
    console.error('Erreur lors de l\'envoi du message:', error)
    throw error
  }
} 