import { supabase } from '../lib/supabaseClient';
import type { Macrostate } from '../types/CheckinTypes';
import type { PersonalizedRecommendation } from '../types/RecommendationTypes';

export const getPersonalizedRecommendations = async (
  macrostate: Macrostate
): Promise<PersonalizedRecommendation[]> => {
  const { data, error } = await supabase
    .from('personalized_recommendations')
    .select('*')
    .eq('macrostate', macrostate);

  if (error) {
    console.error('Error fetching personalized recommendations:', error);
    return [];
  }

  return data || [];
};

export const getRecommendationsByIds =
  async (ids: string[]) => {

  const { data, error } =
    await supabase
      .from("personalized_recommendations")
      .select("*")
      .in("id", ids);

  if (error) throw error;

  return data;
};