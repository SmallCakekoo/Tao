import { Link } from 'react-router-dom';
import './SignUp.css';
import { BackButton } from '../../components/BackButton/BackButton';
import { GradientBox } from '../../components/Login/GradientBox/GradientBox';
import airplane from '../../assets/airplane.png';
import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSignUp = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError(null);

    if (!email) {
      return setError('Email is required');
    }

    if (!email.includes('@')) {
      return setError('Enter a valid email');
    }

    if (!password) {
      return setError('Password is required');
    }

    if (password.length < 6) {
      return setError('Password must be at least 6 characters');
    }

    if (!name) {
      return setError('Name is required');
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });

    if (error) {
      setError(error.message);
    } else {
      if (data.user) {
        const { error: profileError } = await supabase.from('profiles').insert({
          id: data.user.id,
          name,
        });

        if (profileError) {
          setError('Your account was created, try logging in');
        }
        await supabase.from('quotes').insert({
          quote:
            "The key is not to prioritize what's on your schedule, but to schedule your priorities",
          author: 'Stephen Covey',
          user_id: data.user.id,
        });

        setSuccess(true);
      }
    }
  };

  return (
    <div className="signup">
      <GradientBox
        mtop="You can easily"
        mbot="Get access to your personal hub for clarity and productivity."
      ></GradientBox>
      <div className="form-area">
        {success ? (
          <div className="success-box">
            <BackButton />
            <h3 className="check-email">Account created</h3>
            <p>Time to enter your calm space! Login now to start your journey.</p>
            <Link to="/login">Go to login</Link>
            <img src={airplane} alt="Paper airplane" className="airplane" />
          </div>
        ) : (
          <>
            <BackButton />

            <h3 className="create-a">Create an account</h3>

            <p className="already">
              And begin to take care of your mind today.{' '}
              <Link to="/login">Already have an account?</Link>
            </p>

            {error && <p className="error">{error}</p>}

            <form onSubmit={handleSignUp}>
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
                <small className="pass-condition">Must have at least 6 characters</small>
                <input
                  type="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>

              <div className="name-area">
                <h3>Hello,</h3>
                <input type="text" onChange={(e) => setName(e.target.value)} />
              </div>

              <button type="submit">Get started</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
