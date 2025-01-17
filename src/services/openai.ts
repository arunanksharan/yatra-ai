import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions';
import openai from '@/lib/openai/config';
import { SYSTEM_PROMPT } from '@/lib/openai/prompts';
import { llm_tools } from '@/lib/openai/llm_tools';
import { callToolFunction } from '@/lib/openai/response_handler';
import { LLMService, LLMResponse } from './types';

export class OpenAIService implements LLMService {
  async generateResponse(
    messages: ChatCompletionMessageParam[]
  ): Promise<LLMResponse> {
    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages,
        tools: llm_tools,
      });

      const assistantMessage = completion.choices[0].message;
      const toolCalls = assistantMessage.tool_calls;
      const content = assistantMessage.content || '';

      if (toolCalls && toolCalls.length > 0) {
        return await this.handleToolCall(toolCalls[0], messages);
      }

      return {
        message: content,
        data: null,
      };
    } catch (error) {
      console.error('OpenAI Service Error:', error);
      throw error;
    }
  }

  private async handleToolCall(
    toolCall: any,
    messages: ChatCompletionMessageParam[]
  ) {
    const functionName = toolCall.function.name;
    const functionArguments = JSON.parse(toolCall.function.arguments);

    const toolResponse = await callToolFunction(
      functionName,
      functionArguments
    );

    const updatedMessages = [
      { role: 'system' as const, content: SYSTEM_PROMPT },
      ...messages,
      {
        role: 'assistant' as const,
        content: 'We have successfully fetched the flight details for you!',
      },
    ];

    const newCompletion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: updatedMessages,
    });

    return {
      message: newCompletion.choices[0].message.content || '',
      data: toolResponse.data,
    };
  }
}
