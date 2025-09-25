// Photo stories data structure
// This file will contain all the stories mapped to photo IDs
// Each photo can have a custom story, or it will use a default one

export const photoStories = {
  // Custom stories for specific photos
  1: {
    title: "Our First Meeting",
    story: "The moment I first saw you, everything changed. Your smile lit up the entire room, and I knew right then that you were someone special. That day marked the beginning of our beautiful journey together.",
    date: "January 15, 2023",
    mood: "Nervous but excited"
  },
  2: {
    title: "Our First Date",
    story: "Remember that cozy café where we spent hours talking? We lost track of time because every word you said was like music to my ears. That's when I realized I was falling for you.",
    date: "February 3, 2023",
    mood: "Butterflies in my stomach"
  },
  3: {
    title: "The Adventure Day",
    story: "That hiking trip where we got lost but found ourselves instead. You made even getting lost feel like an adventure. Your laughter echoing through the mountains is still my favorite sound.",
    date: "March 20, 2023",
    mood: "Adventurous and carefree"
  },
  4: {
    title: "The Rainy Day",
    story: "When we got caught in the rain and danced in the puddles like kids. You turned what could have been a disaster into one of the most magical moments of my life. That's when I knew you were my person.",
    date: "April 8, 2023",
    mood: "Playful and romantic"
  },
  
  // Default story template for photos without custom stories
  default: {
    title: "A Beautiful Memory",
    story: "This photo captures one of the countless moments that make me smile. Every memory with you is precious, and this one holds a special place in my heart. Thank you for all the beautiful moments.",
    date: "A special day",
    mood: "Grateful and happy"
  }
}

// Helper function to get story for a photo
export const getPhotoStory = (photoId) => {
  return photoStories[photoId] || photoStories.default
}

// Helper function to get all available stories
export const getAllStories = () => {
  return photoStories
}
