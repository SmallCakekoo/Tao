import './Feeling.css'

export const Feeling = () => {
    return(
        <div className="feeling">
        <div className="message"> 
            <h5 className='message-h'>How are you feeling <span>today?</span></h5>
            <p className='message-p'>By registering your daily feelings, you can get personalized recommendations.</p>
        </div>
        <button>Register feelings</button>
        </div>
    )
}