import {
    VStack,
    FormControl,
    FormLabel,
    Input,
    Button,
    FormErrorMessage,
    useToast,
    Heading,
    Divider,
} from '@chakra-ui/react';
import { useForm } from '../../hooks/useForm';
import { profileUpdateSchema, ProfileUpdateInput } from '../../validations/profile';
import { useAuthStore } from '../../stores/authStore';
import { api } from '../../lib/api';

export const ProfileForm = () => {
    const { user, updateUser } = useAuthStore();
    const toast = useToast();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ProfileUpdateInput>({
        schema: profileUpdateSchema,
        defaultValues: {
            name: user?.name,
            email: user?.email,
        },
    });

    const onSubmit = async (data: ProfileUpdateInput) => {
        try {
            const response = await api.patch('/users/profile', data);
            updateUser(response.data);
            toast({
                title: 'Profile updated successfully',
                status: 'success',
                duration: 3000,
            });
        } catch (error) {
            toast({
                title: 'Update failed',
                description: error instanceof Error ? error.message : 'Please try again',
                status: 'error',
                duration: 3000,
            });
        }
    };

    return (
        <VStack spacing={6} align="stretch" w="100%" maxW="500px">
            <Heading size="md">Profile Information</Heading>
            
            <form onSubmit={handleSubmit(onSubmit)}>
                <VStack spacing={4}>
                    <FormControl isInvalid={!!errors.name}>
                        <FormLabel>Name</FormLabel>
                        <Input {...register('name')} />
                        <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={!!errors.email}>
                        <FormLabel>Email</FormLabel>
                        <Input {...register('email')} type="email" />
                        <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                    </FormControl>

                    <Divider />
                    <Heading size="sm">Change Password</Heading>

                    <FormControl isInvalid={!!errors.currentPassword}>
                        <FormLabel>Current Password</FormLabel>
                        <Input {...register('currentPassword')} type="password" />
                        <FormErrorMessage>{errors.currentPassword?.message}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={!!errors.newPassword}>
                        <FormLabel>New Password</FormLabel>
                        <Input {...register('newPassword')} type="password" />
                        <FormErrorMessage>{errors.newPassword?.message}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={!!errors.confirmNewPassword}>
                        <FormLabel>Confirm New Password</FormLabel>
                        <Input {...register('confirmNewPassword')} type="password" />
                        <FormErrorMessage>{errors.confirmNewPassword?.message}</FormErrorMessage>
                    </FormControl>

                    <Button
                        type="submit"
                        colorScheme="green"
                        isLoading={isSubmitting}
                        w="100%"
                    >
                        Save Changes
                    </Button>
                </VStack>
            </form>
        </VStack>
    );
}; 