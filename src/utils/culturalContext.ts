import { Language } from '../types';

export interface CulturalContext {
  greeting: string;
  farewell: string;
  thankYou: string;
  traditionalClothing: string[];
  culturalValues: string[];
  importantConcepts: string[];
}

export const CULTURAL_CONTEXTS: Record<string, CulturalContext> = {
  fulfulde: {
    greeting: 'Respect for elders is paramount in Fulani culture',
    farewell: 'Blessings are exchanged when parting',
    thankYou: 'Gratitude is expressed through actions and words',
    traditionalClothing: ['Boubou', 'Traditional headwrap', 'Leather sandals', 'Silver jewelry'],
    culturalValues: ['Hospitality', 'Respect for elders', 'Pastoral wisdom', 'Community solidarity'],
    importantConcepts: ['Pulaaku (Fulani code of conduct)', 'Cattle as wealth', 'Nomadic heritage', 'Islamic influence']
  },
  ewondo: {
    greeting: 'Greetings acknowledge the spiritual presence in others',
    farewell: 'Departures include wishes for safe journeys',
    thankYou: 'Appreciation is shown through reciprocity',
    traditionalClothing: ['Kaba Ngondo', 'Traditional wrapper', 'Beaded accessories', 'Carved ornaments'],
    culturalValues: ['Forest wisdom', 'Ancestral respect', 'Community harmony', 'Traditional medicine'],
    importantConcepts: ['Beti philosophy', 'Forest spirits', 'Traditional governance', 'Oral traditions']
  },
  duala: {
    greeting: 'Coastal greetings reflect maritime heritage',
    farewell: 'Farewells invoke protection of water spirits',
    thankYou: 'Gratitude connects to trade relationships',
    traditionalClothing: ['Coastal wrapper', 'Traditional beads', 'Fishing attire', 'Ceremonial dress'],
    culturalValues: ['Maritime heritage', 'Trade relationships', 'Water spirituality', 'Cultural exchange'],
    importantConcepts: ['Jengu (water spirits)', 'Trading traditions', 'Coastal wisdom', 'Cultural fusion']
  },
  bamileke: {
    greeting: 'Greetings honor the chieftaincy system',
    farewell: 'Departures include royal blessings',
    thankYou: 'Appreciation follows hierarchical protocols',
    traditionalClothing: ['Toghu', 'Royal regalia', 'Traditional caps', 'Ceremonial accessories'],
    culturalValues: ['Royal traditions', 'Artistic excellence', 'Community cooperation', 'Cultural pride'],
    importantConcepts: ['Fon (traditional ruler)', 'Artistic heritage', 'Secret societies', 'Highland culture']
  }
};

export function getCulturalContext(languageId: string): CulturalContext | null {
  return CULTURAL_CONTEXTS[languageId] || null;
}

export function getTraditionalGreeting(languageId: string): string {
  const context = getCulturalContext(languageId);
  return context?.greeting || 'Traditional greetings are important in this culture';
}

export function getCulturalTip(languageId: string, category: string): string {
  const context = getCulturalContext(languageId);
  if (!context) return '';

  switch (category) {
    case 'greetings':
      return context.greeting;
    case 'family':
      return 'Family relationships are deeply respected in this culture';
    case 'food':
      return 'Sharing meals is a sacred act of community bonding';
    default:
      return context.culturalValues[0] || '';
  }
}