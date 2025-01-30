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
import { activities } from '../../lib/api';
import { ActivityType, MeasurementUnit } from '../../types/activity';

export const ActivityForm = () => {
  const [activityType, setActivityType] = useState(ActivityType.WALKING);
  const [measurement, setMeasurement] = useState('');
  const [unit, setUnit] = useState(MeasurementUnit.STEPS);
  const toast = useToast();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: activities.submit,
    onSuccess: () => {
      queryClient.invalidateQueries(['activities']);
      toast({
        title: 'Activity submitted successfully',
        status: 'success',
        duration: 3000,
      });
      setMeasurement('');
    },
    onError: () => {
      toast({
        title: 'Failed to submit activity',
        status: 'error',
        duration: 3000,
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
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
      </VStack>
    </Box>
  );
}; 