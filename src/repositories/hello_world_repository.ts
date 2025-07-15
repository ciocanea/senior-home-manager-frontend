import { createHelloWorld, fetchHelloWorld, fetchHelloWorldRepository } from '../api/hello_world_api';

export const HelloWorldRepository = {
  async fetchHelloWorld() {
    return await fetchHelloWorld();
  },

  async fetchHelloWorldRepository() {
    return await fetchHelloWorldRepository();
  },

  async createHelloWorld(message: string) {
    return await createHelloWorld(message);
  }
};