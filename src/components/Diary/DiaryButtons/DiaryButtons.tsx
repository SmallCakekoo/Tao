import { IconCamera, IconMail } from "@tabler/icons-react";
import './DiaryButtons.css'

export const SmallButtons = () => (
  <div className="options small">
    <div className='s-blue-circle'>
      <IconMail size={32} />
    </div>
    <div className='s-blue-circle'>
      <IconCamera size={32} />
    </div>
  </div>
);

export const BigButtons = () => (
  <aside className="options">
    <div className='blue-circle'>
      <IconMail size={32} />
    </div>
    <div className='blue-circle'>
      <IconCamera size={32} />
    </div>
  </aside>
);