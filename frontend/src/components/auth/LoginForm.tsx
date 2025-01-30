import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    VStack,
    FormErrorMessage,
    useToast,
} from '@chakra-ui/react';
import { useAuthStore } from '../../stores/authStore';
import { useForm } from '../../hooks/useForm';
import { loginSchema, LoginInput } from '../../validations/auth';

export const LoginForm = () => {
    const { login, isLoading } = useAuthStore();
    const toast = useToast();
    
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginInput>({
        schema: loginSchema,
    });

    const onSubmit = async (data: LoginInput) => {
        try {
            await login(data.email, data.password);
            toast({
                title: 'Login successful',
                status: 'success',
                duration: 3000,
            });
        } catch (error) {
            toast({
                title: 'Login failed',
                description: error instanceof Error ? error.message : 'Please try again',
                status: 'error',
                duration: 3000,
            });
        }
    };

    return (
        <Box as="form" onSubmit={handleSubmit(onSubmit)} w="100%" maxW="400px">
            <VStack spacing={4}>
                <FormControl isInvalid={!!errors.email}>
                    <FormLabel>Email</FormLabel>
                    <Input
                        type="email"
                        {...register('email')}
                    />
                    <FormErrorMessage>
                        {errors.email?.message}
                    </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.password}>
                    <FormLabel>Password</FormLabel>
                    <Input
                        type="password"
                        {...register('password')}
                    />
                    <FormErrorMessage>
                        {errors.password?.message}
                    </FormErrorMessage>
                </FormControl>

                <Button
                    type="submit"
                    colorScheme="green"
                    isLoading={isLoading}
                    w="100%"
                >
                    Login
                </Button>
            </VStack>
        </Box>
    );
}; 