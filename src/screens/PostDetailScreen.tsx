import React, { useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet, Alert, Linking } from 'react-native';
import { Text, Card, Button } from '@rneui/themed';
import { fetchPostDetail } from '../api/PostDetailAPI';
import { RouteProp } from '@react-navigation/native';
import YoutubePlayer from 'react-native-youtube-iframe';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

type PostDetailScreenProps = {
  route: RouteProp<{ params: { postId: number } }, 'params'>;
};

const getYouTubeVideoId = (url: string) => {
  if (!url) return null;
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[7].length === 11) ? match[7] : null;
};

const PostDetailScreen: React.FC<PostDetailScreenProps> = ({ route }) => {
  const { postId } = route.params;
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPostDetail();
  }, [postId]);

  const loadPostDetail = async () => {
    try {
      setLoading(true);
      const data = await fetchPostDetail(postId);
      setPost(data);
    } catch (error) {
      Alert.alert('오류', '게시물을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
  };

  const handleDownload = async (url: string, fileName: string) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      Alert.alert('오류', '파일을 다운로드할 수 없습니다.');
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <Text>로딩 중...</Text>
      </View>
    );
  }

  if (!post) {
    return (
      <View style={styles.centerContainer}>
        <Text>게시물을 찾을 수 없습니다.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Card containerStyle={styles.card}>
        <View style={styles.headerContainer}>
          <View style={styles.leftHeader}>
            <View style={styles.viewCountContainer}>
              <FontAwesome 
                name="eye"
                size={16}
                color="#666"
              />
              <Text style={styles.viewCount}> {post.viewCount}</Text>
            </View>
            <Text style={styles.team}>{post.team}</Text>
          </View>
          <Text style={styles.date}>{formatDate(post.createdAt)}</Text>
        </View>

        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.username}>작성자: {post.username}</Text>

        <View style={styles.contentContainer}>
          <Text style={styles.content}>{post.content}</Text>
        </View>

        {post.files && post.files.map((file: any, index: number) => (
          <View key={index} style={styles.fileContainer}>
            {file.thumbnailUrl && (
              <Card.Image
                source={{ uri: file.thumbnailUrl }}
                style={styles.image}
              />
            )}
          </View>
        ))}

        {post.youtubelink && getYouTubeVideoId(post.youtubelink) && (
          <View style={styles.videoContainer}>
            <YoutubePlayer
              height={200}
              videoId={getYouTubeVideoId(post.youtubelink)!}
              play={false}
              webViewProps={{
                androidLayerType: 'hardware',
              }}
              initialPlayerParams={{
                preventFullScreen: true,
                rel: 0,
                showClosedCaptions: false,
              }}
            />
          </View>
        )}

        {post.files && post.files.map((file: any, index: number) => (
          <Button
            key={`button-${index}`}
            title={`${file.fileName} 다운로드`}
            onPress={() => handleDownload(file.downloadUrl, file.fileName)}
            buttonStyle={styles.buttonStyle}
            containerStyle={styles.buttonContainer}
            icon={{
              name: 'download',
              type: 'font-awesome',
              size: 15,
              color: 'white',
            }}
            iconRight
          />
        ))}
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    borderRadius: 15,
    padding: 15,
    margin: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  leftHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewCountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  viewCount: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  team: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  username: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  contentContainer: {
    marginBottom: 20,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  fileContainer: {
    marginBottom: 15,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  downloadButton: {
    marginTop: 5,
  },
  footer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 15,
  },
  interactions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  interactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  interactionText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#666',
  },
  videoContainer: {
    marginVertical: 15,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  buttonStyle: {
    backgroundColor: '#2196F3',
    borderRadius: 10,
    paddingVertical: 12,
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 5,
    borderRadius: 10,
    width: '100%',
  },
});

export default PostDetailScreen; 