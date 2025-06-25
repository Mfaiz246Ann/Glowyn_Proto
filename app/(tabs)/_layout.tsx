import React from "react";
import { Tabs } from "expo-router";
import { Home, ShoppingBag, Camera, Search, User } from "lucide-react-native";
import colors from "@/constants/colors";
import layout from "@/constants/layout";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textLight,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 4,
        },
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Home size={layout.iconSize.m} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="shop"
        options={{
          title: "Shop",
          tabBarIcon: ({ color, size }) => (
            <ShoppingBag size={layout.iconSize.m} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="analyze"
        options={{
          title: "Analyze",
          tabBarIcon: ({ color, size }) => (
            <Camera size={layout.iconSize.m} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="style-feed"
        options={{
          title: "Style Feed",
          tabBarIcon: ({ color, size }) => (
            <Search size={layout.iconSize.m} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <User size={layout.iconSize.m} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}