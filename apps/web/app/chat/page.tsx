import type { Metadata } from 'next';
import { ChatClient } from '@/components/ChatClient';

export const metadata: Metadata = {
    title: 'Flavour Find — Chat',
};

export default function ChatPage() {
    return <ChatClient />;
}
