import { supabase } from '../lib/supabaseClient';
import type { Macrostate } from '../types/CheckinTypes';

export interface PersonalizedRecommendation {
  id: string;
  title: string;
  description: string;
  macrostate: string;
}

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
