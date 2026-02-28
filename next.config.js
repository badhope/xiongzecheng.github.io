/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // 关键配置：生成纯静态 HTML 文件
  images: {
    unoptimized: true, // 静态导出时通常需要关闭图片优化
  },
};

module.exports = nextConfig;
