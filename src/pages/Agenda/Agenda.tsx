import "./Agenda.css"
import { AnimatedLine } from "../../components/Home/AnimatedLine/AnimatedLine"
import { Navbar } from "../../components/NavBar/LandingNavBar/Navbar"
import { AgendaContent } from "../../components/AgendaContent/AgendaContent";


export const Agenda = ({ userQuote, userQuoteAuthor }: { userQuote: string; userQuoteAuthor: string }) => {
    return(
        <div className="agenda">
            <Navbar></Navbar>
            <AnimatedLine/>

            <div className="agenda-header">
                <div className="diary-header-container">
                    <h1>Your Agenda</h1>
                    <p>A space to keep track of your tasks, calmly.</p>
                </div>

                <div className="diary-quote-container">
                    <h5 className="quote-content">{userQuote}</h5>
                    <p className="quote-author">{userQuoteAuthor}</p>
                </div>
            </div>

            <div className="agenda-content">
                <AgendaContent></AgendaContent>
                
            </div>
        </div>

    )
    
}