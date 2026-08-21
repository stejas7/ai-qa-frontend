export type EnterpriseIntegrationProvider = {
  key: string;
  displayName: string;
  category: string;
  authenticationMode: string;
  supportedActions: string[];
  supportedEvents: string[];
};

async function request<T>(path: string): Promise<T> {
  const response = await fetch(path, { credentials: 'include' });
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed (${response.status})`);
  }
  return response.json() as Promise<T>;
}

export const enterpriseIntegrationsApi = {
  catalog: () => request<EnterpriseIntegrationProvider[]>('/api/integrations/enterprise/catalog'),
};
