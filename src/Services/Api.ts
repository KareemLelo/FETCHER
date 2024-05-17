import axios from 'axios';
import { PassportUpdateData, Quest } from './Interface';

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
    const response = await api.get('/questsByCreator');
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

export const createQuest = async (questData: Quest): Promise<Quest> => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error("No token found in local storage");
  }
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  try {
    const response = await api.post<Quest>('/postQuest', questData, config);
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error('Create quest API error:', error.response?.data || error.message);
      throw error;
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred during quest creation.');
    }
  }
};

export const sendAcceptedQuest = async (questId: string): Promise<Quest> => {
  try {
    const response = await api.put<Quest>(`/quest/accept/${questId}`);
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error('Accept quest API error:', error.response?.data || error.message);
      throw new Error(error.response?.data.message || "Error accepting quest");
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred while accepting quest.');
    }
  }
};

export const updatePassportDetails = async (passportDetails: {
  passportNumber: string;
  nationality: string;
  passportExpDate: string;
}): Promise<any> => {
  try {
    const response = await api.put('/profile/passport', passportDetails);
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error('Update passport details API error:', error.response?.data || error.message);
      throw new Error(error.response?.data.message || "Error updating passport details");
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred while updating passport details.');
    }
  }
};

export const updateFlightDetails = async (flightDetails: {
  departureDate: string;
  arrivalDate: string;
  depFlightNumber: string;
  arrFlightNumber: string;
  alreadyThere?: boolean;
}): Promise<any> => {
  try {
    const response = await api.put('/profile/flightDetails', flightDetails);
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error('Update flight details API error:', error.response?.data || error.message);
      throw new Error(error.response?.data.message || "Error updating flight details");
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred while updating flight details.');
    }
  }
};

export const updateUserProfile = async (profileData: {
  name?: string;
  email?: string;
  mobile?: string;
  bio?: string;
}): Promise<any> => {
  try {
    const response = await api.put('/profile/me', profileData);
    return response.data;
  } catch (error: any) {
    console.error('Update user profile API error:', error.response?.data || error.message);
    throw new Error(error.response?.data.message || "Error updating user profile");
  }
};

export const fetchQuestByCreatorTrackOrder = async (): Promise<Quest | null> => {
  try {
    const response = await api.get('/questsByCreatorTrackOrder');
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error('Fetch quest by creator track order API error:', error.response?.data || error.message);
      throw new Error(error.response?.data.message || "Error fetching quest by creator track order");
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred while fetching quest by creator track order.');
    }
  }
};

export const fetchQuestByAcceptor = async (): Promise<Quest | null> => {
  try {
    const response = await api.get(`/questsByAcceptedBy`);
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error('Fetch quest by acceptor API error:', error.response?.data || error.message);
      throw new Error(error.response?.data.message || "Error fetching quest by acceptor");
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred while fetching quest by acceptor.');
    }
  }
};


export const updateQuestIndices = async (questId:string, statusIndex:number, progressIndex:number) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error("No token found in local storage");
    }
    
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    const response = await axios.put(`/updateQuest/${questId}`, { statusIndex, progressIndex }, config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Update quest API error:', error.response?.data || error.message);
      throw new Error(error.response?.data.message || "Error updating quest");
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred while updating quest.');
    }
  }
};