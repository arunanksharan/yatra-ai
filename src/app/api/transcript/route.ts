import { NextResponse } from 'next/server';
import * as dotenv from 'dotenv';
import openai from '@/lib/openai/config'; // Assuming OpenAI config is initialized here

// Load environment variables from .env file
dotenv.config();

export async function POST(req: Request) {
    try {
        // Parse the FormData to get the audio file
        const formData = await req.formData();
        const audioFile = formData.get('audio') as File;

        if (!audioFile) {
            return NextResponse.json(
                { error: 'No audio file provided' },
                { status: 400 }
            );
        }

        // Call OpenAI's Whisper API for transcription
        const transcriptionResponse = await openai.audio.transcriptions.create({
            file: audioFile,
            model: 'whisper-1',
        });

        if (!transcriptionResponse || !transcriptionResponse.text) {
            return NextResponse.json(
                { error: 'Failed to transcribe audio' },
                { status: 500 }
            );
        }

        // Return the transcription text
        return NextResponse.json({
            transcription: transcriptionResponse.text,
        });
    } catch (error) {
        console.error('Error processing transcription:', error);
        return NextResponse.json(
            { error: 'Failed to process transcription' },
            { status: 500 }
        );
    }
}