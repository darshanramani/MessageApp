import React, { useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Directory } from "../types";
import MessageCard from "../components/MessageCard";
import SearchBar from "../components/SearchBar";
import { colors } from "../theme/colors";

type Props = {
  directory: Directory;
  onBack: () => void;
};

export default function MessagesScreen({ directory, onBack }: Props) {
  const [search, setSearch] = useState("");

  const filteredMessages = useMemo(() => {
    return directory.messages.filter(
      (message) =>
        message.title.toLowerCase().includes(search.toLowerCase()) ||
        message.body.toLowerCase().includes(search.toLowerCase()) ||
        message.priority.toLowerCase().includes(search.toLowerCase())
    );
  }, [directory.messages, search]);

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Pressable onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </Pressable>

        <View style={[styles.directoryIcon, { backgroundColor: directory.color }]}>
          <Ionicons name={directory.icon as any} size={28} color="#FFFFFF" />
        </View>
      </View>

      <Text style={styles.title}>{directory.name} Messages</Text>
      <Text style={styles.description}>{directory.description}</Text>

      <SearchBar
        value={search}
        onChangeText={setSearch}
        placeholder="Search messages..."
      />

      <FlatList
        data={filteredMessages}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Text style={styles.countText}>
            {filteredMessages.length} stored message
            {filteredMessages.length !== 1 ? "s" : ""}
          </Text>
        }
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Ionicons name="mail-open-outline" size={52} color={colors.muted} />
            <Text style={styles.emptyText}>No message found</Text>
          </View>
        }
        renderItem={({ item }) => <MessageCard message={item} />}
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
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  directoryIcon: {
    width: 58,
    height: 58,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    marginTop: 22,
    color: colors.text,
    fontSize: 30,
    fontWeight: "900",
  },
  description: {
    color: colors.muted,
    marginTop: 8,
    marginBottom: 20,
    fontSize: 15,
    lineHeight: 22,
  },
  countText: {
    color: colors.primary,
    fontWeight: "800",
    marginBottom: 14,
    fontSize: 14,
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