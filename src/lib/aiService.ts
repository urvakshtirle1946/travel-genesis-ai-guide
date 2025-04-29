
import { toast } from 'sonner';

// Helper function to handle API errors
const handleApiError = (error: any, message: string) => {
  console.error(`Error: ${message}`, error);
  toast.error(`Sorry, we encountered an issue. Please try again.`);
  return `I'm having trouble connecting right now. Please try again in a moment.`;
};

/**
 * Generates destination ideas based on user query
 */
export async function generateDestinationIdeas(query: string) {
  try {
    console.log("Starting destination ideas generation for:", query);
    
    // For now, let's just return a simulated response to avoid API key issues
    // In a real implementation, this would call an AI service API
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate ideas based on the query
    let ideas = "";
    
    if (query.toLowerCase().includes('beach')) {
      ideas = `Here are some amazing beach destinations for your consideration:

1. **Maldives** - Crystal clear waters, overwater bungalows, and pristine white sand beaches make this the ultimate luxury beach escape.

2. **Bali, Indonesia** - Famous for its stunning beaches, vibrant culture, and spiritual atmosphere. Kuta, Seminyak, and Nusa Dua offer different beach experiences.

3. **Tulum, Mexico** - Beautiful Caribbean beaches with a bohemian vibe, ancient ruins, and cenotes nearby for swimming.

4. **Santorini, Greece** - Black and red volcanic beaches alongside the stunning white architecture and blue domes that Greece is famous for.

5. **Seychelles** - Remote paradise with some of the world's most photogenic beaches, giant tortoises, and incredible marine life.`;
    } 
    else if (query.toLowerCase().includes('mountain')) {
      ideas = `Here are some spectacular mountain destinations to consider:

1. **Swiss Alps, Switzerland** - Picture-perfect alpine scenery with charming villages, excellent hiking in summer and world-class skiing in winter.

2. **Banff National Park, Canada** - Stunning Rocky Mountain landscapes with turquoise lakes, abundant wildlife, and excellent outdoor activities year-round.

3. **Patagonia (Argentina/Chile)** - Dramatic mountain peaks, massive glaciers, and incredible trekking opportunities in Torres del Paine and Los Glaciares National Parks.

4. **Himalayan Range, Nepal** - Home to the world's highest peaks including Everest, with spectacular trekking routes through traditional villages and breathtaking scenery.

5. **Rocky Mountains, Colorado, USA** - Beautiful mountain towns like Aspen and Telluride offer outdoor adventures from skiing to hiking among spectacular scenery.`;
    }
    else if (query.toLowerCase().includes('culture') || query.toLowerCase().includes('history')) {
      ideas = `Here are some enriching cultural destinations to explore:

1. **Kyoto, Japan** - Ancient temples, traditional gardens, geisha districts, and centuries of cultural heritage make this a window into Japan's past.

2. **Rome, Italy** - Walk through millennia of history from ancient Roman ruins to Renaissance masterpieces and Vatican treasures.

3. **Marrakech, Morocco** - Immerse yourself in the sensory experience of bustling souks, historic medinas, and ornate palaces showcasing Islamic architecture.

4. **Varanasi, India** - One of the world's oldest continuously inhabited cities, offering deep spiritual experiences along the sacred Ganges River.

5. **Cusco, Peru** - Ancient Incan capital with impressive stone architecture, nearby Machu Picchu, and living indigenous cultures.`;
    }
    else {
      ideas = `Here are 5 amazing destinations that might interest you:

1. **Tokyo, Japan** - A fascinating blend of ultramodern and traditional, offering cutting-edge technology alongside historic temples, excellent food, and vibrant city life.

2. **Barcelona, Spain** - Famous for stunning Gaudí architecture, beautiful beaches, delicious cuisine, and a vibrant cultural scene.

3. **New Zealand** - Breathtaking diverse landscapes from mountains to beaches, offering outdoor adventures like hiking, skiing, and water sports.

4. **Cape Town, South Africa** - Dramatic mountain backdrops, beautiful coastal areas, wildlife experiences, and rich cultural diversity.

5. **Iceland** - Otherworldly landscapes featuring volcanoes, geysers, hot springs, lava fields, and opportunities to see the Northern Lights.`;
    }
    
    console.log("Generated ideas:", ideas.substring(0, 100) + "...");
    return ideas;
  } catch (error) {
    return handleApiError(error, 'Error generating destinations');
  }
}

