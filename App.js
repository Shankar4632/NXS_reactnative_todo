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
import Demo from "./TodoList/Demo";

export default function App() {
  return (
    <View>
      <Homepage />
      {/* <Demo /> */}
    </View>
  );
}
