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
  FormErrorMessage,
} from '@chakra-ui/react';
import { useState } from 'react';
import { activities } from '../../lib/api';
import { ActivityType, MeasurementUnit } from '../../types/activity';

export const ActivityForm = () => {
  const [activityType, setActivityType] = useState(ActivityType.WALKING);
  const [measurement, setMeasurement] = useState('');
  const [unit, setUnit] = useState(MeasurementUnit.STEPS);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await activities.submit({
        activityType,
        measurement: Number(measurement),
        unit,
      });
      
      toast({
        title: 'Activity submitted successfully',
        status: 'success',
        duration: 3000,
      });
      
      // Reset form
      setMeasurement('');
    } catch (err) {
      setError('Failed to submit activity');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getValidUnits = (type: ActivityType) => {
    switch (type) {
      case ActivityType.WALKING:
        return [MeasurementUnit.STEPS, MeasurementUnit.KILOMETERS];
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
        <Heading textAlign="center">Submit Activity</Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Activity Type</FormLabel>
              <Select
                value={activityType}
                onChange={(e) => {
                  const newType = e.target.value as ActivityType;
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

            <FormControl isInvalid={!!error}>
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
                onChange={(e) => setUnit(e.target.value as MeasurementUnit)}
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
              isLoading={isSubmitting}
            >
              Submit Activity
            </Button>
          </VStack>
        </form>
      </VStack>
    </Box>
  );
}; 