import axios from 'axios';
import { ApiResponse, Profile } from './Interface';


const API_URL = "http://localhost:5050"; // Adjust based on your server setup



// Set up a base instance of axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token
api.interceptors.request.use(config => {
  // Assuming you store your token in localStorage or some state management
  const token = localStorage.getItem('token');
  if (token) {
    config.headers!.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

const userId = "661308ce1a1aa40b8fcb7dbd"; 

export const fetchProfileData = async (): Promise<Profile> => {
  try {
      const response = await api.get<ApiResponse>(`/profile/${userId}`);
      const { name, email, mobile, bio, } = response.data;
      return {
            // Ensure this is included
          name,
          email,
          mobileNumber: mobile,
          bio: bio || "",
      };
  } catch (error: any) {
      throw new Error(error.response?.data.message || "Error fetching profile");
  }
};


export const updateProfileData = async (profileData: Profile): Promise<void> => {
  try {
    await api.post(`/profile/update/${userId}`, {
      name: profileData.name,
      email: profileData.email,
      bio: profileData.bio,
      mobile: profileData.mobileNumber,
    });
  } catch (error: any) {
    throw new Error(error.response?.data.message || "Error updating profile");
  }
};
