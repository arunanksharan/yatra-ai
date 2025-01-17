import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions';

export interface LLMResponse {
  message: string;
  data: any | null;
}

export interface LLMService {
  generateResponse(
    messages: ChatCompletionMessageParam[]
  ): Promise<LLMResponse>;
}
