import * as ImagePicker from 'expo-image-picker';
import { Platform } from 'react-native';

export const requestCameraPermission = async (): Promise<boolean> => {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  return status === 'granted';
};

export const requestMediaLibraryPermission = async (): Promise<boolean> => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  return status === 'granted';
};

export const takePhoto = async (): Promise<string | null> => {
  try {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      throw new Error('Camera permission not granted');
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      return result.assets[0].uri;
    }
    return null;
  } catch (error) {
    console.error('Error taking photo:', error);
    return null;
  }
};

export const pickImage = async (): Promise<string | null> => {
  try {
    const hasPermission = await requestMediaLibraryPermission();
    if (!hasPermission) {
      throw new Error('Media library permission not granted');
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      return result.assets[0].uri;
    }
    return null;
  } catch (error) {
    console.error('Error picking image:', error);
    return null;
  }
};

export const imageToBase64 = async (uri: string): Promise<string | null> => {
  // This is a simplified version for the mock
  // In a real app, you would use FileSystem to read the file and convert it to base64
  return uri;
};