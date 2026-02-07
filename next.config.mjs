/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'mmission007.org',
          pathname: '/**'
        },
        {
          protocol: 'https',
          hostname: 'lh3.googleusercontent.com',
          pathname: '/**'
        },
        {
          protocol: 'https',
          hostname: 'www.freeiconspng.com',
          pathname: '/**'
        },
        {
          protocol: 'https',
          hostname: 'images.unsplash.com',
          pathname: '/**'
        },
        {
          protocol: 'https',
          hostname: 'dl4.pushbulletusercontent2.com',
          pathname: '/**'
        }
      ]
    }
  }

  export default nextConfig