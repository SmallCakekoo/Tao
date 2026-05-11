import { Link } from 'react-router-dom';
import './SignUp.css';
import { BackButton } from '../../components/BackButton/BackButton';
import { GradientBox } from '../../components/Login/GradientBox/GradientBox';
import airplane from '../../assets/airplane.png';
import { useState } from 'react';
import { signUpUser } from '../../services/authService';
import { createAccount } from '../../services/profileService';

export const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const validateSignUp = () => {
    if (!email.trim()) {
      return 'Email is required';
    }

    if (!email.includes('@')) {
      return 'Enter a valid email';
    }

    if (!password.trim()) {
      return 'Password is required';
    }

    if (password.length < 6) {
      return 'Password must be at least 6 characters';
    }

    if (!name.trim()) {
      return 'Name is required';
    }

    return null;
  };

  const handleSignUp = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const validationError = validateSignUp();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const user = await signUpUser({
        email,
        password,
        name,
      });

      if (user) {
        await createAccount({
          id: user.id,
          name,
        });
      }

      setSuccess(true);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'Something went wrong');
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
