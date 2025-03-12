import { baseService } from './baseService';

const authService = {
  async login(email: string, password: string) {
    return baseService.post('/auth/login', { email, password });
  },

  async register(email: string, password: string, name: string) {
    return baseService.post('/auth/register', { email, password, name });
  },
};

export default authService;
