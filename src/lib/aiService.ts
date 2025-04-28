
import { toast } from 'sonner';

// OpenAI API key - in a real app, this would be an environment variable
const OPENAI_API_KEY = "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";

/**
 * Generates destination ideas based on user query
 */
export async function generateDestinationIdeas(query: string) {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful travel assistant that provides destination recommendations based on user queries.'
          },
          {
            role: 'user',
            content: `I'm interested in traveling to ${query}. Suggest 5 amazing destinations that match this interest, with a brief description for each.`
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      throw new Error('Failed to generate destinations');
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error generating destinations:', error);
    toast.error("Failed to generate destination ideas. Please try again.");
    throw error;
  }
}

/**
 * Generates a travel itinerary based on destination and preferences
 */
export async function generateItinerary(destination: string, startDate: string, endDate: string, interests: string[], budget: string) {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a travel planning assistant that creates detailed itineraries based on user preferences.'
          },
          {
            role: 'user',
            content: `Create a day-by-day travel itinerary for a trip to ${destination} from ${startDate} to ${endDate}. 
            I'm interested in ${interests.join(', ')} and have a ${budget} budget. 
            Format the itinerary by day, with morning, afternoon, and evening activities for each day. 
            Include estimated costs where possible.`
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      throw new Error('Failed to generate itinerary');
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error generating itinerary:', error);
    toast.error("Failed to generate your itinerary. Please try again.");
    throw error;
  }
}

/**
 * Chat with the AI assistant
 */
export async function chatWithAssistant(userMessage: string) {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are a helpful travel assistant. 
            Provide concise, helpful information about travel destinations, tips, local customs, and recommendations.
            If asked about booking or payment features, explain that these features are coming soon.
            Keep responses friendly, informative, and under 150 words when possible.`
          },
          {
            role: 'user',
            content: userMessage
          }
        ],
        temperature: 0.7,
        max_tokens: 300
      })
    });

    if (!response.ok) {
      throw new Error('Failed to get response');
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error chatting with assistant:', error);
    return "I'm having trouble connecting right now. Please try again in a moment.";
  }
}

/**
 * Get destination recommendations based on user preferences
 */
export async function getDestinationRecommendations(preferences: {
  climate?: string;
  activities?: string[];
  budget?: string;
  travelStyle?: string;
}) {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful travel recommendation system. Provide destination suggestions based on user preferences.'
          },
          {
            role: 'user',
            content: `Recommend 5 travel destinations based on these preferences:
            ${preferences.climate ? `Climate/Season: ${preferences.climate}` : ''}
            ${preferences.activities?.length ? `Activities: ${preferences.activities.join(', ')}` : ''}
            ${preferences.budget ? `Budget: ${preferences.budget}` : ''}
            ${preferences.travelStyle ? `Travel Style: ${preferences.travelStyle}` : ''}
            
            For each destination, include a brief description and 1-2 must-see attractions.`
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      throw new Error('Failed to get recommendations');
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error getting recommendations:', error);
    toast.error("Failed to get destination recommendations. Please try again.");
    throw error;
  }
}
