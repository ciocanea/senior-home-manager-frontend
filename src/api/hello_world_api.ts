import axios, { type AxiosResponse } from 'axios';

import type { Result } from '../utils/result';
import type { HelloWorldResponse } from '../utils/responses/hello_world_response';

import { getApiErrorMessage } from '../utils/errorHandler';

const helloWorldClient = axios.create({
  // baseURL: 'http://localhost:8080/hello-world',
  baseURL: 'https://shm-aca.purplesand-daccc954.westeurope.azurecontainerapps.io/hello-world',
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

export const fetchHelloWorldRepository = async (): Promise<Result<HelloWorldResponse>> => {
  try {
    const response: AxiosResponse<string> = await helloWorldClient.get('/hello-world-repository');
    return { success: true, data: { message: response.data } };
  }
  catch (error) {
    console.error('Error fetching hello world message from repository:', error);
    const errorMsg = getApiErrorMessage(error);
    return { success: false, error: errorMsg };
  }
}

export const createHelloWorld = async (message: string): Promise<Result<HelloWorldResponse>> => {
  try {
    const response: AxiosResponse<string> = await helloWorldClient.post('/create-hello-world', { message: message });
    return { success: true, data: { message: response.data } };
  }
  catch (error) {
    console.error('Error creating hello world message:', error);
    const errorMsg = getApiErrorMessage(error);
    return { success: false, error: errorMsg };
  }
}
