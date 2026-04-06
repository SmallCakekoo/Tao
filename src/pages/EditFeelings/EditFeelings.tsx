import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconArrowLeft, IconChevronDown } from '@tabler/icons-react';
import { HomeNavbar } from '../../components/NavBar/CommonNavBar/HomeNavbar';
import { MobileNavBar } from '../../components/NavBar/MobileNavBar/MobileNavBar';
import bgResponsiveLine from '../../assets/bg-responsive-line.svg';
import awfulImg from '../../assets/stickers/awful.svg';
import badImg from '../../assets/stickers/bad.svg';
import neutralImg from '../../assets/stickers/neutral.svg';
import goodImg from '../../assets/stickers/good.svg';
import greatImg from '../../assets/stickers/great.svg';
import type { MoodOption, MoodValue, SelectKey } from '../../types/EditFeelingsTypes';
import './EditFeelings.css';

const energyOptions = ['Low Energy', 'Medium Energy', 'High Energy', 'Very high Energy'];
const sleepOptions = ['0-3 Hours', '4-6 Hours', '7-9 Hours', '10+ Hours'];
const stressOptions = [
  'Low stress or no stress',
  'Medium stress',
  'High stress',
  'Very high stress',
];
const loadOptions = ['Light', 'Manageable', 'Heavy', 'Overwhelming'];

const moodOptions: MoodOption[] = [
  { value: 'awful', image: awfulImg, label: 'Awful mood' },
  { value: 'bad', image: badImg, label: 'Bad mood' },
  { value: 'neutral', image: neutralImg, label: 'Neutral mood' },
  { value: 'good', image: goodImg, label: 'Good mood' },
  { value: 'great', image: greatImg, label: 'Great mood' },
];

