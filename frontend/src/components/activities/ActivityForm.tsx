import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Select,
    VStack,
    FormErrorMessage,
    useToast,
} from '@chakra-ui/react';
import { activities } from '../../lib/api';
import { ActivityType, MeasurementUnit } from '../../types/activity';
import { useForm } from '../../hooks/useForm';
import { activitySchema, ActivityInput } from '../../validations/activity';

export const ActivityForm = () => {
    const toast = useToast();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
        watch,
    } = useForm<ActivityInput>({
        schema: activitySchema,
        defaultValues: {
            activityType: ActivityType.WALKING,
            unit: MeasurementUnit.STEPS,
        },
    });

    const activityType = watch('activityType');

    const onSubmit = async (data: ActivityInput) => {
        try {
            await activities.submit(data);
            toast({
                title: 'Activity submitted successfully',
                status: 'success',
                duration: 3000,
            });
            reset();
        } catch (error) {
            toast({
                title: 'Submission failed',
                description: error instanceof Error ? error.message : 'Please try again',
                status: 'error',
                duration: 3000,
            });
        }
    };

    const getValidUnits = (type: ActivityType) => {
        switch (type) {
            case ActivityType.WALKING:
                return [MeasurementUnit.STEPS];
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
        <Box
            as="form"
            onSubmit={handleSubmit(onSubmit)}
            w="100%"
            maxW={{ base: "100%", md: "400px" }}
            p={{ base: 4, md: 6 }}
            borderWidth={{ base: 0, md: "1px" }}
            borderRadius="lg"
            shadow={{ base: "none", md: "sm" }}
        >
            <VStack spacing={{ base: 4, md: 6 }}>
                <FormControl isInvalid={!!errors.activityType}>
                    <FormLabel>Activity Type</FormLabel>
                    <Select {...register('activityType')}>
                        {Object.values(ActivityType).map((type) => (
                            <option key={type} value={type}>
                                {type.replace('_', ' ')}
                            </option>
                        ))}
                    </Select>
                    <FormErrorMessage>
                        {errors.activityType?.message}
                    </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.measurement}>
                    <FormLabel>Measurement</FormLabel>
                    <Input
                        type="number"
                        step="0.01"
                        {...register('measurement', { valueAsNumber: true })}
                    />
                    <FormErrorMessage>
                        {errors.measurement?.message}
                    </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.unit}>
                    <FormLabel>Unit</FormLabel>
                    <Select {...register('unit')}>
                        {getValidUnits(activityType as ActivityType).map((unit) => (
                            <option key={unit} value={unit}>
                                {unit}
                            </option>
                        ))}
                    </Select>
                    <FormErrorMessage>
                        {errors.unit?.message}
                    </FormErrorMessage>
                </FormControl>

                <Button
                    type="submit"
                    colorScheme="green"
                    isLoading={isSubmitting}
                    w="100%"
                >
                    Submit Activity
                </Button>
            </VStack>
        </Box>
    );
}; 