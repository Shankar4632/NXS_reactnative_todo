import { StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";
import { Alert } from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import axios from "axios";
export default function Demo() {
  const [data, setData] = useState("");
  const [list, setList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddTodo = async (data) => {
    if (data.title !== "") {
      if (
        editingIndex !== null &&
        editingIndex >= 0 &&
        editingIndex < list.length
      ) {
        setList((prevList) => {
          const newList = [...prevList];
          newList[editingIndex].title = data.title;
          return newList;
        });
        setEditingIndex(null);
      } else {
        // Adding a new task
        setList((prevList) => [
          ...prevList,
          { id: Date.now().toString(), title: data.title },
        ]);

        // Clear the input field
        setData("");

        // Retrieve authentication data from AsyncStorage
        try {
          const authData = await AsyncStorage.getItem("user");
          const auth = authData ? JSON.parse(authData) : null;

          // Check if the authentication data contains a valid token
          if (auth && auth.token) {
            // Send data to the WordPress server
            axios
              .post(
                "https://nxsinfotech.com/server/wp-json/wp/v2/posts",
                {
                  title: data.title,
                  // Add other fields as needed for your WordPress API
                },
                {
                  headers: {
                    Authorization: `Bearer ${auth.token}`,
                    // Add other headers as needed for your WordPress API
                  },
                }
              )
              .then((res) => {
                console.log("Post added successfully:", res);
                // You might want to display a success message here
              })
              .catch((err) => {
                console.error("Error adding post:", err.message);
                console.log("Full error response:", err.response);
                // Display an alert or handle the error in a user-friendly way
              });
          } else {
            console.error("Invalid or missing authentication data.");
            // Display an alert or handle the error in a user-friendly way
          }
        } catch (error) {
          console.error("Error retrieving authentication data:", error.message);
          // Display an alert or handle the error in a user-friendly way
        }
      }
    } else {
      // Handle the case where data.title is empty
      console.error("Title cannot be empty.");
      // You might want to display an alert or handle it in a user-friendly way
    }
  };

  // const handleAddTodo = () => {
  //   if (data !== "") {
  //     if (editingIndex !== null) {

  //       setList((prevList) => {
  //         const newList = [...prevList];
  //         newList[editingIndex].title = data;
  //         return newList;
  //       });
  //       setEditingIndex(null);
  //     } else {

  //       setList((prevList) => [
  //         ...prevList,
  //         { id: Date.now().toString(), title: data },
  //       ]);
  //     }
  //     setData("");
  //   }
  // };
  // const handlesubmit=()=>
  // {
  //   axios.post(`https://nxsinfotech.com/server/wp-json/wp/v2/posts`,{
  //     title:"my new post"
  //   },{
  //     "Authorization":`Baarer ${data.token}`
  //   }).then((res)=>{
  //     console.log("res",res);
  //   }).catch((err)=>{
  //     console.log("err",err.message);
  //   })
  // }
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
