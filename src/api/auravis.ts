const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

export type PipelineRunSummary = {
  id: string;
  company: string;
  fileName: string;
  status: string;
  currentStage?: string;
  createdAt?: string;
  completedAt?: string;
};

export type PipelineRunDetail = PipelineRunSummary & {
  errorMessage?: string;
  resultJson?: string;
};

export type PipelineStats = {
  uploaded: number;
  processed: number;
  completed: number;
  failed: number;
  processing: number;
  completionRate: number;
};

async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, { cache: 'no-store' });
  if (!response.ok) throw new Error(`API ${response.status}: ${path}`);
  return response.json();
}

export const auravisApi = {
  runs: () => request<PipelineRunSummary[]>('/api/pipeline/runs'),
  stats: () => request<PipelineStats>('/api/pipeline/stats'),
  run: (id: string) => request<PipelineRunDetail>(`/api/pipeline/runs/${id}`)
};
