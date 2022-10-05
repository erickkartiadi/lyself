import 'dotenv/config';

export default {
  expo: {
    name: 'lyself',
    slug: 'lyself',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'automatic',
    scheme: 'lyself',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    primaryColor: '#F55C7A',
    platforms: ['android'],
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      buildNumber: '1.0.0',
      bundleIdentifier: 'com.erickkartiadi.lyself',
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#FFFFFF',
      },
      package: 'com.erickkartiadi.lyself',
    },
    web: {
      favicon: './assets/favicon.png',
    },
    plugins: [
      [
        './utils/plugins/withAndroidColorEdgeEffect',
        {
          color: '#F55C7A',
        },
      ],
    ],
    extra: {
      mode: 'development',
      redirectUri: process.env.REDIRECT_URI,

      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.FIREBASE_APP_ID,
      firebaseMeasurementId: process.env.FIREBASE_MEASUREMENT_ID,

      spotifyClientId: process.env.SPOTIFY_CLIENT_ID,
      spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      spotifyTokenKey: process.env.SPOTIFY_TOKEN_KEY,
      spotifyRefreshTokenKey: process.env.SPOTIFY_REFRESH_TOKEN_KEY,
      spotifyExpiresTimeKey: process.env.SPOTIFY_EXPIRES_TIME_KEY,

      newsApiKey: process.env.NEWS_API_KEY,

      apiBaseUrl: process.env.API_BASE_URL,
      userTokenKey: process.env.USER_TOKEN_KEY,

      eas: {
        projectId: '78d64a9e-b2e7-4f52-9684-5009b95981e7',
      },
    },
  },
};
