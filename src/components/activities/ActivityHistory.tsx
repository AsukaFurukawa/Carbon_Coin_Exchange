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
  useColorModeValue,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { activities } from '../../lib/api';
import { format } from 'date-fns';
import { VerificationStatus } from '../../types/activity';

const StatusBadge = ({ status }: { status: VerificationStatus }) => {
  const colorScheme = {
    [VerificationStatus.PENDING]: 'yellow',
    [VerificationStatus.APPROVED]: 'green',
    [VerificationStatus.REJECTED]: 'red',
  }[status];

  return <Badge colorScheme={colorScheme}>{status}</Badge>;
};

export const ActivityHistory = () => {
  const { data: activityList, isLoading, error } = useQuery(
    ['activities'],
    activities.getAll
  );

  const bgColor = useColorModeValue('white', 'gray.800');

  if (isLoading) return <Spinner />;
  if (error) return <Text color="red.500">Error loading activities</Text>;

  return (
    <Box overflowX="auto" bg={bgColor} rounded="lg" shadow="sm">
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
          {activityList?.map((activity) => (
            <Tr key={activity.id}>
              <Td>
                {format(new Date(activity.timestamp), 'PPp')}
              </Td>
              <Td>{activity.activityType}</Td>
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
  );
}; 