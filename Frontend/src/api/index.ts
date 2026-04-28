import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext';

// --- Configuration ---
export const API_BASE_URL = 'http://127.0.0.1:8000';

// --- API Client ---
interface ApiConfig extends Omit<RequestInit, 'body'> {
  body?: any;
}

export async function apiClient<T>(
  endpoint: string,
  { body, ...customConfig }: ApiConfig = {}
): Promise<T> {
  const token = localStorage.getItem('leafguard_token');
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config: RequestInit = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    if (body instanceof FormData) {
      config.body = body;
      if (config.headers) {
        delete (config.headers as any)['Content-Type'];
      }
    } else {
      config.body = JSON.stringify(body);
    }
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ detail: 'Unknown error' }));
    throw new Error(errorData.detail || 'API request failed');
  }

  return response.json();
}

// --- Types ---
export interface Diagnosis {
  id: number;
  diseaseName: string;
  confidence: number;
  description: string;
  treatments: string[];
  isHealthy: boolean;
  timestamp: string;
}

export interface User {
  id: number;
  email: string;
  fullName: string;
  isExpert: boolean;
}

// --- Hooks ---

// Auth
export const useUser = () => {
  const { token } = useAuth();
  return useQuery({
    queryKey: ['user'],
    queryFn: () => apiClient<User>('/users/me'),
    retry: false,
    enabled: !!token,
  });
};

// Diagnoses
export const useDiagnoses = () => {
  const { token } = useAuth();
  return useQuery({
    queryKey: ['diagnoses'],
    queryFn: () => apiClient<Diagnosis[]>('/diagnoses'),
    enabled: !!token,
  });
};

export const usePredict = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => 
      apiClient<Diagnosis>('/predict', { body: formData }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['diagnoses'] });
    },
  });
};

// Insurance
export const useVerifyCertificate = (certId: string | null) => {
  return useQuery({
    queryKey: ['verify', certId],
    queryFn: () => {
      const numericId = certId?.replace(/[^0-9]/g, '');
      return apiClient<any>(`/verify-certificate/${numericId}`);
    },
    enabled: !!certId,
    retry: false,
  });
};

// Forum
export const useForumPosts = () => {
  return useQuery({
    queryKey: ['forum', 'posts'],
    queryFn: () => apiClient<any[]>('/forum/posts'),
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (postData: any) => apiClient('/forum/posts', { body: postData }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forum', 'posts'] });
    },
  });
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (commentData: { content: string; post_id: number }) => 
      apiClient('/forum/comments', { body: commentData }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forum', 'posts'] });
    },
  });
};

// Chat
export const useChat = () => {
  return useMutation({
    mutationFn: (payload: { message: string; language?: string }) => 
      apiClient<{ response: string }>('/chat', { body: payload }),
  });
};
