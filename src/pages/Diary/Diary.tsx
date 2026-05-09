import './Diary.css';
import { IconChevronUp } from '@tabler/icons-react';
import { IconChevronDown } from '@tabler/icons-react';

import { DiaryDate } from '../../components/Diary/DiaryDate/DiaryDate';
import { Intention } from '../../components/Diary/Intention/Intention';
import { Polaroid } from '../../components/Diary/Polaroid/Polaroid';

import { useState, useEffect } from 'react';
import { DiaryButtons } from '../../components/Diary/DiaryButtons/DiaryButtons';
import { Camera } from '../../components/Diary/Camera/Camera';
import { HomeNavbar } from '../../components/NavBar/CommonNavBar/HomeNavbar';
import { MobileNavBar } from '../../components/NavBar/MobileNavBar/MobileNavBar';

export const Diary = () => {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);
  const [showCamera, setShowCamera] = useState<boolean>(false);
  const [savedImage, setSavedImage] = useState<string | null>(null);
  // Temporary, to check if image changes in local storage
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const getStartOfWeek = (date: Date) => {
    const start = new Date(date);

    const day = start.getDay();

    start.setDate(start.getDate() - day);

    return start;
  };

  const startOfWeek = getStartOfWeek(selectedDate);

  const weekDates = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(startOfWeek);

    date.setDate(startOfWeek.getDate() + index);

    return date;
  });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Check if there is an image inside local storage (Temporary)
  useEffect(() => {
    const image = localStorage.getItem('capturedPhoto');
    if (image) {
      setSavedImage(image);
    }
  }, []);

  const setCamera = (): void => {
    setShowCamera(true);
  };

  const nextWeek = () => {
    const next = new Date(selectedDate);

    next.setDate(next.getDate() + 7);

    setSelectedDate(next);
  };

  const previousWeek = () => {
    const prev = new Date(selectedDate);

    prev.setDate(prev.getDate() - 7);

    setSelectedDate(prev);
  };

  return (
    <>
      {!isMobile && <HomeNavbar />}

      <div className="diary">
        {showCamera && (
          <Camera
            onClose={() => setShowCamera(false)}
            onCapture={(img) => setCapturedImage(img)}
          />
        )}
        <aside className="side">
          <IconChevronUp className="arrow up" onClick={previousWeek}/>
          <div className="dates">
            {weekDates.map((date) => (
              <DiaryDate
                key={date.toISOString()}
                date={date}
                isSelected={date.toDateString() === selectedDate.toDateString()}
                onClick={() => setSelectedDate(date)}
              />
            ))}
          </div>
          <IconChevronDown className="arrow down" onClick={nextWeek}/>
        </aside>

        <div className="notebook-wrapper">
          <div className="notebook">
            <div className="page1">
              <div className="date-day">
                <h5>Saturday</h5>
                <p>Mar 15, 2026</p>
              </div>
              <Intention></Intention>
              {isMobile && <DiaryButtons setCamera={setCamera} />}
              <textarea
                name="entry1"
                id="entry1"
                className="text-entry"
                placeholder="Feel free to journal your current thoughts or follow the prompt based on your needs"
              ></textarea>
            </div>
            <div className="page2">
              <textarea
                name="entry2"
                id="entry2"
                className="text-entry"
                placeholder="Feel free to journal your current thoughts or follow the prompt based on your needs"
              ></textarea>
              {capturedImage && <Polaroid src={capturedImage} />}
            </div>
          </div>
        </div>
        <aside className="options">
          {!isMobile && <DiaryButtons setCamera={setCamera} />}
        </aside>
      </div>
      <MobileNavBar />
    </>
  );
};
