import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Directory } from "../types";
import { colors } from "../theme/colors";

type Props = {
  directory: Directory;
  onPress: () => void;
};

export default function DirectoryCard({ directory, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
    >
      <View style={[styles.iconBox, { backgroundColor: directory.color }]}>
        <Ionicons name={directory.icon as any} size={28} color="#FFFFFF" />
      </View>

      <Text style={styles.title}>{directory.name}</Text>
      <Text style={styles.description} numberOfLines={2}>
        {directory.description}
      </Text>

      <View style={styles.footer}>
        <Text style={styles.messageCount}>
          {directory.messages.length} messages
        </Text>
        <Ionicons name="chevron-forward" size={18} color={colors.muted} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 10,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: "0px 4px 12px rgba(0,0,0,0.08)",
      } as any,
    }),
  },
  cardPressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.85,
  },
  iconBox: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.text,
    marginBottom: 6,
  },
  description: {
    fontSize: 13,
    color: colors.muted,
    lineHeight: 18,
    minHeight: 38,
  },
  footer: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  messageCount: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.primary,
  },
});