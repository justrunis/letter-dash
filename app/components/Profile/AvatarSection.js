import React from "react";
import { View, Text, Image, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DEFAULT_AVATAR_IMAGE } from "../../constants/constants";

const AvatarSection = ({
  username,
  editing,
  setUsername,
  onEdit,
  onCancel,
  onSave,
}) => (
  <View style={styles.container}>
    <Image
      source={{
        uri: DEFAULT_AVATAR_IMAGE,
      }}
      style={styles.avatar}
    />
    <View style={styles.usernameContainer}>
      {editing ? (
        <TextInput
          style={styles.usernameInput}
          value={username}
          onChangeText={setUsername}
          autoFocus
        />
      ) : (
        <Text style={styles.username}>{username}</Text>
      )}
      <View style={styles.iconContainer}>
        {editing ? (
          <>
            <Ionicons
              name="close"
              size={24}
              color="black"
              onPress={onCancel}
              style={styles.icon}
            />
            <Ionicons
              name="checkmark"
              size={24}
              color="black"
              onPress={onSave}
              style={styles.icon}
            />
          </>
        ) : (
          <Ionicons
            name="pencil"
            size={24}
            color="black"
            onPress={onEdit}
            style={styles.icon}
          />
        )}
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  usernameContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "40%",
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
  },
  usernameInput: {
    fontSize: 24,
    fontWeight: "bold",
    borderBottomWidth: 1,
    width: "100%",
    textAlign: "center",
  },
  iconContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  icon: {
    padding: 5,
  },
});

export default AvatarSection;
