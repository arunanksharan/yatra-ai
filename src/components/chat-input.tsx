'use client';

import { useState } from 'react';
import { useChatStore } from '@/store/useChatStore';
import { useFlightOfferingsStore } from '@/store/useFlightOfferingsStore';

const ChatInput = () => {
  const [input, setInput] = useState('');
  const { addMessage, isLoading, setIsLoading } = useChatStore();
  const { addFlightOffers } = useFlightOfferingsStore();
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    addMessage({ role: 'user', content: input });
    setIsLoading(true);
    setInput('');

    try {
      // Get latest messages including the one just added above
      const allMessages = useChatStore.getState().messages;
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: allMessages }),
      });

      const data = await response.json();
      addMessage({ role: 'assistant', content: data.message });
      if (data.data) {
        console.log(`${JSON.stringify(data.data)}`)
        addFlightOffers(data.data);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsLoading(false);
      setInput('');
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const audioChunks: Blob[] = [];

      recorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      recorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const formData = new FormData();
        formData.append('audio', audioBlob);

        try {
          const response = await fetch('/api/transcript', {
            method: 'POST',
            body: formData,
          });

          const data = await response.json();
          if (data.transcription) {
            setInput(data.transcription);
          }
        } catch (error) {
          console.error('Failed to transcribe audio:', error);
        }
      };

      setMediaRecorder(recorder);
      recorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Failed to start audio recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };


  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div className="flex gap-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 resize-none rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
        />
        <button
          type="button"
          onClick={isRecording ? stopRecording : startRecording}
          className={`${isRecording ? 'border-2 px-6 bg-blue-500' : 'border-2 bg-blue-100'
            } text-white px-4 py-2 rounded-lg hover:bg-blue-200 disabled:opacity-50`}
          style={{ fontSize: '2rem', lineHeight: '1' }}
        >
          {isRecording ? '||' : '🎤'}
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
