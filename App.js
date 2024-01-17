import React, { useState } from "react";
import {
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import Homepage from "./TodoList/Homepage";

export default function App() {
  return (
    <View>
      <Homepage />
    </View>
  );
}
