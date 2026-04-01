import { Link } from "react-router-dom";
import './LogIn.css'
import { BackButton } from "../../components/BackButton/BackButton";
import { GradientBox } from "../../components/Login/GradientBox/GradientBox";

export const LogIn = () => {
  return (
    <div className="login">
      
        <GradientBox mtop="Glad you’re back!" 
        mbot="Ready to dive in to your personalized recommendations?">
        </GradientBox>

        <div className="form-area">
          <BackButton/>

          <h3 className="welcome">Welcome back!</h3>
          <p className="first">
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
