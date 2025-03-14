import { Message } from './useConversation';

/**
 * API class for handling communication with OpenAI's Chat API
 */
export class Api {
  private apiKey: string;
  private apiUrl: string = 'https://api.openai.com/v1/chat/completions';
  private model: string = 'gpt-3.5-turbo';

  constructor() {
    // Get API key from environment variables
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY;
    
    if (!apiKey) {
      console.error('OpenAI API key not found in environment variables');
      throw new Error('OpenAI API key is required');
    }
    
    this.apiKey = apiKey;
  }

  /**
   * Converts our app's Message format to OpenAI's message format
   */
  private formatMessages(conversation: Message[]) {
    return conversation.map(message => ({
      role: message.sender === 'USER' ? 'user' : 'assistant',
      content: message.text
    }));
  }

  /**
   * Sends the conversation to OpenAI and returns the AI response
   * @param conversation - Array of messages in the conversation
   * @returns Promise with the AI response message
   */
  public async getCompletion(conversation: Message[]): Promise<Message> {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: this.model,
          messages: this.formatMessages(conversation),
          temperature: 0.7,
          max_tokens: 1000
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`OpenAI API error: ${errorData.error?.message || response.statusText}`);
      }

      const data = await response.json();
      const completionText = data.choices[0]?.message?.content || '';

      return {
        text: completionText,
        date: new Date(),
        sender: 'AGENT'
      };
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      return {
        text: 'Sorry, I encountered an error while processing your request. Please try again later.',
        date: new Date(),
        sender: 'AGENT'
      };
    }
  }
}

// Export a singleton instance for easy import
export const api = new Api();
