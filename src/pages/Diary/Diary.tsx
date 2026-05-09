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
import { useAuth } from '../../contexts/AuthContext';
import { getDiaryEntryByDate } from '../../services/diaryService';
import { saveDiaryEntry } from '../../services/diaryService';
import type { PromptKey } from '../../types/PromptKey';

export const Diary = () => {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);
  const [showCamera, setShowCamera] = useState<boolean>(false);
  const [savedImage, setSavedImage] = useState<string | null>(null);
  const [selected, setSelected] = useState<PromptKey | null>(null);
  // Temporary, to check if image changes in local storage
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [entry, setEntry] = useState<string>('');
  const [loadingEntry, setLoadingEntry] = useState<boolean>(false);
  const { user } = useAuth();

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

  const changeDate = (date: Date) => {
    setEntry('');
    setSelected(null);

    setSelectedDate(date);
  };

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
    setEntry('');
    setSelected(null);
    const next = new Date(selectedDate);

    next.setDate(next.getDate() + 7);

    setSelectedDate(next);
  };

  const previousWeek = () => {
    setEntry('');
    setSelected(null);
    const prev = new Date(selectedDate);

    prev.setDate(prev.getDate() - 7);

    setSelectedDate(prev);
  };

  useEffect(() => {
    const fetchEntry = async () => {
      if (!user) return;

      setLoadingEntry(true);

      try {
        const data = await getDiaryEntryByDate(user.id, selectedDate);

        if (data) {
          setEntry(data.content ?? '');
          setSelected(data.intention ?? null);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingEntry(false);
      }
    };

    fetchEntry();
  }, [selectedDate, user]);

  const handleSave = async () => {
    if (!user) return;
    if (loadingEntry) return;

    try {
      await saveDiaryEntry({
        userId: user.id,
        date: selectedDate,
        content: entry,
        intention: selected || '',
      });
    } catch (error) {
      console.error(error);
    }
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
          <IconChevronUp className="arrow up" onClick={previousWeek} />
          <div className="dates">
            {weekDates.map((date) => (
              <DiaryDate
                key={date.toISOString()}
                date={date}
                isSelected={date.toDateString() === selectedDate.toDateString()}
                onClick={() => changeDate(date)}
              />
            ))}
          </div>
          <IconChevronDown className="arrow down" onClick={nextWeek} />
        </aside>

        <div className="notebook-wrapper">
          <div className="notebook">
            <div className="page1">
              <div className="date-day">
                <h5>
                  {' '}
                  {selectedDate.toLocaleDateString('en-US', {
                    weekday: 'long',
                  })}
                </h5>
                <p>
                  {' '}
                  {selectedDate.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              </div>
              <Intention selected={selected} setSelected={setSelected}></Intention>
              {isMobile && <DiaryButtons setCamera={setCamera} handleSave={handleSave} />}
              <textarea
                name="entry1"
                id="entry1"
                className="text-entry"
                placeholder="Feel free to journal your current thoughts or follow the prompt based on your needs"
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
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
          {!isMobile && <DiaryButtons setCamera={setCamera} handleSave={handleSave} />}
        </aside>
      </div>
      <MobileNavBar />
    </>
  );
};
