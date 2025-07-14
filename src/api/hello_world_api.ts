import axios, { type AxiosResponse } from 'axios';
import type { Result } from '../utils/result';
import { getApiErrorMessage } from '../utils/errorHandler';
import type { HelloWorldResponse } from '../utils/hello_world_response';

const helloWorldClient = axios.create({
  baseURL: 'http://localhost:8080/hello-world',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchHelloWorld = async (): Promise<Result<HelloWorldResponse>> => {
  try {
    const response: AxiosResponse<string> = await helloWorldClient.get('/hello-world');
    return { success: true, data: { message: response.data } };
  } catch (error) {
    console.error('Error fetching hello world message:', error);
    const errorMsg = getApiErrorMessage(error);
    return { success: false, error: errorMsg };
  }
};
