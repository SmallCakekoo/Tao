import { IconCamera, IconMail } from "@tabler/icons-react";
import './DiaryButtons.css'

type DiaryButtonsProps = {
  setCamera: () => void;
};

export const DiaryButtons = ({ setCamera }: DiaryButtonsProps) => (
  <div className="options">
    <div className='blue-circle'>
      <IconMail size={32} />
    </div>
    <div className='blue-circle' onClick={() => setCamera()}>
      <IconCamera size={32} />
    </div>
  </div>
);