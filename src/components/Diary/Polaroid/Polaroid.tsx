import './Polaroid.css';
import type {
  PolaroidProps
} from '../../../types/PolaroidProps';

import { useDiary }
from '../../../contexts/DiaryContext';

export const Polaroid = ({
  src,
  isPrinting,
}: PolaroidProps) => {

  const { entry } = useDiary();

  const image =
    src || entry.imageUrl;

  return (
    <div
      className={`polaroid ${
        isPrinting
          ? 'printing'
          : ''
      }`}
    >
      <div className="photo">
        {image && (
          <img
            src={image}
            alt="captured"
          />
        )}
      </div>
    </div>
  );
};