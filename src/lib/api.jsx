import axios from 'axios';
import { calculateActivityPoints } from '../utils/activityLevels';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
});

export const activities = {
  submit: async (data) => {
    // TODO: Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const points = calculateActivityPoints(data);
        const mockResponse = {
          id: Math.random().toString(36).substr(2, 9),
          ...data,
          timestamp: new Date().toISOString(),
          verificationStatus: 'PENDING',
          pointsEarned: points,
          rewards: {
            coins: 10,
            bonuses: [
              { type: 'STREAK', amount: 5, message: '3-day streak bonus!' },
              { type: 'LEVEL_UP', amount: 50, message: 'Level up reward!' },
            ],
          },
        };
        resolve(mockResponse);
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
          totalPoints: 250, // This will determine the user's level
          verificationStats: {
            pending: 3,
            approved: 7,
            rejected: 0,
          },
          streaks: {
            current: 3,
            longest: 5,
          },
          achievements: [
            {
              id: 'first-activity',
              name: 'First Step',
              description: 'Submit your first activity',
              earned: true,
              date: '2024-01-30',
            },
            {
              id: 'three-day-streak',
              name: 'Consistency',
              description: 'Maintain a 3-day activity streak',
              earned: true,
              date: '2024-01-30',
            },
          ],
        });
      }, 1000);
    });
  },

  uploadProof: async (formData) => {
    // TODO: Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Proof uploaded successfully',
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

export const challenges = {
  getDaily: async () => {
    // TODO: Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: '1',
            name: 'Walking Warrior',
            description: 'Walk 10,000 steps today',
            type: 'DAILY',
            reward: 20,
            progress: {
              current: 8500,
              required: 10000,
            },
            unit: 'steps',
            completed: false,
          },
          {
            id: '2',
            name: 'Eco Commuter',
            description: 'Use public transport for your commute',
            type: 'DAILY',
            reward: 30,
            progress: {
              current: 1,
              required: 1,
            },
            unit: 'trips',
            completed: true,
          },
          {
            id: '3',
            name: 'Recycling Hero',
            description: 'Recycle 2kg of materials',
            type: 'DAILY',
            reward: 25,
            progress: {
              current: 1.5,
              required: 2,
            },
            unit: 'kg',
            completed: false,
          },
        ]);
      }, 1000);
    });
  },
}; 