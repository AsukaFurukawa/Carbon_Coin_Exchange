export const ACTIVITY_LEVELS = {
  BEGINNER: {
    name: 'Beginner',
    minPoints: 0,
    maxPoints: 100,
    color: 'green.400',
    rewards: {
      coinsPerActivity: 5,
      levelUpBonus: 50,
    },
  },
  EXPLORER: {
    name: 'Explorer',
    minPoints: 101,
    maxPoints: 300,
    color: 'blue.400',
    rewards: {
      coinsPerActivity: 10,
      levelUpBonus: 100,
    },
  },
  CHAMPION: {
    name: 'Champion',
    minPoints: 301,
    maxPoints: 600,
    color: 'purple.400',
    rewards: {
      coinsPerActivity: 15,
      levelUpBonus: 200,
    },
  },
  MASTER: {
    name: 'Master',
    minPoints: 601,
    maxPoints: 1000,
    color: 'orange.400',
    rewards: {
      coinsPerActivity: 20,
      levelUpBonus: 300,
    },
  },
  LEGEND: {
    name: 'Legend',
    minPoints: 1001,
    maxPoints: Infinity,
    color: 'red.400',
    rewards: {
      coinsPerActivity: 25,
      levelUpBonus: 500,
    },
  },
};

export const calculateActivityPoints = (activity) => {
  const basePoints = {
    WALKING: 1, // per 1000 steps
    CYCLING: 5, // per km
    PUBLIC_TRANSPORT: 3, // per km
    RECYCLING: 10, // per kg
    ENERGY_SAVING: 2, // per kWh
  };

  const points = basePoints[activity.activityType];
  let measurement = activity.measurement;

  // Convert steps to thousands
  if (activity.activityType === 'WALKING' && activity.unit === 'STEPS') {
    measurement = measurement / 1000;
  }

  return Math.floor(points * measurement);
};

export const getCurrentLevel = (totalPoints) => {
  return Object.entries(ACTIVITY_LEVELS).find(
    ([_, level]) => totalPoints >= level.minPoints && totalPoints <= level.maxPoints
  )[0];
};

export const getProgressToNextLevel = (totalPoints) => {
  const currentLevelKey = getCurrentLevel(totalPoints);
  const currentLevel = ACTIVITY_LEVELS[currentLevelKey];
  const progress = totalPoints - currentLevel.minPoints;
  const total = currentLevel.maxPoints - currentLevel.minPoints;
  return (progress / total) * 100;
}; 