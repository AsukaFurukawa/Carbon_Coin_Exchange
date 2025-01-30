import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../../tests/test-utils';
import { IntegrationCard } from './IntegrationCard';
import { mockIntegrations } from '../../tests/mocks/data';

describe('IntegrationCard', () => {
    const integration = mockIntegrations[0];

    it('renders integration details', () => {
        render(<IntegrationCard integration={integration} />);

        expect(screen.getByText(integration.provider)).toBeInTheDocument();
        expect(screen.getByText(/last synced/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /sync/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /disconnect/i })).toBeInTheDocument();
    });

    it('handles sync action', async () => {
        render(<IntegrationCard integration={integration} />);

        await userEvent.click(screen.getByRole('button', { name: /sync/i }));

        await waitFor(() => {
            expect(screen.getByText(/data synced successfully/i)).toBeInTheDocument();
        });
    });

    it('handles disconnect action', async () => {
        render(<IntegrationCard integration={integration} />);

        await userEvent.click(screen.getByRole('button', { name: /disconnect/i }));

        await waitFor(() => {
            expect(screen.getByText(/integration disconnected/i)).toBeInTheDocument();
        });
    });

    it('disables buttons when integration is not connected', () => {
        const disconnectedIntegration = {
            ...integration,
            isConnected: false,
        };

        render(<IntegrationCard integration={disconnectedIntegration} />);

        expect(screen.getByRole('button', { name: /sync/i })).toBeDisabled();
        expect(screen.getByRole('button', { name: /disconnect/i })).toBeDisabled();
    });
}); 