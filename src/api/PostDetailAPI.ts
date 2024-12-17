import { Post } from './MainScreenAPI';

interface PostDetail extends Post {
  updatedAt: string;
  youtubelink?: string;
  liked: boolean;
  files: {
    fileName: string;
    downloadUrl: string;
    thumbnailUrl: string | null;
  }[];
}

const BASE_URL: string = 'http://3.147.12.27:8080';

export const fetchPostDetail = async (postId: number): Promise<PostDetail> => {
  try {
    const response = await fetch(`${BASE_URL}/post/${postId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    
    if (!response.ok) {
      throw new Error(`서버 응답 에러: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('게시물 상세 조회 실패:', error);
    throw error;
  }
}; 