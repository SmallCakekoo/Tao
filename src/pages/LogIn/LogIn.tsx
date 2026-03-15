import { Link } from "react-router-dom";
import './LogIn.css'

export const LogIn = () => {
  return (
    <div className="login">
      <div className="gradient-box">
        <img src="/logo-full-white.svg" alt="Tao Logo" />
        <div className="message">
          <p>Glad you’re back!</p>
          <h4>Ready to dive in to your personalized recommendations?</h4>
        </div>
      </div>

        <div className="form-area">
          <h3>Welcome back!</h3>
          <p>
            First time here? <Link to='/signup'>Sign up for free.</Link>
          </p>
          <form>
            <label className="form-label">
                Email
                <input type="email" name="email" placeholder="name@example.com"/>
            </label>
            <label className="form-label">
                Password
                <input type="password" name="password"/>
            </label>
            <button>Get started</button>
          </form>
        </div>
    </div>
  );
};
