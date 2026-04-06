import { useEffect, useMemo, useState } from 'react';
import { IconArrowLeft } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { BreathingExerciseCompleteOverlay } from '../../components/BreathingExerciseCompleteOverlay/BreathingExerciseCompleteOverlay';
import type { BreathingPhase } from '../../types/BreathingExerciseTypes';
import './BreathingExercise.css';

const PHASE_SECONDS = 10;
const TOTAL_SECONDS = 60;

const toClock = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

export const BreathingExercise = () => {
  const navigate = useNavigate();
  const [elapsed, setElapsed] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const isComplete = elapsed >= TOTAL_SECONDS;

  // Avanza el contador cada segundo mientras el ejercicio no esté en pausa.
  // Es vital limpiar el intervalo al desmontar el componente para evitar memory leaks.
  useEffect(() => {
    if (isPaused || isComplete) {
      return;
    }

    const timer = window.setInterval(() => {
      setElapsed((prev) => {
        if (prev >= TOTAL_SECONDS) {
          window.clearInterval(timer);
          return TOTAL_SECONDS;
        }

        return prev + 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [isPaused, isComplete]);

  // La fase cambia cada 10 segundos, alternando entre inhalar y exhalar.
  // Se usa useMemo para evitar cálculos innecesarios en cada renderizado, ya que solo depende del tiempo transcurrido.
  // Se podría calcular directamente en el render, pero esto es más eficiente.
  const phase: BreathingPhase = useMemo(() => {
    return Math.floor(elapsed / PHASE_SECONDS) % 2 === 0 ? 'in' : 'out';
  }, [elapsed]);

  const phaseLabel = phase === 'in' ? 'Breath In' : 'Breath Out';

  const restartExercise = () => {
    setElapsed(0);
    setIsPaused(false);
  };

  return (
    <div className="breathing-page">
      <main className="breathing-main">
        <button className="breathing-back" onClick={() => navigate(-1)}>
          <IconArrowLeft size={16} />
          <span>Back</span>
        </button>

        <section className="breathing-content">
          <h1>It’s time to breathe.</h1>
          <p>
            Take a few minutes to anchor yourself in the present moment with 6 deep
            breaths.
          </p>

          <div className="breathing-circle-wrap">
            {/* 
              El círculo visual sincroniza su estado de animación (CSS Keyframes) 
              con el estado de pausa de React.
            */}
            <div
              className={`breathing-circle breathing-circle-${phase}`}
              style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
            >
              <div className="breathing-circle-inner" />
            </div>
          </div>

          <h2>{phaseLabel}</h2>
          <small>{toClock(elapsed)}</small>

          <button
            className="breathing-pause"
            onClick={() => setIsPaused((prev) => !prev)}
            disabled={isComplete}
          >
            {isPaused ? 'Resume exercise' : 'Pause exercise'}
          </button>
        </section>
      </main>

      {isComplete ? (
        <BreathingExerciseCompleteOverlay
          onRestart={restartExercise}
          onExit={() => navigate(-1)}
        />
      ) : null}
    </div>
  );
};
