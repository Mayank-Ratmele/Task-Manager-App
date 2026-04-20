import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";
import { io } from "socket.io-client";

import API from "../src/services/api";
import { AuthContext } from "../src/context/AuthContext";

const socket = io("http://192.168.29.140:5000");

export default function Tasks() {
  const { token, logout } = useContext(AuthContext);
  const [tasks, setTasks] = useState<any[]>([]);

  const fetchTasks = async () => {
    const res = await API.get("/tasks", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTasks(res.data);
  };

  const deleteTask = async (id: string) => {
    await API.delete(`/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchTasks();
  };

  const handleLogout = async () => {
    await logout();
    router.replace("/");
  };

  useEffect(() => {
    fetchTasks();

    socket.on("taskCreated", () => {
      Alert.alert("New Task Added");
      fetchTasks();
    });

    socket.on("taskUpdated", () => {
      Alert.alert("Task Updated");
      fetchTasks();
    });

    return () => {
      socket.off("taskCreated");
      socket.off("taskUpdated");
    };
  }, []);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Button title="Add Task" onPress={() => router.push("/add-task" as any)} />
      <Button title="Logout" onPress={handleLogout} />

      <FlatList
        data={tasks}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/update-task" as any,
                params: {
                  id: item._id,
                  title: item.title,
                  status: item.status,
                },
              })
            }
          >
            <View style={styles.card}>
              <Text style={styles.title}>{item.title}</Text>
              <Text>{item.description}</Text>
              <Text>Status: {item.status}</Text>

              <Button title="Delete" onPress={() => deleteTask(item._id)} />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});