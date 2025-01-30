import { api } from '../lib/api';
import { IntegrationType, IIntegration, IIntegrationData } from '../types/integrations';

class IntegrationService {
    async connectProvider(type: IntegrationType, provider: string): Promise<IIntegration> {
        const { data } = await api.post('/integrations/connect', { type, provider });
        return data;
    }

    async disconnectProvider(integrationId: string): Promise<void> {
        await api.post(`/integrations/${integrationId}/disconnect`);
    }

    async syncData(integrationId: string): Promise<IIntegrationData[]> {
        const { data } = await api.post(`/integrations/${integrationId}/sync`);
        return data;
    }

    async getIntegrations(): Promise<IIntegration[]> {
        const { data } = await api.get('/integrations');
        return data;
    }

    async getProviderAuthUrl(type: IntegrationType, provider: string): Promise<string> {
        const { data } = await api.get('/integrations/auth-url', {
            params: { type, provider },
        });
        return data.url;
    }
}

export const integrationService = new IntegrationService(); 