// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  reactStrictMode: true,
  transpilePackages: ['ui'],
  output: 'standalone',
  async rewrites() {
    return [
      {
        // 接口前缀带上`/code-platform/`
        source: '/code-platform/:path*',
        // destination: 'http://localhost:3888/:path*'
        // home
        // destination: 'http://192.168.186.118:3888/:path*',
        // home 2
        destination: 'http://172.20.10.2:3888/:path*',
        // office
        // destination: 'http://172.16.39.156:3888/:path*'
      },
    ]
  },
}
