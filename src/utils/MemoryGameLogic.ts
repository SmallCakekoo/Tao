import type { MemoryCard, GridSize } from '../types/MemoryGametTypes';

// Nombres exactos de los archivos en src/assets/recs-images/
const ALL_IMAGES = [
  'reflexion.png',
  'selfcare_release tension.png',
  'selfcare_time for you.png',
  'nutrition_adaptogenic suport.png',
  'nutrition_energy.png',
  'nutrition.png',
  'Fokus task,_measurablegoals.png',
  'Fokus Tasks.png',
  'maintain your balance.png',
  'social connections.png',
  'organize yourself_make a plan.png',
  'organize yourself_structure.png',
  'organize yourself.png',
  'Mindful shower.png',
  'Develop New Skill.png',
];

export function getGridCols(size: GridSize): number {
  return parseInt(size.split('x')[0]);
}

export function getGridTotal(size: GridSize): number {
  const cols = getGridCols(size);
  return cols * cols;
}

export function buildCards(size: GridSize): MemoryCard[] {
  const total = getGridTotal(size);
  const pairsNeeded = Math.floor(total / 2);

  const selected = [...ALL_IMAGES]
    .sort(() => Math.random() - 0.5)
    .slice(0, pairsNeeded);

  const pairs = selected.flatMap((img, i) => [
    { image: img, pairId: i },
    { image: img, pairId: i },
  ]);

  // 3x3 = 9 casillas → 4 pares + 1 carta joker (arranca como matched y no se muestra)
  if (total % 2 !== 0) {
    pairs.push({ image: 'JOKER', pairId: -1 });
  }

  return pairs
    .sort(() => Math.random() - 0.5)
    .map((p, idx) => ({
      id: idx,
      image: p.image,
      pairId: p.pairId,
      isFlipped: false,
      isMatched: p.pairId === -1,
    }));
}

// ── Memoria de la CPU ────────────────────────────────────────
const cpuMemory: Record<number, string> = {};

export function cpuRemember(cardId: number, image: string) {
  cpuMemory[cardId] = image;
}

export function cpuForgetAll() {
  Object.keys(cpuMemory).forEach((k) => delete cpuMemory[+k]);
}

export function cpuChooseCards(cards: MemoryCard[]): [number, number] {
  const available = cards.filter((c) => !c.isFlipped && !c.isMatched);

  // Agrupa por imagen las cartas que la CPU recuerda y siguen disponibles
  const knownByImage: Record<string, number[]> = {};
  for (const [idStr, img] of Object.entries(cpuMemory)) {
    const id = +idStr;
    if (available.find((c) => c.id === id)) {
      knownByImage[img] ??= [];
      knownByImage[img].push(id);
    }
  }

  // Si recuerda un par completo, lo juega con 75% de probabilidad
  const knownPair = Object.values(knownByImage).find((ids) => ids.length >= 2);
  if (knownPair && Math.random() < 0.75) {
    return [knownPair[0], knownPair[1]];
  }

  // Primera carta: preferiblemente una desconocida
  const unknown = available.filter((c) => !cpuMemory[c.id]);
  const first =
    unknown.length > 0
      ? unknown[Math.floor(Math.random() * unknown.length)]
      : available[Math.floor(Math.random() * available.length)];

  // Segunda carta: busca pareja conocida, si no, aleatoria
  const firstImage = cpuMemory[first.id] ?? null;
  let second: MemoryCard | undefined;

  if (firstImage) {
    const partner = available.find(
      (c) => c.id !== first.id && cpuMemory[c.id] === firstImage
    );
    if (partner && Math.random() < 0.75) second = partner;
  }

  if (!second) {
    const rest = available.filter((c) => c.id !== first.id);
    second = rest[Math.floor(Math.random() * rest.length)];
  }

  return [first.id, second!.id];
}