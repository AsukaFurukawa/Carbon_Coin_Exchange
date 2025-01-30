import {
  Container,
  SimpleGrid,
  Heading,
  Input,
  Select,
  HStack,
  VStack,
  Text,
  Spinner,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { rewards } from '../lib/api.jsx';
import { RewardCard } from '../components/rewards/RewardCard';

export const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('COST_ASC');

  const { data: rewardsList, isLoading, error } = useQuery(['rewards'], rewards.getAll);

  if (isLoading) return <Spinner />;
  if (error) return <Text color="red.500">Error loading rewards</Text>;

  const filteredAndSortedRewards = rewardsList
    ?.filter(reward => {
      if (categoryFilter !== 'ALL' && reward.category !== categoryFilter) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          reward.name.toLowerCase().includes(query) ||
          reward.description.toLowerCase().includes(query) ||
          reward.merchant.toLowerCase().includes(query)
        );
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'COST_ASC':
          return a.cost - b.cost;
        case 'COST_DESC':
          return b.cost - a.cost;
        case 'STOCK_ASC':
          return a.stock - b.stock;
        case 'STOCK_DESC':
          return b.stock - a.stock;
        default:
          return 0;
      }
    });

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Heading>Rewards Marketplace</Heading>

        <HStack spacing={4}>
          <Input
            placeholder="Search rewards..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <Select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="ALL">All Categories</option>
            <option value="GIFT_CARD">Gift Cards</option>
            <option value="EXPERIENCE">Experiences</option>
            <option value="PRODUCT">Products</option>
            <option value="DONATION">Donations</option>
          </Select>

          <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="COST_ASC">Price: Low to High</option>
            <option value="COST_DESC">Price: High to Low</option>
            <option value="STOCK_ASC">Stock: Low to High</option>
            <option value="STOCK_DESC">Stock: High to Low</option>
          </Select>
        </HStack>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {filteredAndSortedRewards?.map((reward) => (
            <RewardCard key={reward.id} reward={reward} />
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
}; 