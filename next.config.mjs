/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'mmission007.org',
          pathname: '/**'
        }
      ]
    }
  }

  export default nextConfig