import React, { useContext, useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { router } from "expo-router";

import API from "../src/services/api";
import { AuthContext } from "../src/context/AuthContext";

export default function AddTask() {
  const { token } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");

  const saveTask = async () => {
    try {
      await API.post(
        "/tasks",
        {
          title,
          description,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Alert.alert("Success", "Task Added Successfully");
      router.back();
    } catch (error) {
      Alert.alert("Error", "Failed to add task");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Title"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        placeholder="Description"
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />

      <Text style={styles.label}>Select Status</Text>

      <View style={styles.statusContainer}>
        {["Pending", "In Progress", "Completed"].map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.statusButton,
              status === item && styles.activeStatus,
            ]}
            onPress={() => setStatus(item)}
          >
            <Text
              style={[
                styles.statusText,
                status === item && styles.activeText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Button title="Save Task" onPress={saveTask} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 80,
    gap: 12,
  },

  input: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
  },

  statusContainer: {
    gap: 10,
  },

  statusButton: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
  },

  activeStatus: {
    backgroundColor: "#007BFF",
    borderColor: "#007BFF",
  },

  statusText: {
    textAlign: "center",
  },

  activeText: {
    color: "#fff",
    fontWeight: "bold",
  },
});