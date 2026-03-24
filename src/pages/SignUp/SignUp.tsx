import { Link } from "react-router-dom";
import './SignUp.css'
import { BackButton } from "../../components/BackButton/BackButton";


export const SignUp = () => {
  return (
    <div className="signup">
      <div className="gradient-box">
        <img src="/logo-full-white.svg" alt="Tao Logo" />
        <div className="message">
          <p className="easily">You can easily</p>
          <h4 className="get">Get access to your personal hub for clarity and productivity.</h4>
        </div>
      </div>

        <div className="form-area">
        <BackButton/>
          <h3 className="create-a">Create an account</h3>
          <p className="already">
            And begin to take care of your mind today. <Link to='/login'>Already have an account?</Link>
          </p>
          <form>
            <label className="form-label">
                Email
                <input type="email" name="email" placeholder="name@example.com"/>
            </label>
            <label className="form-label">
                Password
                <small className="pass-condition">Must have at least 6 characters</small>
                <input type="password" name="password"/>
            </label>
            <div className="name-area">
                <h3>Hello,</h3>
                <input type="text" />
            </div>
            <button>Get started</button>
          </form>
        </div>
    </div>
  );
};
