import { Round } from 'libs/types/round';
import { Member } from 'types/interfaces';
import { HttpRequest } from './httpRequest';

const request = new HttpRequest();
export const getApplicantAPI = async (
  round: string,
  pageNo: number,
  key: string,
  value?: string,
) => {
  const response = await request.get(
    `/members?round=${round}&_page=${pageNo}&_limit=10&${key}_like=${value}`,
  );
  return response.data;
};

export const getRoundAPI = async () => {
  const response = await request.get(`/round`);
  return response.data;
};

export const postRoundAPI = async (body: Round) => {
  const response = await request.post(`/round`, body);
  return response.data;
};

export const patchMemberAPI = async (id: string, body: Partial<Member>) => {
  await request.patch(`/members/${id}`, body);
};

export const getWorkerInfo = async (key: string, value: string) => {
  const response = await request.get(`/members?${key}_like=${value}`);
  return response.data;
};
