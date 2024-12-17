import React, { useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet, RefreshControl, Alert, TouchableOpacity } from 'react-native';
import { Card, Text, Image, Badge } from '@rneui/themed';
import { Post } from '../api/MainScreenAPI';
import { fetchBoardList } from '../api/BoardListAPI';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '../context/ThemeContext';

interface PostResponse {
  content: Post[];
}

const BoardListScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { isDarkMode } = useTheme();
  const [posts, setPosts] = useState<Post[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const response = await fetchBoardList();
      console.log('서버 응답:', response);
      
      if (Array.isArray(response)) {
        setPosts(response as Post[]);
      } else if (response && typeof response === 'object') {
        setPosts((response as PostResponse).content);
      } else {
        setPosts([]);
        console.error('유효하지 않은 응답 형식:', response);
      }
    } catch (error) {
      console.error('게시물 로딩 실패:', error);
      Alert.alert('오류', '게시물을 불러오는데 실패했습니다.');
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadPosts();
    setRefreshing(false);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#121212' : '#f5f5f5',
    },
    centerContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      marginTop: 20
    },
    card: {
      borderRadius: 15,
      padding: 15,
      marginBottom: 10,
      backgroundColor: isDarkMode ? '#1E1E1E' : '#FFFFFF',
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
    team: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#2196F3',
    },
    date: {
      fontSize: 14,
      color: isDarkMode ? '#888888' : '#666666',
    },
    image: {
      width: '100%',
      height: 200,
      borderRadius: 10,
      marginBottom: 10,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
      color: isDarkMode ? '#FFFFFF' : '#000000',
    },
    contentPreview: {
      marginBottom: 10,
    },
    content: {
      fontSize: 14,
      color: isDarkMode ? '#CCCCCC' : '#444444',
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 10,
    },
    interactions: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    interactionItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 16,
    },
    badgeContainer: {
      marginLeft: 4,
    },
    badgeText: {
      fontSize: 12,
      fontWeight: '600',
    },
    username: {
      fontSize: 14,
      color: isDarkMode ? '#888888' : '#666666',
    },
  });

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {loading ? (
        <View style={styles.centerContainer}>
          <Text>로딩 중...</Text>
        </View>
      ) : posts.length === 0 ? (
        <View style={styles.centerContainer}>
          <Text>게시물이 없습니다.</Text>
        </View>
      ) : (
        posts.map((post) => (
          <TouchableOpacity 
            key={post.id} 
            onPress={() => navigation.navigate('PostDetail', { postId: post.id })}
          >
            <Card containerStyle={styles.card}>
              <View style={styles.headerContainer}>
                <Text style={styles.team}>{post.team}</Text>
                <Text style={styles.date}>{formatDate(post.createdAt)}</Text>
              </View>

              {post.files && post.files.length > 0 && post.files[0].thumbnailUrl && (
                <Image
                  source={{ uri: post.files[0].thumbnailUrl }}
                  style={styles.image}
                  PlaceholderContent={<Text>이미지 로딩중...</Text>}
                />
              )}

              <Text style={styles.title}>{post.title}</Text>
              
              <View style={styles.contentPreview}>
                <Text numberOfLines={2} style={styles.content}>
                  {post.content}
                </Text>
              </View>

              <View style={styles.footer}>
                <View style={styles.interactions}>
                  <View style={styles.interactionItem}>
                    <FontAwesome 
                      name="eye"
                      size={20}
                      color="#666"
                    />
                    <Badge
                      value={post.viewCount}
                      status="primary"
                      containerStyle={styles.badgeContainer}
                      textStyle={styles.badgeText}
                    />
                  </View>
                </View>
                <Text style={styles.username}>{post.username}</Text>
              </View>
            </Card>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
};

export default BoardListScreen; 