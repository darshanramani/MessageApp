import React from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Message } from "../types";
import { colors } from "../theme/colors";

type Props = {
  message: Message;
  onDelete?: () => void;
};

function getPriorityColor(priority: Message["priority"]) {
  if (priority === "High") return colors.danger;
  if (priority === "Medium") return colors.warning;
  return colors.success;
}

export default function MessageCard({ message, onDelete }: Props) {
  const priorityColor = getPriorityColor(message.priority);

  const confirmDelete = () => {
    Alert.alert(
      "Delete Message",
      "Are you sure you want to delete this message?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: onDelete,
        },
      ]
    );
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Ionicons name="mail-unread" size={20} color={colors.primary} />
          <Text style={styles.title}>{message.title}</Text>
        </View>

        <View style={styles.rightSide}>
          <View style={[styles.badge, { backgroundColor: priorityColor }]}>
            <Text style={styles.badgeText}>{message.priority}</Text>
          </View>

          {onDelete && (
            <Pressable onPress={confirmDelete} style={styles.deleteButton}>
              <Ionicons name="trash-outline" size={18} color="#FFFFFF" />
            </Pressable>
          )}
        </View>
      </View>

      <Text style={styles.body}>{message.body}</Text>

      <View style={styles.footer}>
        <Ionicons name="calendar-outline" size={16} color={colors.muted} />
        <Text style={styles.date}>{message.date}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 22,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: "800",
    color: colors.text,
    marginLeft: 8,
    flexShrink: 1,
  },
  rightSide: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  body: {
    marginTop: 12,
    fontSize: 14,
    color: colors.muted,
    lineHeight: 21,
  },
  badge: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "800",
  },
  deleteButton: {
    width: 32,
    height: 32,
    borderRadius: 12,
    backgroundColor: colors.danger,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    marginTop: 14,
    flexDirection: "row",
    alignItems: "center",
  },
  date: {
    marginLeft: 6,
    color: colors.muted,
    fontSize: 13,
    fontWeight: "600",
  },
});