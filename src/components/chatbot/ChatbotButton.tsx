'use client'

import { useState, useEffect } from 'react'
import { MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ChatbotWindow } from './ChatbotWindow'
import { ChatbotDrawer } from './ChatbotDrawer'
import { ChatbotContextProvider } from './ChatbotContext'

export default function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    // Check on initial load
    checkIfMobile()
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile)
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkIfMobile)
    }
  }, [])

  return (
    <ChatbotContextProvider>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 p-0 shadow-lg bg-primary hover:bg-primary/90 z-50"
        aria-label="Ouvrir l'assistant virtuel"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {isMobile ? (
        <ChatbotDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
      ) : (
        <ChatbotWindow isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
    </ChatbotContextProvider>
  )
} 