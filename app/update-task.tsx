import React, { useContext } from "react";
import { View, Button } from "react-native";
import { useLocalSearchParams, router } from "expo-router";

import API from "../src/services/api";
import { AuthContext } from "../src/context/AuthContext";

export default function UpdateTask() {
  const { token } = useContext(AuthContext);
  const { id } = useLocalSearchParams();

  const updateStatus = async (status: string) => {
    await API.put(
      `/tasks/${id}`,
      { status },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    router.back();
  };

  return (
    <View style={{ padding: 20, marginTop: 80, gap: 12 }}>
      <Button title="Pending" onPress={() => updateStatus("Pending")} />
      <Button title="In Progress" onPress={() => updateStatus("In Progress")} />
      <Button title="Completed" onPress={() => updateStatus("Completed")} />
    </View>
  );
}