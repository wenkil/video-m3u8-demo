const express = require('express');
const router = express.Router();
const multer = require('multer');
const ffmpeg = require('ffmpeg-static');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

// 设置上传目录和文件名
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '../uploads/');
    // 确保上传目录存在
    if (!fs.existsSync(uploadDir)){
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// 定义上传和转换视频的路由
router.post('/upload', upload.single('video'), (req, res) => {
  const videoPath = req.file.path;
  const outputDir = path.join(__dirname, '../uploads/', path.parse(videoPath).name);
  if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir, { recursive: true });
  }
  const outputPath = path.join(outputDir, 'video.m3u8');

  // 使用FFmpeg转化视频
  const ffmpegCommand = `${ffmpeg} -i "${videoPath}" -codec: copy -start_number 0 -hls_time 10 -hls_list_size 0 -f hls "${outputPath}"`;
  exec(ffmpegCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).send({ message: '视频转换失败：'+error });
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);

    res.send({ message: '视频转换完成，转换目录：', path: outputPath });
  });
});

router.get('/convert-videos', (req, res) => {
  const videosDir = path.join(__dirname, '../videos'); // 视频文件所在目录
  fs.readdir(videosDir, (err, files) => {
    if (err) {
      console.error(`Error reading directory: ${err}`);
      return res.status(500).send({ message: '读取文件夹失败！！！' });
    }

    // 过滤出视频文件，这里简单以.mp4为例
    const videoFiles = files.filter(file => file.endsWith('.mp4'));

    if (videoFiles.length === 0) {
      return res.send({ message: '没有找到mp4文件！！！' });
    }

    videoFiles.forEach(videoName => {
      const videoPath = path.join(videosDir, videoName);
      const outputDir = path.join(videosDir, 'output', path.parse(videoName).name);

      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      const outputPath = path.join(outputDir, 'video.m3u8');

      // 使用FFmpeg转化视频
      const ffmpegCommand = `${ffmpeg} -i "${videoPath}" -codec: copy -start_number 0 -hls_time 10 -hls_list_size 0 -f hls "${outputPath}"`;
      exec(ffmpegCommand, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error converting ${videoName}: ${error}`);
          return; // 在这里，我们简单地返回，你可能想要处理错误或记录到错误日志
        }
        console.log(`${videoName} conversion succeeded.`);
      });
    });

    res.send({ message: 'videos文件夹下的所有视频转换完成！~~' });
  });
});


module.exports = router;