export const EditFeelings = () => {
  const navigate = useNavigate();
  const [energy, setEnergy] = useState<string>('Low Energy');
  const [sleep, setSleep] = useState<string>('4-6 Hours');
  const [stress, setStress] = useState<string>('High stress');
  const [dailyLoad, setDailyLoad] = useState<string>('Heavy');
  const [mood, setMood] = useState<MoodValue>('neutral');
  const [openDropdown, setOpenDropdown] = useState<SelectKey | null>(null);

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.edit-select-wrap')) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('click', closeOnOutsideClick);
    return () => document.removeEventListener('click', closeOnOutsideClick);
  }, []);

  const handleSave = () => {
    // localStorage.setItem(
    //   'tao:daily-check-in-edit',
    //   JSON.stringify({
    //     energy,
    //     sleep,
    //     mood,
    //     stress,
    //     dailyLoad,
    //     savedAt: new Date().toISOString(),
    //   })
    // );
    navigate('/form');
  };

  const handleCancel = () => {
    navigate('/form');
  };

  const toggleDropdown = (key: SelectKey) => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  };

  const pickOption = (
    key: SelectKey,
    value: string,
    setter: (newValue: string) => void
  ) => {
    setter(value);
    setOpenDropdown((prev) => (prev === key ? null : prev));
  };

  return (
    <div className="edit-feelings-page">
      <HomeNavbar />
      <img src={bgResponsiveLine} alt="" className="edit-feelings-line" />

      <div className="edit-feelings-container">
        <button className="edit-feelings-back" onClick={() => navigate('/form')}>
          <IconArrowLeft size={16} />
          <span>Back</span>
        </button>

        <section className="edit-feelings-card" aria-label="Edit daily check-in feelings">
          <header className="edit-feelings-header">
            <h1>Edit Feelings</h1>

            <div className="edit-feelings-actions edit-feelings-actions-desktop">
              <button type="button" className="edit-save-btn" onClick={handleSave}>
                Save changes
              </button>
              <button type="button" className="edit-cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </header>

          <div className="edit-feelings-grid">
            <label className="edit-field">
              <span>How does your body feel today?</span>
              <div
                className={`edit-select-wrap ${openDropdown === 'energy' ? 'open' : ''}`}
              >
                <button
                  type="button"
                  className="edit-select-trigger"
                  onClick={() => toggleDropdown('energy')}
                  aria-expanded={openDropdown === 'energy'}
                >
                  <span>{energy}</span>
                  <IconChevronDown size={18} />
                </button>
                <ul
                  className="edit-select-menu"
                  role="listbox"
                  aria-label="Energy options"
                >
                  {energyOptions.map((option) => (
                    <li key={option} role="option" aria-selected={option === energy}>
                      <button
                        type="button"
                        className={`edit-select-option ${option === energy ? 'selected' : ''}`}
                        onClick={() => pickOption('energy', option, setEnergy)}
                      >
                        {option}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </label>

            <label className="edit-field">
              <span>How much did you sleep?</span>
              <div
                className={`edit-select-wrap ${openDropdown === 'sleep' ? 'open' : ''}`}
              >
                <button
                  type="button"
                  className="edit-select-trigger"
                  onClick={() => toggleDropdown('sleep')}
                  aria-expanded={openDropdown === 'sleep'}
                >
                  <span>{sleep}</span>
                  <IconChevronDown size={18} />
                </button>
                <ul
                  className="edit-select-menu"
                  role="listbox"
                  aria-label="Sleep options"
                >
                  {sleepOptions.map((option) => (
                    <li key={option} role="option" aria-selected={option === sleep}>
                      <button
                        type="button"
                        className={`edit-select-option ${option === sleep ? 'selected' : ''}`}
                        onClick={() => pickOption('sleep', option, setSleep)}
                      >
                        {option}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </label>

            <div className="edit-field edit-field-full">
              <span>How are you feeling today?</span>
              <div className="edit-mood-row" role="radiogroup" aria-label="Mood options">
                {moodOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    role="radio"
                    aria-checked={mood === option.value}
                    className={`edit-mood-btn ${mood === option.value ? 'active' : ''}`}
                    onClick={() => setMood(option.value)}
                  >
                    <img src={option.image} alt={option.label} />
                  </button>
                ))}
              </div>
            </div>

            <label className="edit-field">
              <span>How stressed do you feel today?</span>
              <div
                className={`edit-select-wrap ${openDropdown === 'stress' ? 'open' : ''}`}
              >
                <button
                  type="button"
                  className="edit-select-trigger"
                  onClick={() => toggleDropdown('stress')}
                  aria-expanded={openDropdown === 'stress'}
                >
                  <span>{stress}</span>
                  <IconChevronDown size={18} />
                </button>
                <ul
                  className="edit-select-menu"
                  role="listbox"
                  aria-label="Stress options"
                >
                  {stressOptions.map((option) => (
                    <li key={option} role="option" aria-selected={option === stress}>
                      <button
                        type="button"
                        className={`edit-select-option ${option === stress ? 'selected' : ''}`}
                        onClick={() => pickOption('stress', option, setStress)}
                      >
                        {option}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </label>

            <label className="edit-field">
              <span>How's your daily load?</span>
              <div
                className={`edit-select-wrap ${openDropdown === 'dailyLoad' ? 'open' : ''}`}
              >
                <button
                  type="button"
                  className="edit-select-trigger"
                  onClick={() => toggleDropdown('dailyLoad')}
                  aria-expanded={openDropdown === 'dailyLoad'}
                >
                  <span>{dailyLoad}</span>
                  <IconChevronDown size={18} />
                </button>
                <ul
                  className="edit-select-menu"
                  role="listbox"
                  aria-label="Daily load options"
                >
                  {loadOptions.map((option) => (
                    <li key={option} role="option" aria-selected={option === dailyLoad}>
                      <button
                        type="button"
                        className={`edit-select-option ${option === dailyLoad ? 'selected' : ''}`}
                        onClick={() => pickOption('dailyLoad', option, setDailyLoad)}
                      >
                        {option}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </label>
          </div>
        </section>

        <div className="edit-feelings-actions edit-feelings-actions-mobile">
          <button type="button" className="edit-save-btn" onClick={handleSave}>
            Save changes
          </button>
          <button type="button" className="edit-cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
        </div>

        <MobileNavBar />
      </div>
    </div>
  );
};
