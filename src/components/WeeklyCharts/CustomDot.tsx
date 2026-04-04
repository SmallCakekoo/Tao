import good from "../../assets/stickers/good.svg";
import type {DotsProps} from "../../types/ProfileProps";

const size = 25;

export const CustomDot = ({ cx = 0, cy = 0 }: DotsProps) => {
  return (
    <image
      href={good}
      x={cx - size / 2}
      y={cy - size / 2}
      width={size}
      height={size}
    />
  );
};