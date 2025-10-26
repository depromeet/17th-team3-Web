import { MEMBERS_SIZE } from './constants';
import { Station } from './types';

export interface CreateMeetingFormData {
  name: string;
  members: number;
  station: Station | null;
  date: string | null;
  time: string | null;
}

export const INITIAL_FORM_DATA: CreateMeetingFormData = {
  name: '',
  members: MEMBERS_SIZE.MIN,
  station: null,
  date: null,
  time: null,
};

export const validateForm = (formData: CreateMeetingFormData): boolean => {
  const hasValidName = formData.name.trim().length > 0;
  const hasValidMembers = formData.members >= MEMBERS_SIZE.MIN;
  const hasValidStation = formData.station !== null;
  const hasValidDateTime = formData.date && formData.time;

  return !!(hasValidName && hasValidMembers && hasValidStation && hasValidDateTime);
};
