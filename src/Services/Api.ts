import axios from 'axios';
import { Quest } from './Interface';

 const API_URL = "http://localhost:5050";
//const API_URL = "https://fetcher-backend.onrender.com"
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }else{console.error("Token not found in local storage")}
  return config;
}, error => {
  return Promise.reject(error);
});

export const fetchProfileData = async (): Promise<any> => {
  try {
    const response = await api.get(`/profile/me`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data.message || "Error fetching profile");
  }
};



export const updateProfileData = async (profileData: any): Promise<void> => {
  const userId = localStorage.getItem('userId');  // Dynamically get the user ID from local storage
  if (!userId) throw new Error("No user ID found in local storage.");

  try {
    await api.post(`/profile/update/${userId}`, profileData);
  } catch (error: any) {
    throw new Error(error.response?.data.message || "Error updating profile");
  }
};

export const login = async (username: string, password: string) => {
  try {
    const response = await api.post(`/login`, {
      userName: username,
      password: password
    });
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error('Login API error:', error.response?.data || error.message);
      throw error;
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred during login.');
    }
  }
};

export const registerUser = async (data: any) => {
  try {
    const response = await api.post('/register', data);
    localStorage.setItem('userId', response.data._id); // Assuming the server sends back the user's ID
    return response.data; // This will now include the user ID if needed for immediate login or session tracking
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error('Registration API error:', error.response?.data || error.message);
      throw new Error(error.response?.data.message || "Error during registration");
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred during registration.');
    }
  }
};

export const fetchQuests = async (): Promise<Quest[]> => {
  try {
    const response = await api.get('/quests');
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error('Fetch quests API error:', error.response?.data || error.message);
      throw new Error(error.response?.data.message || "Error fetching quests");
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred while fetching quests.');
    }
  }
};

export const fetchQuestByCreator = async (): Promise<Quest | null> => {
  try {
    const response = await api.get('/questByCreator');
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error('Fetch quest by creator API error:', error.response?.data || error.message);
      throw new Error(error.response?.data.message || "Error fetching quest by creator");
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred while fetching quest by creator.');
    }
  }
};