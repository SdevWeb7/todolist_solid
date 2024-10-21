import webpack from "webpack";



/** @type {import('next').NextConfig} */
const nextConfig = {
   output: "standalone",
   reactStrictMode: true,
   webpack: (config, { isServer }) => {
      if (isServer) {
         config.plugins.push(
            new webpack.BannerPlugin({
               banner: 'require("reflect-metadata");',
               entryOnly: true,
               raw: true,
            })
         );
      }
      return config;
   },
};

export default nextConfig;