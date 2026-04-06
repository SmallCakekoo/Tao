import './Agenda.css';
import { AnimatedLine } from '../../components/Home/AnimatedLine/AnimatedLine';
import { HomeNavbar } from '../../components/NavBar/CommonNavBar/HomeNavbar';
import { MobileNavBar } from '../../components/NavBar/MobileNavBar/MobileNavBar';
import { AgendaContent } from '../../components/AgendaContent/AgendaContent';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export const Agenda = ({
}) => {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);
  const [quote, setQuote] = useState({quote: '', author: ''})

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
      const getQuote = async () => {
        const { data: userData } = await supabase.auth.getUser();
  
        if (!userData.user) return;
  
        const { data, error } = await supabase
          .from('quotes')
          .select('*')
          .eq('user_id', userData.user.id)
          .single();
  
        if (error) {
          console.error(error.message);
          return;
        }
  
        setQuote({
          quote: data.quote,
          author: data.author
        });
      };
  
      getQuote();
    }, []);

  return (
    <div className="agenda">
      {!isMobile && <HomeNavbar />}
      <AnimatedLine />

      <div className="agenda-header">
        <div className="diary-header-container">
          <h1>Your Agenda</h1>
          <p>A space to keep track of your tasks, calmly.</p>
        </div>

        <div className="diary-quote-container">
          <h5 className="quote-content">{quote.quote}</h5>
          <p className="quote-author">— {quote.author}</p>
        </div>
      </div>

      <div className="agenda-content">
        <AgendaContent />
      </div>

      <MobileNavBar />
    </div>
  );
};
