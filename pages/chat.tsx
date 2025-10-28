import { useEffect, useRef, useState } from 'react';
import { connectSocket, closeSocket } from '../utils/socket';
import type { Socket } from 'socket.io-client';
import { Menu, X, Send, MapPin, Zap, Users } from 'lucide-react';

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
  const [showSidebar, setShowSidebar] = useState(false);
  const [showInsights, setShowInsights] = useState(false);
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
    setShowSidebar(false);
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

  const fetchInsights = async () => {
    setLoadingInsights(true);
    setInsights('');
    try {
      const res = await fetch(
        (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000') +
          `/api/ai/insights/${room}`
      );
      const data = await res.json();
      setInsights(data.insights || 'No insights generated.');
    } catch (err: any) {
      console.error(err);
      setInsights('Failed to fetch AI insights.');
    } finally {
      setLoadingInsights(false);
    }
  };

  return (
    <div className="h-screen flex bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b z-40 px-4 py-3 flex items-center justify-between shadow-sm">
        <button onClick={() => setShowSidebar(!showSidebar)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Menu size={24} className="text-gray-700" />
        </button>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${connected ? 'bg-green-500' : 'bg-gray-400'}`} />
          <span className="font-semibold text-gray-800">#{room}</span>
        </div>
        <button onClick={() => setShowInsights(!showInsights)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Zap size={24} className="text-blue-600" />
        </button>
      </div>

      {/* Sidebar Overlay (Mobile) */}
      {showSidebar && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setShowSidebar(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed md:relative w-72 md:w-80 bg-white h-full z-50 transition-transform duration-300 ease-in-out border-r border-gray-200 flex flex-col ${showSidebar ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-5 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">Rooms</h2>
            <button onClick={() => setShowSidebar(false)} className="md:hidden p-1 hover:bg-gray-100 rounded">
              <X size={20} />
            </button>
          </div>
          
          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Room Name</label>
              <input
                value={room}
                onChange={e => setRoom(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="general"
              />
            </div>
            
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Username</label>
              <input
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="Enter username"
              />
            </div>
            
            <button
              onClick={join}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2.5 rounded-lg font-medium transition-all shadow-md hover:shadow-lg"
            >
              Join Room
            </button>
          </div>
        </div>

        <div className="flex-1 p-5 overflow-y-auto">
          <div className="flex items-center gap-2 mb-3">
            <Users size={18} className="text-gray-600" />
            <h3 className="font-semibold text-gray-800">Online ({users.length})</h3>
          </div>
          <ul className="space-y-2">
            {users.map(u => (
              <li key={u} className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-sm font-medium text-gray-700">{u}</span>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col h-full">
        {/* Desktop Header */}
        <div className="hidden md:flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${connected ? 'bg-green-500' : 'bg-gray-400'}`} />
            <h1 className="text-xl font-bold text-gray-800">#{room}</h1>
          </div>
          <button
            onClick={() => setShowInsights(!showInsights)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <Zap size={18} />
            <span className="font-medium">AI Insights</span>
          </button>
        </div>

        {/* Messages */}
        <div
          ref={messagesRef}
          className="flex-1 overflow-y-auto px-4 md:px-6 py-4 mt-14 md:mt-0"
          style={{ scrollBehavior: 'smooth' }}
        >
          <div className="max-w-4xl mx-auto space-y-3">
            {messages.map((m, i) => (
              <div key={i} className="animate-fadeIn">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs font-bold">
                      {(m.username || m.sender_name || 'A')[0].toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="font-semibold text-gray-800 text-sm">
                        {m.username || m.sender_name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {m.created_at || (m.createdat ? new Date(m.createdat).toLocaleTimeString() : '')}
                      </span>
                    </div>
                    
                    {m.text && (
                      <div className="bg-white px-4 py-2.5 rounded-2xl rounded-tl-sm shadow-sm border border-gray-100">
                        <p className="text-gray-800 text-sm leading-relaxed break-words">{m.text}</p>
                      </div>
                    )}
                    
                    {m.url && (
                      <a
                        href={m.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 mt-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                      >
                        <MapPin size={16} />
                        View Location
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message Input */}
        <div className="p-4 md:p-6 bg-white border-t border-gray-200">
          <div className="max-w-4xl mx-auto flex items-end gap-2">
            <button
              type="button"
              onClick={shareLocation}
              className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors flex-shrink-0"
              title="Share Location"
            >
              <MapPin size={20} className="text-gray-600" />
            </button>
            
            <div className="flex-1 relative">
              <input
                value={message}
                onChange={e => setMessage(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && send()}
                className="w-full px-4 py-3 pr-12 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="Type a message..."
              />
            </div>
            
            <button
              onClick={() => send()}
              className="p-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl transition-all shadow-md hover:shadow-lg flex-shrink-0"
            >
              <Send size={20} className="text-white" />
            </button>
          </div>
        </div>
      </main>

      {/* AI Insights Panel */}
      <aside className={`fixed md:relative w-full md:w-96 bg-white h-full z-40 transition-transform duration-300 ease-in-out border-l border-gray-200 flex flex-col ${showInsights ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}`}>
        <div className="p-5 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap size={20} className="text-blue-600" />
            <h3 className="text-lg font-bold text-gray-800">AI Insights</h3>
          </div>
          <button onClick={() => setShowInsights(false)} className="md:hidden p-1 hover:bg-gray-100 rounded">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 p-5 overflow-y-auto">
          {!insights && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap size={32} className="text-blue-600" />
              </div>
              <p className="text-sm text-gray-600 mb-6">
                Analyze this room's conversation using AI to get insights, summaries, and key topics.
              </p>
            </div>
          )}

          <button
            onClick={fetchInsights}
            disabled={loadingInsights}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 rounded-lg font-medium transition-all shadow-md hover:shadow-lg disabled:cursor-not-allowed"
          >
            {loadingInsights ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin">⚡</span>
                Analyzing...
              </span>
            ) : (
              'Generate Insights'
            )}
          </button>

          {insights && (
            <div className="mt-5 bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-xl border border-blue-100">
              <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">{insights}</p>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}