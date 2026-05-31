import React, { useMemo, useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Directory, Message } from "../types";
import MessageCard from "../components/MessageCard";
import SearchBar from "../components/SearchBar";
import { colors } from "../theme/colors";

type Props = {
  directory: Directory;
  onBack: () => void;
  onAddMessage: (directoryId: string, message: Message) => void;
  onDeleteMessage: (directoryId: string, messageId: string) => void;
};

export default function MessagesScreen({
  directory,
  onBack,
  onAddMessage,
  onDeleteMessage,
}: Props) {
  const [search, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [priority, setPriority] = useState<Message["priority"]>("Medium");

  const filteredMessages = useMemo(() => {
    return directory.messages.filter(
      (message) =>
        message.title.toLowerCase().includes(search.toLowerCase()) ||
        message.body.toLowerCase().includes(search.toLowerCase()) ||
        message.priority.toLowerCase().includes(search.toLowerCase())
    );
  }, [directory.messages, search]);

  const handleSave = () => {
    if (!title.trim() || !body.trim()) {
      Alert.alert("Missing Details", "Please enter both title and message.");
      return;
    }

    const newMessage: Message = {
      id: Date.now().toString(),
      title: title.trim(),
      body: body.trim(),
      date: "Today",
      priority,
    };

    onAddMessage(directory.id, newMessage);

    setTitle("");
    setBody("");
    setPriority("Medium");
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Pressable onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </Pressable>

        <Pressable
          onPress={() => setModalVisible(true)}
          style={styles.addButton}
        >
          <Ionicons name="add" size={24} color="#FFFFFF" />
          <Text style={styles.addButtonText}>Add</Text>
        </Pressable>
      </View>

      <View style={[styles.directoryIcon, { backgroundColor: directory.color }]}>
        <Ionicons name={directory.icon as any} size={30} color="#FFFFFF" />
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
        renderItem={({ item }) => (
          <MessageCard
            message={item}
            onDelete={() => onDeleteMessage(directory.id, item.id)}
          />
        )}
      />

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Add New Message</Text>

            <TextInput
              style={styles.input}
              placeholder="Message title"
              placeholderTextColor={colors.muted}
              value={title}
              onChangeText={setTitle}
            />

            <TextInput
              style={[styles.input, styles.messageInput]}
              placeholder="Write your message"
              placeholderTextColor={colors.muted}
              value={body}
              onChangeText={setBody}
              multiline
            />

            <Text style={styles.priorityTitle}>Priority</Text>

            <View style={styles.priorityRow}>
              {(["High", "Medium", "Low"] as Message["priority"][]).map(
                (item) => (
                  <Pressable
                    key={item}
                    onPress={() => setPriority(item)}
                    style={[
                      styles.priorityButton,
                      priority === item && styles.priorityButtonActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.priorityText,
                        priority === item && styles.priorityTextActive,
                      ]}
                    >
                      {item}
                    </Text>
                  </Pressable>
                )
              )}
            </View>

            <View style={styles.modalActions}>
              <Pressable
                onPress={() => setModalVisible(false)}
                style={styles.cancelButton}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </Pressable>

              <Pressable onPress={handleSave} style={styles.saveButton}>
                <Text style={styles.saveText}>Save Message</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
  addButton: {
    height: 48,
    paddingHorizontal: 18,
    borderRadius: 16,
    backgroundColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontWeight: "800",
  },
  directoryIcon: {
    width: 62,
    height: 62,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  title: {
    marginTop: 18,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.45)",
    justifyContent: "flex-end",
  },
  modalBox: {
    backgroundColor: "#FFFFFF",
    padding: 22,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: colors.text,
    marginBottom: 18,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: 14,
    fontSize: 15,
    color: colors.text,
    marginBottom: 12,
  },
  messageInput: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  priorityTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: colors.text,
    marginBottom: 10,
  },
  priorityRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 20,
  },
  priorityButton: {
    flex: 1,
    paddingVertical: 11,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
  },
  priorityButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  priorityText: {
    color: colors.muted,
    fontWeight: "800",
  },
  priorityTextActive: {
    color: "#FFFFFF",
  },
  modalActions: {
    flexDirection: "row",
    gap: 10,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
  },
  cancelText: {
    color: colors.text,
    fontWeight: "800",
  },
  saveButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: "center",
  },
  saveText: {
    color: "#FFFFFF",
    fontWeight: "900",
  },
});