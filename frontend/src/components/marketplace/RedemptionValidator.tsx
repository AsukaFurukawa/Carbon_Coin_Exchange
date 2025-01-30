import { useState } from 'react';
import {
    Box,
    VStack,
    Input,
    Button,
    Text,
    useToast,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react';
import { rewards } from '../../lib/api';

export const RedemptionValidator = () => {
    const [code, setCode] = useState('');
    const [isValidating, setIsValidating] = useState(false);
    const [validationResult, setValidationResult] = useState<any>(null);
    const toast = useToast();

    const handleValidate = async () => {
        if (!code) return;

        setIsValidating(true);
        try {
            const result = await rewards.validateRedemption(code);
            setValidationResult(result);
            if (result.isValid) {
                toast({
                    title: 'Redemption validated successfully',
                    status: 'success',
                    duration: 3000,
                });
            }
        } catch (error) {
            toast({
                title: 'Validation failed',
                description: 'Invalid or expired redemption code',
                status: 'error',
                duration: 3000,
            });
        } finally {
            setIsValidating(false);
        }
    };

    return (
        <Box p={6} shadow="md" borderWidth="1px" borderRadius="lg">
            <VStack spacing={4}>
                <Input
                    placeholder="Enter redemption code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                />
                <Button
                    colorScheme="green"
                    onClick={handleValidate}
                    isLoading={isValidating}
                    width="full"
                >
                    Validate Code
                </Button>

                {validationResult && (
                    <Alert
                        status={validationResult.isValid ? 'success' : 'error'}
                        borderRadius="md"
                    >
                        <AlertIcon />
                        <Box>
                            <AlertTitle>
                                {validationResult.isValid
                                    ? 'Valid Redemption'
                                    : 'Invalid Redemption'}
                            </AlertTitle>
                            <AlertDescription>
                                {validationResult.isValid ? (
                                    <>
                                        <Text>Reward: {validationResult.reward.title}</Text>
                                        <Text>
                                            Discount: {validationResult.reward.discountPercent}%
                                        </Text>
                                    </>
                                ) : (
                                    'This code is invalid or has already been used'
                                )}
                            </AlertDescription>
                        </Box>
                    </Alert>
                )}
            </VStack>
        </Box>
    );
}; 