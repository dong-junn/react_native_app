import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://3.147.12.27:8080';

export const apiClient = {
  post: async (endpoint: string, data: any, config = {}) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      
      const headers: any = {
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      };

      if (!(data instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
        data = JSON.stringify(data);
      }

      const requestConfig: RequestInit = {
        method: 'POST',
        headers: {
          ...headers
        },
        body: data
      };

      console.debug('요청 설정:', {
        url: `${BASE_URL}${endpoint}`,
        headers: requestConfig.headers,
        bodyType: data instanceof FormData ? 'FormData' : typeof data
      });

      const response = await fetch(`${BASE_URL}${endpoint}`, requestConfig);

      const responseData = await response.json();
      console.debug('서버 응답:', responseData);

      if (!response.ok) {
        console.error('서버 오류 응답:', {
          status: response.status,
          statusText: response.statusText,
          headers: Object.fromEntries(response.headers.entries()),
          body: responseData
        });
        throw new Error(responseData.message || `HTTP error! status: ${response.status}`);
      }

      return responseData;
    } catch (error) {
      console.error('API 요청 실패:', error);
      throw error;
    }
  }
}; 