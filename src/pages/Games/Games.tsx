import './Games.css';
import { useState } from 'react';
import { HomeNavbar } from '../../components/NavBar/CommonNavBar/HomeNavbar';
import { MobileNavBar } from '../../components/NavBar/MobileNavBar/MobileNavBar';
import { MemoryGame } from '../../components/MemoryGame/Game/MemoryGame';
import type { GameMode, GridSize } from '../../types/MemoryGametTypes';

type ActiveGame = 'memory' | null;

export const Games = () => {
  const [activeGame, setActiveGame] = useState<ActiveGame>(null);
  const [memoryConfig, setMemoryConfig] = useState<{ mode: GameMode; size: GridSize } | null>(null);

  const [memoryMode, setMemoryMode] = useState<GameMode>('1vsCPU');
  const [memorySize, setMemorySize] = useState<GridSize>('4x4');

  const handlePlay = () => {
    setMemoryConfig({ mode: memoryMode, size: memorySize });
    setActiveGame('memory');
  };

  const handleClose = () => {
    setActiveGame(null);
    setMemoryConfig(null);
  };

  return (
    <div className="games">
      <HomeNavbar />

      <div className="games-content">
        <div className="games-header">
          <h2 className="games-title">Mini games</h2>
          <p className="games-subtitle">Take a break and train your mind</p>
        </div>

        <div className="games-grid">

          {/* ── Memory card ── */}
          <div className="game-card">
            <div className="game-card-cover game-card-cover--memory">
              <span className="game-card-cover-emoji">🃏</span>
            </div>
            <div className="game-card-body">
              <h3 className="game-card-name">Memory</h3>
              <p className="game-card-desc">
                Find all the pairs. Play solo against the CPU or challenge a friend.
              </p>

              {/* Selector de modo y tamaño */}
              <div className="game-setup">
                <div className="game-setup-row">
                  <span className="game-setup-label">Mode</span>
                  <div className="game-setup-pills">
                    {(['1vsCPU', '1vs1'] as GameMode[]).map((m) => (
                      <button
                        key={m}
                        type="button"
                        className={`game-setup-pill ${memoryMode === m ? 'game-setup-pill--active' : ''}`}
                        onClick={() => setMemoryMode(m)}
                      >
                        {m === '1vsCPU' ? 'vs CPU' : '2 Players'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="game-setup-row">
                  <span className="game-setup-label">Grid</span>
                  <div className="game-setup-pills">
                    {(['3x3', '4x4'] as GridSize[]).map((s) => (
                      <button
                        key={s}
                        type="button"
                        className={`game-setup-pill ${memorySize === s ? 'game-setup-pill--active' : ''}`}
                        onClick={() => setMemorySize(s)}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <button type="button" className="game-setup-play" onClick={handlePlay}>
                  Play
                </button>
              </div>
            </div>
          </div>

          {/* ── Placeholder próximos juegos ── */}
          <div className="game-card game-card--soon">
            <div className="game-card-cover">
              <span className="game-card-cover-emoji">🧩</span>
            </div>
            <div className="game-card-body">
              <h3 className="game-card-name">Coming soon</h3>
              <p className="game-card-desc">More games are on the way.</p>
            </div>
          </div>

        </div>
      </div>

      {/* Overlay activo */}
      {activeGame === 'memory' && memoryConfig && (
        <MemoryGame
          mode={memoryConfig.mode}
          gridSize={memoryConfig.size}
          onClose={handleClose}
        />
      )}

      <MobileNavBar />
    </div>
  );
};