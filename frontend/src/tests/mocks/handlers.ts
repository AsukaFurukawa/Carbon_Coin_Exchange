import { rest } from 'msw';
import { mockUser, mockActivities, mockIntegrations } from './data';

export const handlers = [
    rest.post('/auth/login', (req, res, ctx) => {
        return res(
            ctx.json({
                token: 'mock-token',
                user: mockUser,
            })
        );
    }),

    rest.get('/activities', (req, res, ctx) => {
        return res(ctx.json(mockActivities));
    }),

    rest.post('/activities', (req, res, ctx) => {
        return res(
            ctx.json({
                id: 'new-activity',
                ...req.body,
                userId: mockUser.id,
                timestamp: new Date(),
                verificationStatus: 'PENDING',
            })
        );
    }),

    rest.get('/integrations', (req, res, ctx) => {
        return res(ctx.json(mockIntegrations));
    }),
]; 