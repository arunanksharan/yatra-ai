import { NextResponse } from 'next/server';
import { OpenAIService } from '@/services/openai';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const openAIService = new OpenAIService();

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    console.log(messages);

    const response = await openAIService.generateResponse(messages);
    return NextResponse.json({ success: true, data: response });
  } catch (error) {
    console.error(error);
    let errorMessage = 'Failed to process message';

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    // Return a structured error response that the UI can handle
    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        details:
          process.env.NODE_ENV === 'development' ? String(error) : undefined,
      },
      { status: 500 }
    );
  }
}
