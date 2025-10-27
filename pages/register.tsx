import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const API = process.env.NEXT_PUBLIC_API_URL;

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post(API + '/api/auth/register', { name, email, password });
      const { token } = res.data;
      localStorage.setItem('token', token);
      router.push('/chat');
    } catch (err:any) {
      setError(err?.response?.data?.error || 'Register failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-semibold mb-4">Register</h1>
        {error && <div className="text-sm text-red-600 mb-2">{error}</div>}
        <form onSubmit={submit} className="space-y-3">
          <input className="w-full p-2 border rounded" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
          <input className="w-full p-2 border rounded" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input className="w-full p-2 border rounded" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
          <button className="w-full bg-green-600 text-white p-2 rounded" disabled={loading}>{loading ? 'Please wait...' : 'Register'}</button>
        </form>
        <div className="text-sm mt-4">
          Have account? <a className="text-blue-600" href="/login">Login</a>
        </div>
      </div>
    </div>
  );
}
