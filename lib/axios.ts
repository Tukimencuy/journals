// src/lib/axios.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://test-fe.mysellerpintar.com/api', // Base URL dari dokumen [cite: 3]
});

// Kita bisa menambahkan interceptor di sini nanti untuk handle token JWT
// api.interceptors.request.use(...)

export default api;
