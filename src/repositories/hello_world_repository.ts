import { fetchHelloWorld } from '../api/hello_world_api';

export const HelloWorldRepository = {
  async fetchHelloWorld() {
    return await fetchHelloWorld();
  }
};
