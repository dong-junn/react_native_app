import { Post } from './MainScreenAPI';

const BASE_URL: string = 'http://3.147.12.27:8080';

interface ApiError extends Error {
  status?: number;
}

export const fetchBoardList = async (): Promise<Post[]> => {
  try {
    const response = await fetch(`${BASE_URL}/post`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    
    if (!response.ok) {
      const error: ApiError = new Error(`서버 응답 에러: ${response.status}`);
      error.status = response.status;
      throw error;
    }
    
    return await response.json();
  } catch (error) {
    console.error('API 호출 에러:', {
      message: error instanceof Error ? error.message : '알 수 없는 에러',
      type: error instanceof Error ? error.name : '알 수 없는 타입',
      url: `${BASE_URL}/post`
    });
    throw error;
  }
}; 