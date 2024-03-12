<template>
  <div>
    <VideoList @update:videoUrl="updateVideoUrl" />
    <VideoPlayer :videoUrl="selectedVideoUrl" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import VideoList from '../components/VideoList.vue';
import VideoPlayer from '../components/VideoPlayer.vue';

const selectedVideoUrl = ref('');

const updateVideoUrl = (url) => {
  console.log('updateVideoUrl', url);
  selectedVideoUrl.value = url;
};
</script>
