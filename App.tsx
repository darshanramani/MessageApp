import React, { useState } from "react";
import { StatusBar, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import HomeScreen from "./src/screens/HomeScreen";
import MessagesScreen from "./src/screens/MessagesScreen";
import { Directory, Message } from "./src/types";
import { directories as initialDirectories } from "./src/data/directories";

export default function App() {
  const [directories, setDirectories] = useState<Directory[]>(initialDirectories);
  const [selectedDirectory, setSelectedDirectory] = useState<Directory | null>(null);

  const handleAddMessage = (directoryId: string, newMessage: Message) => {
    const updatedDirectories = directories.map((directory) =>
      directory.id === directoryId
        ? { ...directory, messages: [newMessage, ...directory.messages] }
        : directory
    );

    setDirectories(updatedDirectories);

    const updatedSelected = updatedDirectories.find(
      (directory) => directory.id === directoryId
    );

    if (updatedSelected) {
      setSelectedDirectory(updatedSelected);
    }
  };

  const handleDeleteMessage = (directoryId: string, messageId: string) => {
    const updatedDirectories = directories.map((directory) =>
      directory.id === directoryId
        ? {
            ...directory,
            messages: directory.messages.filter(
              (message) => message.id !== messageId
            ),
          }
        : directory
    );

    setDirectories(updatedDirectories);

    const updatedSelected = updatedDirectories.find(
      (directory) => directory.id === directoryId
    );

    if (updatedSelected) {
      setSelectedDirectory(updatedSelected);
    }
  };

  return (
    <LinearGradient colors={["#EEF4FF", "#FDFBFF"]} style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#EEF4FF" />

      <SafeAreaView style={styles.safeArea}>
        {selectedDirectory ? (
          <MessagesScreen
            directory={selectedDirectory}
            onBack={() => setSelectedDirectory(null)}
            onAddMessage={handleAddMessage}
            onDeleteMessage={handleDeleteMessage}
          />
        ) : (
          <HomeScreen
            directories={directories}
            onSelectDirectory={setSelectedDirectory}
          />
        )}
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
});