import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api, CreateBetData, CreateGroupData } from './api';
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

export function useGroups() {
  return useQuery({
    queryKey: queryKeys.groups,
    queryFn: api.getGroups,
  });
}

export function useCreateGroup() {
  const queryClient = useQueryClient();
  const { profile } = useAuthStore();

  return useMutation({
    mutationFn: (data: CreateGroupData) => api.createGroup(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.groups });
    },
  });
}

export function useJoinGroup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (groupId: string) => api.joinGroup(groupId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.groups });
    },
  });
}