import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import colors from "@/constants/colors";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) {
      console.error(error);
      throw error;
    }
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <>
      <StatusBar style="dark" backgroundColor={colors.background} />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          contentStyle: {
            backgroundColor: colors.background,
          },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen 
          name="color-analysis" 
          options={{ 
            title: "Color Analysis",
            presentation: "card",
          }} 
        />
        <Stack.Screen 
          name="face-shape" 
          options={{ 
            title: "Face Shape Analysis",
            presentation: "card",
          }} 
        />
        <Stack.Screen 
          name="skin-analysis" 
          options={{ 
            title: "Skin Analysis",
            presentation: "card",
          }} 
        />
        <Stack.Screen 
          name="style-analysis" 
          options={{ 
            title: "Style Analysis",
            presentation: "card",
          }} 
        />
        <Stack.Screen 
          name="virtual-try-on" 
          options={{ 
            title: "Virtual Try-On",
            presentation: "card",
          }} 
        />
        <Stack.Screen 
          name="product/[id]" 
          options={{ 
            title: "Product Details",
            presentation: "card",
          }} 
        />
        <Stack.Screen 
          name="post/[id]" 
          options={{ 
            title: "Post",
            presentation: "card",
          }} 
        />
        <Stack.Screen 
          name="collection/[id]" 
          options={{ 
            title: "Collection",
            presentation: "card",
          }} 
        />
        <Stack.Screen 
          name="category/[id]" 
          options={{ 
            title: "Category",
            presentation: "card",
          }} 
        />
        <Stack.Screen 
          name="user/[id]" 
          options={{ 
            title: "Profile",
            presentation: "card",
          }} 
        />
      </Stack>
    </>
  );
}