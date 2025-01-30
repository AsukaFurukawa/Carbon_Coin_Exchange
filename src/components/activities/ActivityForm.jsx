import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  Heading,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { activities } from '../../lib/api.jsx';
import { ActivityType, MeasurementUnit } from '../../types/activity';
import { ActivityUpload } from './ActivityUpload';

export const ActivityForm = () => {
  const [activityType, setActivityType] = useState(ActivityType.WALKING);
  const [measurement, setMeasurement] = useState('');
  const [unit, setUnit] = useState(MeasurementUnit.STEPS);
  const toast = useToast();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: activities.submit,
    onSuccess: (response) => {
      queryClient.invalidateQueries(['activities']);
      queryClient.invalidateQueries(['activityStats']);
      toast({
        title: 'Activity submitted successfully',
        description: `Earned ${response.pointsEarned} points and ${response.rewards.coins} CC!`,
        status: 'success',
        duration: 3000,
      });
      response.rewards.bonuses?.forEach((bonus) => {
        toast({
          title: 'Bonus Reward!',
          description: `${bonus.message} +${bonus.amount} CC`,
          status: 'success',
          duration: 3000,
          position: 'bottom-right'
        });
      });
      setMeasurement('');
    },
    onError: (error) => {
      console.error('Submit error:', error);
      toast({
        title: 'Failed to submit activity',
        description: error.message || 'Please try again',
        status: 'error',
        duration: 3000,
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!measurement || Number(measurement) <= 0) {
      toast({
        title: 'Invalid measurement',
        description: 'Please enter a valid number greater than 0',
        status: 'error',
        duration: 3000,
      });
      return;
    }
    mutate({
      activityType,
      measurement: Number(measurement),
      unit,
    });
  };

  const getValidUnits = (type) => {
    switch (type) {
      case ActivityType.WALKING:
        return [MeasurementUnit.STEPS, MeasurementUnit.KILOMETERS];
      case ActivityType.CYCLING:
      case ActivityType.PUBLIC_TRANSPORT:
        return [MeasurementUnit.KILOMETERS];
      case ActivityType.ENERGY_SAVING:
        return [MeasurementUnit.KWH];
      case ActivityType.RECYCLING:
        return [MeasurementUnit.KILOGRAMS];
      default:
        return [];
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={8}>
      <VStack spacing={8} align="stretch">
        <Heading size="md">Submit Activity</Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Activity Type</FormLabel>
              <Select
                value={activityType}
                onChange={(e) => {
                  const newType = e.target.value;
                  setActivityType(newType);
                  setUnit(getValidUnits(newType)[0]);
                }}
              >
                {Object.values(ActivityType).map((type) => (
                  <option key={type} value={type}>
                    {type.replace('_', ' ')}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Measurement</FormLabel>
              <Input
                type="number"
                value={measurement}
                onChange={(e) => setMeasurement(e.target.value)}
                min="0"
                required
              />
            </FormControl>

            <FormControl>
              <FormLabel>Unit</FormLabel>
              <Select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              >
                {getValidUnits(activityType).map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </Select>
            </FormControl>

            <Button
              type="submit"
              colorScheme="brand"
              width="full"
              isLoading={isLoading}
            >
              Submit Activity
            </Button>
          </VStack>
        </form>

        {(activityType === ActivityType.PUBLIC_TRANSPORT ||
          activityType === ActivityType.RECYCLING) && (
          <Box mt={4}>
            <ActivityUpload activityType={activityType} />
          </Box>
        )}
      </VStack>
    </Box>
  );
}; 