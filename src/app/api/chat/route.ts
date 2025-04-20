import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import Anthropic from '@anthropic-ai/sdk'
import { ChatOpenAI } from '@langchain/openai'
import { ChatAnthropic } from '@langchain/anthropic'
import { HumanMessage, SystemMessage, AIMessage } from '@langchain/core/messages'

// Initialisation des clients API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || ''
})

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || ''
})

// Initialisation des modèles LangChain
const chatOpenAI = new ChatOpenAI({
  modelName: 'gpt-4o',
  temperature: 0.7,
  openAIApiKey: process.env.OPENAI_API_KEY
})

const chatAnthropic = new ChatAnthropic({
  modelName: 'claude-3-opus-20240229',
  temperature: 0.7,
  anthropicApiKey: process.env.ANTHROPIC_API_KEY
})

// Contexte système pour nos agents
const systemPrompt = `Tu es un assistant virtuel pour Domono, une entreprise spécialisée dans la domotique et la sécurité à Marseille. 
Aide les utilisateurs avec des informations sur nos services: alarmes, vidéosurveillance, domotique, et systèmes incendie.
Réponds de façon concise, amicale et professionnelle. Utilise le français, et propose des solutions adaptées aux besoins des utilisateurs.
Si tu ne connais pas la réponse, propose de les mettre en contact avec notre équipe.`

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // Utilisation de OpenAI par défaut
    // Pour basculer entre les modèles, vous pouvez implémenter une logique de sélection
    const provider = 'openai' // ou 'anthropic'

    let response
    
    if (provider === 'openai') {
      // Préparation des messages pour LangChain
      const langChainMessages = [
        new SystemMessage(systemPrompt),
        ...messages.map((msg: any) => 
          msg.role === 'user' 
            ? new HumanMessage(msg.content) 
            : new AIMessage(msg.content)
        )
      ]

      // Appel à l'API via LangChain
      const result = await chatOpenAI.invoke(langChainMessages)
      response = result.content
    } else {
      // Appel direct à l'API Anthropic
      const result = await anthropic.messages.create({
        model: 'claude-3-opus-20240229',
        max_tokens: 1000,
        system: systemPrompt,
        messages: messages.map((msg: any) => ({
          role: msg.role === 'user' ? 'user' : 'assistant',
          content: msg.content
        }))
      })
      
      // Extraction du texte de la réponse
      if (result.content && result.content.length > 0) {
        const contentBlock = result.content[0];
        if (contentBlock.type === 'text') {
          response = contentBlock.text;
        } else {
          response = "Désolé, je n'ai pas pu générer une réponse appropriée.";
        }
      } else {
        response = "Désolé, aucune réponse n'a été générée.";
      }
    }

    return NextResponse.json({ response })
  } catch (error) {
    console.error('Error in chat route:', error)
    return NextResponse.json(
      { error: 'Erreur lors du traitement de votre demande' },
      { status: 500 }
    )
  }
} 