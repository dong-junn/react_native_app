import React, { useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet, RefreshControl, Alert } from 'react-native';
import { Card, Text, Image, Icon } from '@rneui/themed';
import { fetchPosts } from '../api/api';

const MainScreen = () => {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const response = await fetchPosts();
      console.log('받은 응답:', response);
      if (response) {
        setPosts(response);
      }
    } catch (error) {
      console.error('게시물 로딩 실패:', error);
      Alert.alert('오류', '게시물을 불러오는데 실패했습니다.');
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
  };

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
          <Card key={post.id} containerStyle={styles.card}>
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
                  <Icon 
                    name={post.liked ? "heart" : "heart-outline"} 
                    type="material-community"
                    color={post.liked ? "#FF0000" : "#000"}
                    size={24}
                  />
                  <Text style={styles.interactionText}>{post.likeCount}</Text>
                </View>
                <View style={styles.interactionItem}>
                  <Icon name="eye-outline" type="material-community" size={24} />
                  <Text style={styles.interactionText}>{post.viewCount}</Text>
                </View>
              </View>
              <Text style={styles.username}>{post.username}</Text>
            </View>
          </Card>
        ))
      )}
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
    marginTop: 20
  },
  card: {
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
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
    color: '#666',
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
  },
  contentPreview: {
    marginBottom: 10,
  },
  content: {
    fontSize: 14,
    color: '#444',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  interactions: {
    flexDirection: 'row',
  },
  interactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  interactionText: {
    marginLeft: 5,
    fontSize: 14,
  },
  username: {
    fontSize: 14,
    color: '#666',
  },
});

export default MainScreen;
