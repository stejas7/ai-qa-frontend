export type EnterpriseIntegrationProvider = {
  key: string;
  displayName: string;
  category: string;
  authenticationMode: string;
  supportedActions: string[];
  supportedEvents: string[];
};

export type EnterpriseIntegrationPlan = {
  planId: string;
  companyId: string;
  providerKey: string;
  providerName: string;
  action: string;
  eventType: string;
  authenticationMode: string;
  credentialState: string;
  tenantScope: string;
  executable: boolean;
};

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, {
    credentials: 'include',
    headers: init?.body ? { 'Content-Type': 'application/json', ...(init.headers ?? {}) } : init?.headers,
    ...init,
  });
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed (${response.status})`);
  }
  return response.json() as Promise<T>;
}

export const enterpriseIntegrationsApi = {
  catalog: () => request<EnterpriseIntegrationProvider[]>('/api/integrations/enterprise/catalog'),
  plan: (input: { providerKey: string; action: string; eventType: string }) =>
    request<EnterpriseIntegrationPlan>('/api/integrations/enterprise/plan', {
      method: 'POST',
      body: JSON.stringify(input),
    }),
};
