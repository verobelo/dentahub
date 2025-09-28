import { openai } from '@ai-sdk/openai';
import { streamText, UIMessage, convertToModelMessages } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: openai('gpt-4o'),
    system: `You are a helpful dental clinic assistant. You can:
    - Explain common dental procedures and what to expect
    - Provide general oral health tips and hygiene advice
    - Help patients understand dental terminology
    - Suggest appointment preparation tips
    
    You CANNOT and MUST NOT:
    - Provide medical diagnosis or treatment advice
    - Recommend specific treatments
    - Interpret symptoms
    
    Always remind users to consult with their dentist for specific medical advice.`,
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
