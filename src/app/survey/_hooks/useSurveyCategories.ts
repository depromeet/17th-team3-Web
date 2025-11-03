'use client';

import { useEffect, useState } from 'react';

import { surveyApi } from '@/app/_services/survey/api';
import { mockSurveyCuisineData } from '@/app/survey/_mock/surveyCuisineData';

import type { FoodCategory } from '@/app/survey/_models/types';

/**
 * useSurveyCategories
 * - /survey-categories API 호출
 * - 로컬 상태로 캐싱하여 재호출 방지
 */
export const useSurveyCategories = () => {
  const [categories, setCategories] = useState<FoodCategory[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // 나중에 실제 API로 대체할 자리
    setCategories(mockSurveyCuisineData.data as FoodCategory[]);
  }, []);

  // useEffect(() => {
  //   let mounted = true;

  //   const fetchCategories = async () => {
  //     try {
  //       const res = await surveyApi.getSurveyCategories();
  //       if (mounted) setCategories(res.data.data ?? []);
  //     } catch (err) {
  //       if (mounted) setError(err as Error);
  //     } finally {
  //       if (mounted) setIsLoading(false);
  //     }
  //   };

  //   fetchCategories();
  //   return () => {
  //     mounted = false;
  //   };
  // }, []);

  return { categories, error };
};
