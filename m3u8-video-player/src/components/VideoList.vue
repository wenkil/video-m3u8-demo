<template>
  <div class="flex-column-list">
    <button class="video-btn" v-for="(video, index) in videos" :key="index" @click="selectVideo(video)">
      {{ video.name }}
    </button>
  </div>
</template>

<script setup>
const videos = [
  {name: 'Video 1', url: '/video1/video.m3u8'},
  {name: 'Video 2', url: '/video2/video.m3u8'},
  {name: 'Video 3', url: '/video3/video.m3u8'},
  {name: 'Video 4', url: '/video4/video.m3u8'},
  {name: 'Video 5', url: '/video5/video.m3u8'},
];

const emit = defineEmits(['update:videoUrl']);

const selectVideo = (video) => {
  emit('update:videoUrl', video.url);
};
</script>
<style scoped>
.flex-column-list {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}

.video-btn {
  margin: 5px;
}
</style>
