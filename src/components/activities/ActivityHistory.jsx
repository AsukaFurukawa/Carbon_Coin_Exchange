import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Spinner,
  Text,
  Select,
  HStack,
  Input,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { activities } from '../../lib/api';
import { ActivityType, VerificationStatus } from '../../types/activity';

const StatusBadge = ({ status }) => {
  const colorScheme = {
    [VerificationStatus.PENDING]: 'yellow',
    [VerificationStatus.APPROVED]: 'green',
    [VerificationStatus.REJECTED]: 'red',
  }[status];

  return <Badge colorScheme={colorScheme}>{status}</Badge>;
};

export const ActivityHistory = () => {
  const [activityFilter, setActivityFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const { data: activityList, isLoading, error } = useQuery(
    ['activities'],
    activities.getAll
  );

  if (isLoading) return <Spinner />;
  if (error) return <Text color="red.500">Error loading activities</Text>;

  const filteredActivities = activityList?.filter(activity => {
    if (activityFilter !== 'ALL' && activity.activityType !== activityFilter) return false;
    if (statusFilter !== 'ALL' && activity.verificationStatus !== statusFilter) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        activity.activityType.toLowerCase().includes(query) ||
        activity.unit.toLowerCase().includes(query)
      );
    }
    return true;
  });

  return (
    <VStack spacing={4} align="stretch">
      <HStack spacing={4}>
        <Select
          value={activityFilter}
          onChange={(e) => setActivityFilter(e.target.value)}
          placeholder="Filter by activity"
        >
          <option value="ALL">All Activities</option>
          {Object.values(ActivityType).map((type) => (
            <option key={type} value={type}>
              {type.replace('_', ' ')}
            </option>
          ))}
        </Select>

        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          placeholder="Filter by status"
        >
          <option value="ALL">All Statuses</option>
          {Object.values(VerificationStatus).map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </Select>

        <Input
          placeholder="Search activities..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </HStack>

      <Box overflowX="auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th>Activity Type</Th>
              <Th>Measurement</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredActivities?.map((activity) => (
              <Tr key={activity.id}>
                <Td>{format(new Date(activity.timestamp), 'PPp')}</Td>
                <Td>{activity.activityType.replace('_', ' ')}</Td>
                <Td>
                  {activity.measurement} {activity.unit}
                </Td>
                <Td>
                  <StatusBadge status={activity.verificationStatus} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </VStack>
  );
}; 