'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import { ChatMessage } from './types'
import { sendMessage } from './ChatbotService'

interface ChatbotContextType {
  messages: ChatMessage[]
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void
  sendUserMessage: (content: string) => Promise<void>
  isLoading: boolean
  clearMessages: () => void
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined)

export function useChatbot() {
  const context = useContext(ChatbotContext)
  if (context === undefined) {
    throw new Error('useChatbot must be used within a ChatbotProvider')
  }
  return context
}

interface ChatbotProviderProps {
  children: ReactNode
}

export function ChatbotContextProvider({ children }: ChatbotProviderProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Bonjour ! Je suis votre assistant virtuel Domono. Comment puis-je vous aider aujourd\'hui ?',
      timestamp: new Date(),
    },
  ])
  const [isLoading, setIsLoading] = useState(false)

  const addMessage = (message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const newMessage: ChatMessage = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, newMessage])
    return newMessage
  }

  const sendUserMessage = async (content: string) => {
    if (!content.trim()) return

    // Ajouter le message de l'utilisateur
    const userMessage = addMessage({ role: 'user', content })
    setIsLoading(true)

    try {
      // Récupérer tous les messages pour maintenir le contexte de la conversation
      const messageHistory = messages.concat(userMessage).map(msg => ({
        role: msg.role,
        content: msg.content
      }))
      
      // Appel à l'API via notre service
      const response = await sendMessage(messageHistory)
      
      // Ajouter la réponse de l'assistant
      addMessage({ role: 'assistant', content: response })
    } catch (error) {
      console.error('Error sending message:', error)
      
      // Ajouter un message d'erreur
      addMessage({
        role: 'assistant',
        content: 'Désolé, j\'ai rencontré une erreur. Veuillez réessayer plus tard.'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const clearMessages = () => {
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: 'Bonjour ! Je suis votre assistant virtuel Domono. Comment puis-je vous aider aujourd\'hui ?',
        timestamp: new Date(),
      },
    ])
  }

  return (
    <ChatbotContext.Provider value={{ messages, addMessage, sendUserMessage, isLoading, clearMessages }}>
      {children}
    </ChatbotContext.Provider>
  )
} 