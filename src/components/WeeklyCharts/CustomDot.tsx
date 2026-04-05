import good from '../../assets/stickers/good.svg';
import neutral from '../../assets/stickers/neutral.svg';
import awful from '../../assets/stickers/awful.svg';
import great from '../../assets/stickers/great.svg';
import bad from '../../assets/stickers/bad.svg';
import empty from '../../assets/stickers/empty.svg';
import type { DotsProps } from '../../types/ProfileProps';

const size = 25;

export const CustomDot = ({ cx = 0, cy = 0, payload }: DotsProps) => {
  const getIcon = (value: number) => {
    switch (value) {
      case 1:
        return awful; // peor
      case 2:
        return bad;
      case 3:
        return neutral;
      case 4:
        return good;
      case 5:
        return great;
      default:
        return empty;
    }
  };
  const icon = getIcon(payload?.value ?? 0);

  return (
    <image href={icon} x={cx - size / 2} y={cy - size / 2} width={size} height={size} />
  );
};
