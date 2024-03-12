<template>
  <video ref="videoElement" controls style="width: 100%; max-width: 640px;"></video>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import Hls from 'hls.js';

// Props to receive the selected video URL
const props = defineProps({
  videoUrl: String,
});

const videoElement = ref(null);

watchEffect(() => {
  if (!props.videoUrl) return;

  if (Hls.isSupported()) {
    console.log('HLS supported');
    const hls = new Hls();
    hls.loadSource(props.videoUrl);
    hls.attachMedia(videoElement.value);
    hls.on(Hls.Events.MANIFEST_PARSED, function() {
      // videoElement.value.play();
    });
  } else if (videoElement.value.canPlayType('application/vnd.apple.mpegurl')) {
    console.log('不支持HLS');
    videoElement.value.src = props.videoUrl;
    videoElement.value.addEventListener('loadedmetadata', () => {
      // videoElement.value.play();
    });
  }
});
</script>
