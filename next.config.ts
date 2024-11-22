const nextConfig = {
  images: {
    domains: [
      process.env.NEXT_PUBLIC_URL || "",
      "firebasestorage.googleapis.com",
      "logo.clearbit.com",
    ].filter(Boolean),
  },
};

module.exports = nextConfig;
