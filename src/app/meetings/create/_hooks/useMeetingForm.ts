'use client';

import { useState, useMemo } from 'react';

import { CreateMeetingFormData, INITIAL_FORM_DATA, validateForm } from '../_models/formState';
import { Station } from '../_models/types';

export const useMeetingForm = () => {
  const [formData, setFormData] = useState<CreateMeetingFormData>(INITIAL_FORM_DATA);

  const setName = (name: string) => {
    updateFormData({ name });
  };

  const setMembers = (members: number) => {
    updateFormData({ members });
  };

  const setStation = (station: Station | null) => {
    updateFormData({ station });
  };

  const setDateTime = (date: string | null, time: string | null) => {
    updateFormData({ date, time });
  };

  const setDate = (date: string | null) => {
    updateFormData({ date });
  };

  const setTime = (time: string | null) => {
    updateFormData({ time });
  };

  const updateFormData = (updates: Partial<CreateMeetingFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const reset = () => {
    setFormData(INITIAL_FORM_DATA);
  };

  const isFormValid = useMemo(() => validateForm(formData), [formData]);

  return {
    formData,
    setName,
    setMembers,
    setStation,
    setDateTime,
    setDate,
    setTime,
    reset,
    isFormValid,
  };
};
