import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register({ name, email, password });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page container auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1>Create account</h1>
        <p className="auth-form__subtitle">Join CineTrack and start tracking movies</p>
        {error && <div className="alert alert--error">{error}</div>}
        <label>
          Name
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="input" />
        </label>
        <label>
          Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="input" />
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} className="input" />
        </label>
        <button type="submit" className="btn btn--primary btn--block" disabled={loading}>
          {loading ? 'Creating account...' : 'Register'}
        </button>
        <p className="auth-form__footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
