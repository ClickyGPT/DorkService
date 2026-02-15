export interface DorkOperator {
  name: string;
  label: string;
  description: string;
}

export interface DorkCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  dorks: DorkEntry[];
}

export interface DorkEntry {
  title: string;
  query: string;
  description: string;
}

export interface GeminiResponse {
  dork: string;
  explanation?: string;
}