import { IconArrowsDiagonalMinimize2, IconArrowsDiagonal2 } from '@tabler/icons-react';
import './Intention.css';
import { useState } from 'react';
export const Intention = () => {
  const [maximized, setMaximized] = useState(false);

  return (
    <>
      <div className={`intention ${maximized ? "expanded" : "collapsed"}`}>
        <div className={`top ${maximized ? "expanded" : "collapsed"}`}>
          <p className={`what ${maximized ? "expanded" : "collapsed"}`}>What's your intention for today?</p>
          {maximized ? (
            <IconArrowsDiagonalMinimize2 size={20} onClick={() => setMaximized(false)} />
          ) : (
            <IconArrowsDiagonal2
              size={20}
              className="icon"
              onClick={() => setMaximized(true)}
            />
          )}
        </div>
          <div className={`int-content ${maximized ? "show" : ""}`}>
            <p className="small-text">
              By setting a journaling intention you can explore and write about different
              topics.
            </p>
            <button className="small-btn">Set intention</button>
          </div>
      </div>
    </>
  );
};
