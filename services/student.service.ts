import getConfig from 'next/config';


import { fetchWrapper } from '../helpers';
const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}`;

export const studentService = {
  getAll
};

function getAll() {
  return fetchWrapper.get(`${baseUrl}/student`);
}
