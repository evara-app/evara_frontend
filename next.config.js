/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    LIARA_ENDPOINT: "https://storage.iran.liara.space",
    LIARA_BUCKET_NAME: "agitated-joliot-uy-qeuk8n",
    LIARA_ACCESS_KEY: "a4mo8hbg35f026dr",
    LIARA_SECRET_KEY: "ca6ad996-1cdd-4e71-9ccc-303752460e89",
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [{ loader: "@svgr/webpack", options: { icon: true } }],
    });

    return config;
  },
};

module.exports = nextConfig;
