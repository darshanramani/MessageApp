import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme/colors";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
};

export default function SearchBar({ value, onChangeText, placeholder }: Props) {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={20} color={colors.muted} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 18,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: colors.text,
    fontSize: 15,
  },
});