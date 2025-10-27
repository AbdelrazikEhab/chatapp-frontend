import { useEffect, useRef, useState } from 'react';
import { connectSocket, closeSocket } from '../utils/socket';
import type { Socket } from 'socket.io-client';
import axios from 'axios';

type Message = {
  username?: string;
  text?: string;
  url?: string;
  createdat?: number;
  created_at?: string;
  sender_name?: string;
};

export default function ChatPage() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [room, setRoom] = useState('general');
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<string[]>([]);
  const [connected, setConnected] = useState(false);
  const [insights, setInsights] = useState<string>('');
  const [loadingInsights, setLoadingInsights] = useState(false);
  const messagesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
      return;
    }

    const s = connectSocket(token);
    setSocket(s);

    s.on('connect', () => setConnected(true));

    s.on('roomHistory', (history: any[]) => {
      setMessages(history.map(h => ({ ...h })));
      setTimeout(() => messagesRef.current?.scrollTo({ top: messagesRef.current.scrollHeight }), 50);
    });

    s.on('message', (m: any) => {
      setMessages(prev => [...prev, m]);
      setTimeout(() => messagesRef.current?.scrollTo({ top: messagesRef.current.scrollHeight }), 50);
    });

    s.on('locationmessage', (m: any) => setMessages(prev => [...prev, m]));

    s.on('roomData', (data: any) => setUsers(data.users.map((u: any) => u.username)));

    return () => {
      closeSocket();
      setSocket(null);
    };
  }, []);

  const join = () => {
    if (!socket) return;
    socket.emit('join', { username: username || 'anon', room }, (error: any) => {
      if (error) alert(error);
    });
  };

  const send = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!socket || !message.trim()) return;
    socket.emit('SendMessage', message, (err: any) => {
      if (err) alert(err);
    });
    setMessage('');
  };

  const shareLocation = () => {
    if (!socket || !navigator.geolocation) return alert('Location not supported');
    navigator.geolocation.getCurrentPosition(pos => {
      socket.emit(
        'SendLocation',
        { latitude: pos.coords.latitude, longitude: pos.coords.longitude },
        () => console.log('Location shared')
      );
    });
  };

  /** AI INSIGHTS PANEL **/
  const fetchInsights = async () => {
    setLoadingInsights(true);
    setInsights('');
    try {
      const res = await axios.get(
        (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000') +
          `/api/ai/insights/${room}`
      );
      setInsights(res.data.insights || 'No insights generated.');
    } catch (err: any) {
      console.error(err);
      setInsights('Failed to fetch AI insights.');
    } finally {
      setLoadingInsights(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-1/4 bg-white p-4 border-r">
        <h2 className="font-semibold mb-2">Rooms</h2>
        <div className="space-y-2">
          <input
            value={room}
            onChange={e => setRoom(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="username"
          />
          <button
            onClick={join}
            className="w-full bg-blue-600 text-white p-2 rounded mt-2"
          >
            Join
          </button>
        </div>
        <div className="mt-6">
          <h3 className="font-medium">Online</h3>
          <ul className="mt-2">
            {users.map(u => (
              <li key={u} className="text-sm">
                {u}
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Chat Messages */}
      <main className="flex-1 flex flex-col">
        <div
          ref={messagesRef}
          id="messages"
          className="flex-1 overflow-auto p-4 space-y-3 bg-gray-50"
        >
          {messages.map((m, i) => (
            <div key={i} className="bg-white p-3 rounded shadow-sm">
              <div className="text-xs text-gray-500">
                {m.username || m.sender_name} •{' '}
                {m.created_at ||
                  (m.createdat
                    ? new Date(m.createdat).toLocaleTimeString()
                    : '')}
              </div>
              {m.text && <div className="mt-1">{m.text}</div>}
              {m.url && (
                <a
                  className="text-blue-600"
                  href={m.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Shared location
                </a>
              )}
            </div>
          ))}
        </div>

        <form onSubmit={send} className="p-4 bg-white border-t flex gap-2">
          <input
            value={message}
            onChange={e => setMessage(e.target.value)}
            className="flex-1 p-2 border rounded"
            placeholder="Type a message..."
          />
          <button
            type="button"
            onClick={shareLocation}
            className="px-4 py-2 border rounded"
          >
            Location
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded">
            Send
          </button>
        </form>
      </main>

      {/* AI Insights Panel */}
      <aside className="w-full md:w-1/4 bg-white p-4 border-l flex flex-col">
        <h3 className="font-semibold mb-2">AI Insights</h3>

        {!insights && (
          <div className="text-sm text-gray-600">
            Click below to analyze this room’s conversation using AI.
          </div>
        )}

        <button
          onClick={fetchInsights}
          disabled={loadingInsights}
          className="mt-4 px-3 py-2 bg-blue-600 text-white rounded"
        >
          {loadingInsights ? 'Analyzing...' : 'Generate Insights'}
        </button>

        {insights && (
          <div className="mt-4 bg-gray-100 p-3 rounded border text-sm whitespace-pre-wrap">
            {insights}
          </div>
        )}
      </aside>
    </div>
  );
}
