import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../../tests/test-utils';
import { ActivityForm } from './ActivityForm';

describe('ActivityForm', () => {
    it('renders all form fields', () => {
        render(<ActivityForm />);

        expect(screen.getByLabelText(/activity type/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/measurement/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/unit/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    });

    it('updates unit options based on activity type', async () => {
        render(<ActivityForm />);
        
        const typeSelect = screen.getByLabelText(/activity type/i);
        const unitSelect = screen.getByLabelText(/unit/i);

        // Check initial state (Walking)
        expect(unitSelect).toHaveValue('STEPS');

        // Change to Energy Saving
        await userEvent.selectOptions(typeSelect, 'ENERGY_SAVING');
        expect(unitSelect).toHaveValue('KWH');
    });

    it('submits form with valid data', async () => {
        render(<ActivityForm />);

        await userEvent.type(screen.getByLabelText(/measurement/i), '10000');
        await userEvent.click(screen.getByRole('button', { name: /submit/i }));

        await waitFor(() => {
            expect(screen.getByText(/submitted successfully/i)).toBeInTheDocument();
        });
    });

    it('shows validation errors for invalid data', async () => {
        render(<ActivityForm />);

        await userEvent.type(screen.getByLabelText(/measurement/i), '-100');
        await userEvent.click(screen.getByRole('button', { name: /submit/i }));

        await waitFor(() => {
            expect(screen.getByText(/measurement must be positive/i)).toBeInTheDocument();
        });
    });
}); 