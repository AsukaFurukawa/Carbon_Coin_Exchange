import {
  Box,
  Flex,
  HStack,
  Button,
  useColorModeValue,
  Text,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { ColorModeToggle } from '../common/ColorModeToggle';
import { useHeaderStore } from '../../stores/headerStore';

export const Navbar = () => {
  const { user, logout } = useAuthStore();
  const bgColor = useColorModeValue('white', 'gray.800');
  const coins = useHeaderStore((state) => state.coins);

  return (
    <Box bg={bgColor} px={4} shadow="sm">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <RouterLink to="/">
          <Text fontSize="xl" fontWeight="bold">CarbonCoin</Text>
        </RouterLink>

        <HStack spacing={4}>
          <ColorModeToggle />
          {user ? (
            <>
              <Button as={RouterLink} to="/activities" variant="ghost">
                Activities
              </Button>
              <Text>{coins} CC</Text>
              <Button onClick={logout}>Logout</Button>
            </>
          ) : (
            <>
              <Button as={RouterLink} to="/login" variant="ghost">
                Login
              </Button>
              <Button as={RouterLink} to="/register" colorScheme="brand">
                Register
              </Button>
            </>
          )}
        </HStack>
      </Flex>
    </Box>
  );
}; 