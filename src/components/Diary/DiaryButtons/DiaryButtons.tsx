import { IconCamera, IconMail, IconDeviceFloppy } from '@tabler/icons-react';
import type { DiaryButtonsProps } from '../../../types/ComponentProps';
import './DiaryButtons.css';

export const DiaryButtons = ({ setCamera, handleSave, setShowRecommendations }: DiaryButtonsProps) => (
  <div className="options">
    <div className="blue-circle" onClick={() => setShowRecommendations(true)}>
      <IconMail size={32} />
    </div>
    <div className="blue-circle" onClick={() => setCamera()}>
      <IconCamera size={32} />
    </div>
    <div className="blue-circle" onClick={() => handleSave()}>
      <IconDeviceFloppy size={32} />
    </div>
  </div>
);
