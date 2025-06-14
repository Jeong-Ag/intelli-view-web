import { createURL, END_POINTS } from '@/constants/api';
import type { JobInfoItem } from '@/types';
import { fetchRequest } from '@/utils';
import { getStorageItem } from '@/utils/storage';

interface PutJobInfoParams {
  jd: string;
}
interface JobIdResponse {
  id: string;
}

export const postJobInfo = async ({ company, position }: JobInfoItem) => {
  const url = createURL(END_POINTS.JOBS);

  const response = await fetchRequest<JobIdResponse>({
    url,
    options: { method: 'POST', body: JSON.stringify({ company, position }) },
  });

  return response;
};

export const putJobDescription = async ({ jd }: PutJobInfoParams) => {
  const jobId = getStorageItem('jobId');
  const url = createURL(END_POINTS.JD(jobId));

  const response = await fetchRequest<string>({
    url,
    options: { method: 'PUT', body: JSON.stringify({ jd }) },
  });

  return response;
};
