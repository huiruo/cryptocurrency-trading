FROM node:alpine
WORKDIR /app
COPY app.js /app
# 使用 `RUN` 指令运行需要的命令，例如，在容器中安装依赖项。
# RUN npm install
CMD ["node", "app.js"]

# docker build -f Dockerfile . -t code-js
# docker run -d -p 3800:3800 code-js
# docker run -p 3800:3800 code-js
