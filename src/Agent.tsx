import { Message } from './useConversation';
import { api } from './Api';

/**
 * EditorAgent class responsible for modifying SQL code based on conversation or direct changes
 */
export class EditorAgent {
  /**
   * Processes agent responses to automatically extract and apply SQL changes
   * @param conversation - The conversation history
   * @param currentSql - Current SQL code
   * @returns Promise with the revised SQL code, or current SQL if no changes needed
   */
  public async listen({conversation, currentSql}: {conversation: Message[], currentSql: string}): Promise<string> {
    // Create a system message to instruct the model
    const systemMessage: Message = {
      text: `You are an SQL editor assistant.

This is the full conversation history that you are listening to as a passive observer:
${conversation.map(c => `${c.sender}: ${c.text}`).join('\n')}

      Your task is to modify the current SQL query based on the conversation history.
IMPORTANT: Your response must ONLY contain the revised SQL code without any explanations, comments, or markdown formatting.
Do not include \`\`\`sql or \`\`\` tags. Return only the raw SQL query.
Current SQL:
\`\`\`sql
${currentSql}
\`\`\`

Based on the conversation history, you must suggest the final version of the SQL query that the user wants.
Always assume the you are writing 'SELECT FROM' statements.
`,
      date: new Date(),
      sender: 'AGENT'
    };
    
    // Combine system message with conversation
    const fullConversation = [systemMessage];
    
    // Get completion from API
    const response = await api.getCompletion(fullConversation);
    
    // Return just the text (which should be only SQL)
    return response.text;
  }

  /**
   * Generates revised SQL based on conversation history and current SQL
   * @param conversation - Array of messages between user and analyst
   * @param currentSql - Current SQL code
   * @returns Promise with the revised SQL code
   */
  public async code({conversation, currentSql}: {conversation: Message[], currentSql: string}): Promise<string> {
    // Create a system message to instruct the model
    const systemMessage: Message = {
      text: `You are an SQL editor assistant.
      
      Your task is to modify the current SQL query based on the conversation history.
IMPORTANT: Your response must ONLY contain the revised SQL code without any explanations, comments, or markdown formatting.
Do not include \`\`\`sql or \`\`\` tags. Return only the raw SQL query.
Current SQL:
${currentSql}`,
      date: new Date(),
      sender: 'AGENT'
    };
    
    // Combine system message with conversation
    const fullConversation = [systemMessage, ...conversation];
    
    // Get completion from API
    const response = await api.getCompletion(fullConversation);
    
    // Return just the text (which should be only SQL)
    return response.text;
  }
  
  /**
   * Applies specific SQL changes requested by the user to the current SQL
   * @param sqlChanges - SQL snippet or description of changes to apply
   * @param currentSql - Current SQL code
   * @returns Promise with the revised SQL code
   */
  public async apply({sqlChanges, currentSql}: {sqlChanges: string, currentSql: string}): Promise<string> {
    // Create messages for the API call
    const messages: Message[] = [
      {
        text: `You are an SQL editor. Your task is to apply the requested changes to the current SQL query.
IMPORTANT: Your response must ONLY contain the revised SQL code without any explanations, comments, or markdown formatting.
Do not include \`\`\`sql or \`\`\` tags. Return only the raw SQL query.
Current SQL:
${currentSql}

Changes to apply:
${sqlChanges}`,
        date: new Date(),
        sender: 'AGENT'
      }
    ];
    
    // Get completion from API
    const response = await api.getCompletion(messages);
    
    // Return just the text (which should be only SQL)
    return response.text;
  }
}

/**
 * AnalystAgent class responsible for understanding user needs and suggesting SQL solutions
 */
export class AnalystAgent {
  /**
   * Processes user questions and provides helpful responses with SQL suggestions
   * @param conversation - Array of messages in the conversation
   * @returns Promise with the agent's response message
   */
  public async ask({conversation, currentSql}: {conversation: Message[], currentSql: string}): Promise<Message> {
    // Create a system message to instruct the model
    const systemMessage: Message = {
      text: `You are an SQL analyst assistant. Your role is to:
1. Understand the user's data needs through conversation
2. Ask clarifying questions when necessary
3. Provide SQL code suggestions that meet the user's requirements
4. Explain your SQL suggestions clearly

This is the current SQL query that the user is working on:
\`\`\`sql
${currentSql}
\`\`\`

When providing SQL code, always use code blocks with the \`\`\`sql format. Never use inline code snippets.
Be helpful, clear, and focus on generating accurate SQL queries that solve the user's problem.

Always provide at least 1 code snippet in your response.
Even if you don't know the fields, or schema, or table names, or anything, just make up something that would be a valid query.

Always assume the you are writing 'SELECT FROM' statements.
`,
      date: new Date(),
      sender: 'AGENT'
    };
    
    // Combine system message with conversation
    const fullConversation = [systemMessage, ...conversation];
    
    // Get completion from API
    return await api.getCompletion(fullConversation);
  }
}

// Export singleton instances for easy import
export const editorAgent = new EditorAgent();
export const analystAgent = new AnalystAgent();
