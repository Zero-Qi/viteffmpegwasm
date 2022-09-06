<script setup>
  import { ref } from "vue";
  import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
  const ffmpeg = createFFmpeg({
    corePath: "/ffmpeg-core.js",
    log: true,
  });
  const message = ref("Click Start to Transcode");
  let video = ref(null);
  const file = process.env.NODE_ENV === "production" ? "/vue-app/flame.avi" : "/flame.avi";
  //file换成你的视频文件
  // methods
  async function transcode() {
    message.value = "Loading ffmeg-core.js";
    await ffmpeg.load();
    message.value = "Start transcoding";
    ffmpeg.FS("writeFile", "flame.avi", await fetchFile(file));
    await ffmpeg.run("-i", "flame.avi", "test.mp4");
    message.value = "Complete transcoding";
    const data = ffmpeg.FS("readFile", "test.mp4");
    video.value = URL.createObjectURL(new Blob([data.buffer], { type: "video/mp4" }));
  }
</script>

<template>
  <video :src="video" controls />
  <br />
  <button @click="transcode">Start</button>
  <p>{{ message }}</p>
</template>
