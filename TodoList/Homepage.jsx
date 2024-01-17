import { StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";
import { Alert } from "react-native";
import React, { useState } from "react";
import {
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
export default function Homepage() {
  const [data, setData] = useState("");
  const [list, setList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddTodo = () => {
    if (data !== "") {
      if (editingIndex !== null) {
        // If we're editing an item, replace the title of the current item being edited
        setList((prevList) => {
          const newList = [...prevList];
          newList[editingIndex].title = data;
          return newList;
        });
        setEditingIndex(null); // Reset editing index to null after editing
      } else {
        // If we're not editing an item, add a new item to the list
        setList((prevList) => [
          ...prevList,
          { id: Date.now().toString(), title: data },
        ]);
      }
      setData(""); // Clear the input field
    }
  };
  // const handledelete = (index) => {
  //   const newList = [...list];
  //   newList.splice(index, 1);
  //   return newList;
  // };
  const handledelete = (index) => {
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => {
          const newList = [...list];
          newList.splice(index, 1);
          setList(newList);
        },
      },
    ]);
  };
  const handleEdit = (index) => {
    if (list[index]) {
      setEditingIndex(index);
      setData(list[index].title);
    } else {
      console.error(`Item at index ${index} does not exist.`);
    }
  };

  const renderItem = ({ item, index }) => (
    <View index={index} style={styles.item}>
      <Text style={styles.title}>{index}</Text>
      <Text style={styles.title}>{item.title}</Text>
      <View style={styles.icons}>
        <IconButton
          icon="pencil"
          iconColor="white"
          onPress={() => handleEdit(index)}
        />
        <IconButton
          icon="delete"
          iconColor="white"
          onPress={() => handledelete(index)}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Add a Task"
        value={data}
        onChangeText={setData}
      />

      <TouchableOpacity style={styles.button} onPress={handleAddTodo}>
        <Text style={styles.buttonText}>
          {editingIndex !== null ? "Edit" : "Add"}
        </Text>
      </TouchableOpacity>
      <FlatList
        data={list}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginHorizontal: 16, paddingTop: 50 },
  input: { borderColor: "blue", borderWidth: 2, padding: 10 },
  button: { backgroundColor: "black", marginTop: 20, borderRadius: 10 },
  buttonText: { color: "white", padding: 10, textAlign: "center" },
  item: {
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    backgroundColor: "#6200ee",
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: { fontSize: 25, color: "white" },
  icons: { display: "flex", flexDirection: "row", marginLeft: "auto" },
});
