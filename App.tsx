import React, { useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import HomeScreen from "./src/screens/HomeScreen";
import MessagesScreen from "./src/screens/MessagesScreen";
import { Directory } from "./src/types";

export default function App() {
  const [selectedDirectory, setSelectedDirectory] = useState<Directory | null>(null);

  return (
    <LinearGradient colors={["#EEF4FF", "#FDFBFF"]} style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#EEF4FF" />

      <SafeAreaView style={styles.safeArea}>
        {selectedDirectory ? (
          <MessagesScreen
            directory={selectedDirectory}
            onBack={() => setSelectedDirectory(null)}
          />
        ) : (
          <HomeScreen onSelectDirectory={setSelectedDirectory} />
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