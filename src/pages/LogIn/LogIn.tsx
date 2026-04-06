import { Link } from 'react-router-dom';
import './LogIn.css';
import { BackButton } from '../../components/BackButton/BackButton';
import { GradientBox } from '../../components/Login/GradientBox/GradientBox';
import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

export const LogIn = () => {
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!email) return setError('Email is required');
    if (!password) return setError('Password is required');

    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setLoading(false);
      if (error.message === 'Invalid login credentials') {
        setError('Hmm, that email or password doesn’t look right...');
      } else {
        setError('Something went wrong, try again');
      }
      return;
    }

    setLoading(false);

    navigate('/home');
  };
  return (
    <div className="login">
      <GradientBox
        mtop="Glad you’re back!"
        mbot="Ready to dive in to your personalized recommendations?"
      ></GradientBox>

      <div className="form-area">
        <BackButton />

        <h3 className="welcome">Welcome back!</h3>
        <p className="first">
          First time here? <Link to="/signup">Sign up for free.</Link>
        </p>
        {error && <p className="error">{error}</p>}

        <form onSubmit={handleLogin}>
          <label className="form-label">
            Email
            <input
              type="email"
              name="email"
              placeholder="name@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="form-label">
            Password
            <input
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          {loading && <p>Loading...</p>}
          <button type="submit">Get started</button>
        </form>
      </div>
    </div>
  );
};
