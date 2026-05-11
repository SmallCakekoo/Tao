import './Diary.css';
import { IconChevronUp } from '@tabler/icons-react';
import { IconChevronDown } from '@tabler/icons-react';

import { DiaryDate } from '../../components/Diary/DiaryDate/DiaryDate';
import { Intention } from '../../components/Diary/Intention/Intention';
import { Polaroid } from '../../components/Diary/Polaroid/Polaroid';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { DiaryButtons } from '../../components/Diary/DiaryButtons/DiaryButtons';
import { Camera } from '../../components/Diary/Camera/Camera';
import { HomeNavbar } from '../../components/NavBar/CommonNavBar/HomeNavbar';
import { MobileNavBar } from '../../components/NavBar/MobileNavBar/MobileNavBar';
import { useAuth } from '../../contexts/AuthContext';
import { getDiaryEntryByDate } from '../../services/diaryService';
import { saveDiaryEntry } from '../../services/diaryService';
import type { PromptKey } from '../../types/PromptKey';
import { useDiary } from '../../contexts/DiaryContext';
import { SavedRecommendations } from '../Recommendations/Saved/RecommendationsSaved';

export const Diary = () => {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);
  const [showCamera, setShowCamera] = useState<boolean>(false);
  const [selected, setSelected] = useState<PromptKey | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [loadingEntry, setLoadingEntry] = useState<boolean>(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [recommendationIds, setRecommendationsIds] = useState<string[]>([]);

  const { entry, setEntry } = useDiary();
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
    setEntry({
      area1: '',
      area2: '',
      imageUrl: '',
    });
    setSelected(null);

    setSelectedDate(date);
    console.log(entry);
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const setCamera = (): void => {
    setShowCamera(true);
  };

  const nextWeek = () => {
    setSelected(null);
    const next = new Date(selectedDate);

    next.setDate(next.getDate() + 7);

    setSelectedDate(next);
  };

  const previousWeek = () => {
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
          setEntry(
            data.content ?? {
              area1: '',
              area2: '',
              imageUrl: '',
            }
          );

          setSelected(data.intention ?? null);

          if (data.saved_recommendations && data.saved_recommendations.length > 0) {
            setRecommendationsIds(data.saved_recommendations);
          } else {
            setRecommendationsIds([]);
          }
        } else {
          setEntry({
            area1: '',
            area2: '',
            imageUrl: '',
          });

          setSelected(null);
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

  useEffect(() => {
    if (!user) return;

    if (!entry.imageUrl) return;

    handleSave();
  }, [entry.imageUrl]);

  return (
    <>
      {showRecommendations &&
        createPortal(
          <div className="overlay-bg">
            <SavedRecommendations
              recommendationIds={recommendationIds}
              closeOverlay={() => setShowRecommendations(false)}
            />
          </div>,
          document.body
        )}
      {!isMobile && <HomeNavbar />}

      <div className="diary">
        {showCamera && <Camera onClose={() => setShowCamera(false)} />}
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
              {isMobile && (
                <DiaryButtons
                  setCamera={setCamera}
                  handleSave={handleSave}
                  setShowRecommendations={setShowRecommendations}
                />
              )}
              <textarea
                name="entry1"
                id="entry1"
                className="text-entry"
                placeholder="Feel free to journal your current thoughts or follow the prompt based on your needs"
                value={entry.area1}
                onChange={(e) =>
                  setEntry((prev) => ({
                    ...prev,
                    area1: e.target.value,
                  }))
                }
              ></textarea>
            </div>
            <div className="page2">
              <textarea
                name="entry2"
                id="entry2"
                className="text-entry"
                placeholder="Feel free to journal your current thoughts or follow the prompt based on your needs"
                value={entry.area2}
                onChange={(e) =>
                  setEntry((prev) => ({
                    ...prev,
                    area2: e.target.value,
                  }))
                }
              ></textarea>
              {entry.imageUrl && <Polaroid src={entry.imageUrl} />}
            </div>
          </div>
        </div>
        <aside className="options">
          {!isMobile && (
            <DiaryButtons
              setCamera={setCamera}
              handleSave={handleSave}
              setShowRecommendations={setShowRecommendations}
            />
          )}
        </aside>
      </div>
      <MobileNavBar />
    </>
  );
};
