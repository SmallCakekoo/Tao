import './Polaroid.css';
import type { PolaroidProps } from '../../../types/PolaroidProps';

export const Polaroid = ({ src, isPrinting }: PolaroidProps) => {
  return (
    <div className={`polaroid ${isPrinting ? 'printing' : ''}`}>
      <div className="photo">
        <img src={src} alt="captured" />
      </div>
    </div>
  );
};
