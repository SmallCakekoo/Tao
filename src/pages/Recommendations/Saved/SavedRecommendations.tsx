import { useEffect, useState } from 'react';

import {
  getRecommendationsByIds,
} from '../../../services/recommendationService';
import type { RecommendationCard } from '../../../types/RecommendationViewTypes';

type Props = {
  recommendationIds: string[];
  onClose: () => void;
};

export const SavedRecommendations = ({
  recommendationIds,
  onClose,
}: Props) => {

  const [cards, setCards] = useState<RecommendationCard[]>([]);

  useEffect(() => {

    const fetchCards = async () => {

      try {

        const data =
          await getRecommendationsByIds(
            recommendationIds
          );

        setCards(data);

      } catch (error) {
        console.error(error);
      }
    };

    fetchCards();

  }, [recommendationIds]);

  return (
    <div className="overlay-bg">

      <div className="saved-overlay">

        <button onClick={onClose}>
          Close
        </button>

        {cards.map((card) => (
          <div
            key={card.id}
            className="saved-card"
          >
            <h3>{card.title}</h3>

            <p>{card.subtitle}</p>
          </div>
        ))}

      </div>

    </div>
  );
};