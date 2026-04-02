import './Agenda.css';
import { AnimatedLine } from '../../components/Home/AnimatedLine/AnimatedLine';
import { HomeNavbar } from '../../components/NavBar/CommonNavBar/HomeNavbar';
import { AgendaContent } from '../../components/AgendaContent/AgendaContent';

export const Agenda = () => {
  return (
    <div className="agenda">
      <HomeNavbar />
      <AnimatedLine />

      <div className="agenda-header">
        <div className="diary-header-container">
          <h1>Your Agenda</h1>
          <p>A space to keep track of your tasks, calmly.</p>
        </div>

        <div className="diary-quote-container">
          <h5 className="quote-content">
            The key is not to prioritize what's on your schedule, but to schedule your
            priorities.
          </h5>
          <p className="quote-author">— Stephen Covey</p>
        </div>
      </div>

      <div className="agenda-content">
        <AgendaContent></AgendaContent>
      </div>
    </div>
  );
};
