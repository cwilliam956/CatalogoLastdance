import { ConfigContext, ExpoConfig } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
    ...config,
    name: "techfinance",
    slug: "techfinance",
    scheme: "techfinance",
    version: "1.0.0",
    orientation: "portrait",
    owner: "techfinance",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
        image: "./assets/splash.png",
        resizeMode: "contain",
        backgroundColor: "#ffffff"
    },
    ios: {
        supportsTablet: true,
        bundleIdentifier: "com.techfinance.app",
        infoPlist: {
            NSPhotoLibraryUsageDescription: "Allow $(PRODUCT_NAME) to access your photos to upload product images.",
            NSCameraUsageDescription: "Allow $(PRODUCT_NAME) to access your camera to take product photos."
        }
    },
    android: {
        adaptiveIcon: {
            foregroundImage: "./assets/adaptive-icon.png",
            backgroundColor: "#ffffff"
        },
        package: "br.com.techfinance.app",
        permissions: [
            "android.permission.READ_EXTERNAL_STORAGE",
            "android.permission.WRITE_EXTERNAL_STORAGE",
            "android.permission.CAMERA"
        ]
    },
    web: {
        favicon: "./assets/favicon.png"
    },
    plugins: [
        "expo-router",
        [
            "expo-image-picker",
            {
                "photosPermission": "Allow $(PRODUCT_NAME) to access your photos to upload product images.",
                "cameraPermission": "Allow $(PRODUCT_NAME) to access your camera to take product photos."
            }
        ]
    ],
    extra: {
        geminiApiKey: process.env.GEMINI_API_KEY,
        supabaseUrl: process.env.SUPABASE_URL,
        supabaseKey: process.env.SUPABASE_ANON_KEY
    },
});
