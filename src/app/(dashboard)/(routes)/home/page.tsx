import ChatInput from '@/components/chat-input';
import React from 'react';
import { ChatHistory } from '@/components/chat-history';
import FlightList from '@/components/flight-list';

const DashboardHome = () => {
  return (
    <div className="sm:w-screen">
      <div className="w-[400px] sm:w-2/3">
        <div className="pl-4">Ask Yatra AI</div>
        <ChatHistory />
        <ChatInput />
        <FlightList />
      </div>
    </div>
  );
};

export default DashboardHome;
