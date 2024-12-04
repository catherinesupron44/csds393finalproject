import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api, CreateBetData } from './api';
import { useAuthStore } from './store';

// Query keys
export const queryKeys = {
  bets: ['bets'] as const,
  groups: ['groups'] as const,
};

// Hooks
export function useBets() {
  return useQuery({
    queryKey: queryKeys.bets,
    queryFn: api.getBets,
  });
}

export function useCreateBet() {
  const queryClient = useQueryClient();
  const { profile } = useAuthStore();

  return useMutation({
    mutationFn: (data: CreateBetData) => api.createBet(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.bets });
    },
  });
}

export function useJoinBet() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (betId: string) => api.joinBet(betId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.bets });
    },
  });
}