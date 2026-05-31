import React, { useMemo, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DirectoryCard from "../components/DirectoryCard";
import SearchBar from "../components/SearchBar";
import { directories } from "../data/directories";
import { Directory } from "../types";
import { colors } from "../theme/colors";

type Props = {
  onSelectDirectory: (directory: Directory) => void;
};

export default function HomeScreen({ onSelectDirectory }: Props) {
  const [search, setSearch] = useState("");
  const { width } = useWindowDimensions();

  const filteredDirectories = useMemo(() => {
    return directories.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.smallTitle}>CS5450 Mobile Programming</Text>
          <Text style={styles.mainTitle}>Messages Directory</Text>
        </View>

        <View style={styles.headerIcon}>
          <Ionicons name="chatbox-ellipses" size={28} color="#FFFFFF" />
        </View>
      </View>

      <Text style={styles.subtitle}>
        Select an important directory to view stored messages.
      </Text>

      <SearchBar
        value={search}
        onChangeText={setSearch}
        placeholder="Search directory..."
      />

      <FlatList
        data={filteredDirectories}
        key={width > 700 ? "tablet" : "phone"}
        numColumns={2}
        columnWrapperStyle={styles.row}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Ionicons name="folder-open-outline" size={52} color={colors.muted} />
            <Text style={styles.emptyText}>No directory found</Text>
          </View>
        }
        renderItem={({ item }) => (
          <DirectoryCard
            directory={item}
            onPress={() => onSelectDirectory(item)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 22,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  smallTitle: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  mainTitle: {
    color: colors.text,
    fontSize: 30,
    fontWeight: "900",
    marginTop: 4,
  },
  subtitle: {
    color: colors.muted,
    marginTop: 10,
    marginBottom: 20,
    fontSize: 15,
    lineHeight: 22,
  },
  headerIcon: {
    width: 58,
    height: 58,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    justifyContent: "space-between",
  },
  emptyBox: {
    marginTop: 80,
    alignItems: "center",
  },
  emptyText: {
    marginTop: 10,
    fontSize: 16,
    color: colors.muted,
    fontWeight: "700",
  },
});