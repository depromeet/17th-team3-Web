import { MEMBERS_SIZE } from './constants';
import { Station } from './types';

export interface CreateMeetingFormData {
  name: string;
  attendeeCount: number;
  station: Station | null;
  date: string | null;
  time: string | null;
}

const getDefaultDateTime = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (tomorrow.getMinutes() > 0) {
    tomorrow.setHours(tomorrow.getHours() + 1);
  }

  const year = tomorrow.getFullYear();
  const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
  const date = String(tomorrow.getDate()).padStart(2, '0');
  const defaultDate = `${year}-${month}-${date}`;

  const hour = String(tomorrow.getHours()).padStart(2, '0');
  const defaultTime = hour;

  return { defaultDate, defaultTime };
};

export const INITIAL_FORM_DATA: CreateMeetingFormData = {
  name: '',
  attendeeCount: MEMBERS_SIZE.MIN,
  station: null,
  date: getDefaultDateTime().defaultDate,
  time: getDefaultDateTime().defaultTime,
};

export const validateForm = (formData: CreateMeetingFormData): boolean => {
  const hasValidName = formData.name.trim().length > 0;
  const hasValidMembers = formData.attendeeCount >= MEMBERS_SIZE.MIN;
  const hasValidStation = formData.station !== null;
  const hasValidDateTime = formData.date && formData.time;

  return !!(hasValidName && hasValidMembers && hasValidStation && hasValidDateTime);
};
