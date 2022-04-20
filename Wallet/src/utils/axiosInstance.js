import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = 'http://10.0.2.2:8080';

let item = AsyncStorage.getItem('storage_key');
const axiosInstance = axios.create({
  baseURL,
  headers: {
    authorization: `${item}`,
  },
});

axiosInstance.interceptors.request.use(async req => {
  if (item) {
    let item = await AsyncStorage.getItem('storage_key');
    req.headers.authorization = `${item}`;
  }
  return req;
});

export default axiosInstance;
