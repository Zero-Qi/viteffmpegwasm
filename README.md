# ffmpeg + vite

这个模板能够帮助你在前端实现ffmpeg解码功能

生产环境需要设置https + 请求头设置

res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");


开发环境下 需要使用插件configure-response-headers即可


## start

npm install

npm run dev

ffmpeg api docs address
参考资料：https://github.com/ffmpegwasm/ffmpeg.wasm/blob/master/docs/api.md
