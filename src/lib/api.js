import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
});

export const activities = {
  submit: async (data) => {
    // TODO: Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: Math.random().toString(36).substr(2, 9),
          ...data,
          timestamp: new Date().toISOString(),
          verificationStatus: 'PENDING',
        });
      }, 1000);
    });
  },

  getAll: async () => {
    // TODO: Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const activities = [];
        const types = ['WALKING', 'CYCLING', 'PUBLIC_TRANSPORT', 'RECYCLING', 'ENERGY_SAVING'];
        const statuses = ['PENDING', 'APPROVED', 'APPROVED', 'APPROVED']; // 75% approval rate
        
        // Generate last 30 days of activities
        for (let i = 0; i < 30; i++) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          
          // 1-3 activities per day
          const dailyActivities = Math.floor(Math.random() * 3) + 1;
          
          for (let j = 0; j < dailyActivities; j++) {
            activities.push({
              id: `${i}-${j}`,
              activityType: types[Math.floor(Math.random() * types.length)],
              measurement: Math.floor(Math.random() * 1000) + 100,
              unit: 'STEPS',
              timestamp: date.toISOString(),
              verificationStatus: statuses[Math.floor(Math.random() * statuses.length)],
            });
          }
        }
        
        resolve(activities);
      }, 1000);
    });
  },

  getStats: async () => {
    // TODO: Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          totalActivities: 10,
          totalCoinsEarned: 150,
          verificationStats: {
            pending: 3,
            approved: 7,
            rejected: 0,
          },
        });
      }, 1000);
    });
  },
};

export const rewards = {
  getAll: async () => {
    // TODO: Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: '1',
            name: '$10 Amazon Gift Card',
            description: 'Get a $10 gift card for Amazon.com',
            category: 'GIFT_CARD',
            merchant: 'Amazon',
            cost: 100,
            stock: 50,
            image: 'https://placehold.co/400x200',
          },
          {
            id: '2',
            name: 'Plant a Tree',
            description: 'We will plant a tree in your name',
            category: 'DONATION',
            merchant: 'Green Earth',
            cost: 50,
            stock: 1000,
            image: 'https://placehold.co/400x200',
          },
          // Add more mock rewards...
        ]);
      }, 1000);
    });
  },

  redeem: async (rewardId) => {
    // TODO: Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 1000);
    });
  },
}; 