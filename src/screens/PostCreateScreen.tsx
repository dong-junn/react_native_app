import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PostCreateScreen = () => {
  return (
    <View style={styles.container}>
      <Text>게시물 등록 페이지입니다</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PostCreateScreen; 