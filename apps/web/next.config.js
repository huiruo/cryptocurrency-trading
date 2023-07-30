// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
/**
 * office
 * http://172.16.39.156
 * 172.16.39.156
 * home
 * http://172.20.10.2
 */
const BASE_URL = 'http://172.20.10.2:3888'

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
        // Interface prefix with `/code-platform/`
        source: '/code-platform/:path*',
        destination: `${BASE_URL}/:path*`,
      },
    ]
  },
}
