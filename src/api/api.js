// src/api/api.js
const BASE_URL = 'http://3.147.12.27:8080/';

export const fetchPosts = async () => {
  try {
    console.log('요청 시작:', `${BASE_URL}`);
    
    const response = await fetch(`${BASE_URL}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      timeout: 5000,
    });
    
    if (!response.ok) {
      console.error('서버 응답 에러:', response.status);
      throw new Error(`서버 응답 에러: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('받은 데이터:', data);
    
    return data;
  } catch (error) {
    console.error('API 호출 에러:', {
      message: error.message,
      type: error.name,
      url: BASE_URL
    });
    
    if (error.message.includes('Network request failed')) {
      throw new Error('네트워크 연결을 확인해주세요.');
    }
    
    throw error;
  }
};