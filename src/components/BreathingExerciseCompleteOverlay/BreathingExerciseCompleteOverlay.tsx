import './BreathingExerciseCompleteOverlay.css';

type BreathingExerciseCompleteOverlayProps = {
  onRestart: () => void;
  onExit: () => void;
};

export const BreathingExerciseCompleteOverlay = ({
  onRestart,
  onExit,
}: BreathingExerciseCompleteOverlayProps) => {
  return (
    <div className="breathing-complete-backdrop" role="dialog" aria-modal="true">
      <section
        className="breathing-complete-card"
        aria-labelledby="breathing-complete-title"
      >
        <h2 id="breathing-complete-title">You finished the breathing exercise.</h2>
        <p className="breathing-complete-copy">
          Take a moment before jumping back in. If you want, you can repeat the session or
          return to the previous screen.
        </p>

        <div className="breathing-complete-stats" aria-label="Exercise summary">
          <div>
            <strong>6</strong>
            <span>deep breaths</span>
          </div>
          <div>
            <strong>60s</strong>
            <span>total time</span>
          </div>
        </div>

        <div className="breathing-complete-actions">
          <button type="button" className="breathing-complete-secondary" onClick={onExit}>
            Leave exercise
          </button>
          <button
            type="button"
            className="breathing-complete-primary"
            onClick={onRestart}
          >
            Repeat exercise
          </button>
        </div>
      </section>
    </div>
  );
};
