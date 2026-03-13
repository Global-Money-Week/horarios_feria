import { useQuery } from '@tanstack/react-query';
import { metricsService } from '../services/metrics.service';
import type { GeneralMetrics, DayMetrics, SlotMetrics } from '../types/api';

/**
 * Hook para obtener métricas generales (admin)
 */
export function useGeneralMetrics() {
  return useQuery<GeneralMetrics>({
    queryKey: ['metrics', 'general'],
    queryFn: () => metricsService.getGeneralMetrics(),
    enabled: !!localStorage.getItem('auth_token'),
    staleTime: 30000, // 30 segundos
  });
}

/**
 * Hook público para obtener el total de estudiantes (vista pública)
 * Siempre se ejecuta, incluso sin autenticación
 * Usa el endpoint público /metrics/public/total-students
 */
export function usePublicTotalStudents() {
  return useQuery<number>({
    queryKey: ['metrics', 'public', 'totalStudents'],
    queryFn: () => metricsService.getTotalStudents(),
    staleTime: 30000, // 30 segundos
    retry: 2, // Reintentar 2 veces si falla
  });
}

/**
 * Hook para obtener métricas por día (admin)
 */
export function useDayMetrics() {
  return useQuery<DayMetrics[]>({
    queryKey: ['metrics', 'days'],
    queryFn: () => metricsService.getDayMetrics(),
    enabled: !!localStorage.getItem('auth_token'),
    staleTime: 30000,
  });
}

/**
 * Hook para obtener métricas por horario (admin)
 */
export function useSlotMetrics() {
  return useQuery<SlotMetrics[]>({
    queryKey: ['metrics', 'slots'],
    queryFn: () => metricsService.getSlotMetrics(),
    enabled: !!localStorage.getItem('auth_token'),
    staleTime: 30000,
  });
}