/**
 * Generates a travel itinerary based on destination and preferences
 */
export async function generateItinerary(destination: string, startDate: string, endDate: string, interests: string[], budget: string) {
  try {
    // In a real implementation, this would make an API call to an AI service

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Return a mock response based on the destination
    let mockResponse = `## ${destination} Itinerary (${startDate} to ${endDate})
    
### Day 1
- Morning: Arrival and hotel check-in
- Afternoon: Orientation walk around the main areas
- Evening: Welcome dinner at a local restaurant

### Day 2
- Morning: Visit to the main attractions
- Afternoon: Cultural experience
- Evening: Free time to explore local cuisine

### Day 3
- Full day excursion to nearby natural attractions
- Evening: Entertainment options

This itinerary is designed for a ${budget} budget and includes your interests in ${interests.join(', ')}.`;
    
    return mockResponse;
  } catch (error) {
    return handleApiError(error, 'Error generating itinerary');
  }
}

/**
 * Chat with the AI assistant
 */
export async function chatWithAssistant(userMessage: string) {
  try {
    console.log("Sending message to AI assistant:", userMessage);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate a simple response based on keywords in the message
    let response = "";
    
    if (userMessage.toLowerCase().includes('hotel') || userMessage.toLowerCase().includes('accommodation')) {
      response = "I can help you find accommodations! When choosing a hotel, consider location, price, amenities, and reviews. Popular booking platforms include Booking.com, Airbnb, and Hotels.com. Would you like recommendations for a specific destination?";
    } 
    else if (userMessage.toLowerCase().includes('flight') || userMessage.toLowerCase().includes('fly')) {
      response = "For the best flight deals, I recommend booking 2-3 months in advance and using comparison sites like Skyscanner, Google Flights, or Kayak. Being flexible with your dates and considering nearby airports can also help you save money.";
    }
    else if (userMessage.toLowerCase().includes('food') || userMessage.toLowerCase().includes('eat') || userMessage.toLowerCase().includes('restaurant')) {
      response = "Trying local cuisine is one of the best parts of traveling! To find authentic food experiences, look for restaurants filled with locals, visit markets, or consider taking a food tour early in your trip to learn about local specialties.";
    }
    else if (userMessage.toLowerCase().includes('budget') || userMessage.toLowerCase().includes('money') || userMessage.toLowerCase().includes('cost')) {
      response = "Creating a travel budget is smart! Consider costs for transportation, accommodation, food (about $30-$100/day depending on destination), activities, and souvenirs. Always add a buffer of 10-15% for unexpected expenses.";
    }
    else {
      response = "I'm your travel assistant! I can help with destination recommendations, travel planning, accommodations, transportation options, and local attractions. Feel free to ask me anything about your upcoming or dream trips!";
    }
    
    console.log("Assistant response:", response);
    return response;
  } catch (error) {
    return handleApiError(error, 'Error chatting with assistant');
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
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const recommendations = `Based on your preferences (${preferences.climate || 'any climate'}, ${preferences.budget || 'any budget'}, ${preferences.travelStyle || 'any style'}), here are some destinations you might enjoy:

1. **Costa Rica** - Perfect for eco-adventures with rainforests, beaches, and wildlife.
   *Must-see: Manuel Antonio National Park, Arenal Volcano*

2. **Portugal** - Offers great value, beautiful coastlines, and rich history.
   *Must-see: Lisbon's historic center, Porto's wine region*

3. **Thailand** - Budget-friendly with diverse experiences from temples to islands.
   *Must-see: Grand Palace in Bangkok, Phi Phi Islands*

4. **New Zealand** - Ideal for outdoor enthusiasts with stunning diverse landscapes.
   *Must-see: Milford Sound, Rotorua geothermal areas*

5. **Japan** - Blend of ultramodern and traditional with excellent public transportation.
   *Must-see: Kyoto's temples, Tokyo's neighborhoods*`;
    
    return recommendations;
  } catch (error) {
    return handleApiError(error, 'Error getting recommendations');
  }
}
