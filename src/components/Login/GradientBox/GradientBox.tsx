import type { GradientBoxProps } from '../../../types/ComponentProps';
import './GradientBox.css';

export const GradientBox = ({ mtop, mbot }: GradientBoxProps) => {
  return (
    <div className="gradient-box">
      <img src="/logo-full-white.svg" alt="Tao Logo" />

      <div className="message">
        <p className="glad">{mtop}</p>
        <h4 className="ready">{mbot}</h4>
      </div>
    </div>
  );
};
