// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
/**
 * office
 *
 * home
 * http://192.168.1.100
 */
const BASE_URL = 'http://192.168.1.100:3888'

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
