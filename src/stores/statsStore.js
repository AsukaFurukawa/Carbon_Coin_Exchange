import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useHeaderStore } from './headerStore';

export const useStatsStore = create(
  persist(
    (set) => ({
      totalActivities: 0,
      totalCoinsEarned: 0,
      totalPoints: 0,
      challengeProgress: {},
      lastResetDate: new Date().toDateString(),
      completedChallenges: [],

      updateStats: (newActivity) => set((state) => {
        // Calculate new coins and points
        const activityCoins = newActivity.rewards.coins;
        const bonusCoins = newActivity.rewards.bonuses?.reduce((sum, bonus) => sum + bonus.amount, 0) || 0;
        
        // Calculate challenge rewards
        let challengeRewards = 0;
        const newCompletedChallenges = [...state.completedChallenges];
        
        if (newActivity.challengeProgress && newActivity.challengeProgress[newActivity.activityType]) {
          const progress = newActivity.challengeProgress[newActivity.activityType];
          if (progress >= 10000 && newActivity.activityType === 'WALKING' && !state.completedChallenges.includes('1')) {
            challengeRewards += 20;
            newCompletedChallenges.push('1');
          }
        }

        const totalNewCoins = activityCoins + bonusCoins + challengeRewards;
        const newTotalCoins = state.totalCoinsEarned + totalNewCoins;

        // Update header coins
        useHeaderStore.getState().updateCoins(newTotalCoins);

        return {
          totalActivities: state.totalActivities + 1,
          totalCoinsEarned: newTotalCoins,
          totalPoints: state.totalPoints + newActivity.pointsEarned,
          challengeProgress: {
            ...state.challengeProgress,
            [newActivity.activityType]: (state.challengeProgress[newActivity.activityType] || 0) + 
              newActivity.measurement,
          },
          lastResetDate: state.lastResetDate,
          completedChallenges: newCompletedChallenges,
        };
      }),

      initializeStore: () => set((state) => {
        const today = new Date().toDateString();
        // Sync header coins on initialization
        useHeaderStore.getState().updateCoins(state.totalCoinsEarned);
        
        if (state.lastResetDate !== today) {
          return {
            ...state,
            challengeProgress: {},
            completedChallenges: [],
            lastResetDate: today,
          };
        }
        return state;
      }),

      resetDailyChallenges: () => set({
        challengeProgress: {},
        completedChallenges: [],
        lastResetDate: new Date().toDateString(),
      }),
    }),
    {
      name: 'carbon-stats',
    }
  )
); 