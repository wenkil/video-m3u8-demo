# video-m3u8-demo
在node项目里使用ffmpeg-static来对视频进行分割，然后在前端项目里使用hls.js进行播放m3u8格式的视频

### node项目 ffmpeg-video-node

```
-- 运行 npm start
-- 打开localhost:3000/upload.html上传mp4视频
-- 或者在videos文件夹下放置想要转换的视频，然后浏览器打开localhost:3000/convert-videos，会自动将videos文件夹下所有视频自动转换完成
```


### 前端项目 m3u8-video-player
```
-- 将上面分割好的视频放到前端的public文件夹下
-- 在src/components/VideoList.vue里修改
    const videos = [
      {name: 'Video 1', url: '/video1/video.m3u8'},
      {name: 'Video 2', url: '/video2/video.m3u8'},
      {name: 'Video 3', url: '/video3/video.m3u8'},
      {name: 'Video 4', url: '/video4/video.m3u8'},
      {name: 'Video 5', url: '/video5/video.m3u8'},
    ];
    videos的list里的url为你的文件夹和m3u8的名字
-- 运行 npm run dev
-- 打开http://127.0.0.1:5173
-- 点击查看效果
```
