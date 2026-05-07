import type { PresetFeelingButtonProps } from '../../types/ComponentProps';

export const PresetFeelingButton = ({
  label,
  icon,
  feeling,
  onSelect,
}: PresetFeelingButtonProps) => {
  return (
    <button
      type="button"
      className="preset-chip"
      onClick={() => onSelect(feeling)}
      aria-label={label}
    >
      <span>{label}</span>
      <img src={icon} alt={`${label} mood icon`} aria-hidden="true" />
    </button>
  );
};
