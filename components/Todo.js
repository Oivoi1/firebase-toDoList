import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, Alert, ScrollView,Pressable } from 'react-native';
import { child, onValue, push, query, ref, update, } from 'firebase/database';
import { db, TODOS_REF, USERS_REF } from './firebase/Config';
import { TodoItem } from './components/TodoItem';
import { MaterialIcons } from "@expo/vector-icons";
import { logout } from "./Auth";
import styles from './style/style';

export default Todo = ({navigation, route}) => {
  
  const [userKey, setUserKey] = useState('');
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    setUserKey(route.params.userUid);
    const userRef = query(ref(db, USERS_REF + route.params.userUid))
    onValue(userRef, (snapshot) => {
        snapshot.val()
        ? setNickname(snapshot.val().nickname)
        : setNickname("")
    })
    const todoItemsRef = ref(db, TODOS_REF);
    onValue(todoItemsRef, (snapshot) => {
      const data = snapshot.val() ? snapshot.val() : {};
      const todoItems = {...data};
      setTodos(todoItems);
    });
  }, []);

  const addNewTodo = () => {
    if (newTodo.trim() !== "") {
      const newTodoItem = {
        done: false,
        todoItem: newTodo
      };
      const newTodoItemKey = push(child(ref(db), TODOS_REF)).key;
      const updates = {};
      updates[TODOS_REF + newTodoItemKey] = newTodoItem;
      setNewTodo('');
      return update(ref(db), updates);
    }
  }

  const removeTodos = () => {
    remove(ref(db), TODOS_REF);
  }

  const createTwoButtonAlert = () => Alert.alert(
    "Todolist", "Remove all items?", [{
      text: "Cancel",
      onPress: () => console.log("Cancel Pressed"),
      style: "cancel"
    },
    { 
      text: "OK", onPress: () => removeTodos()
    }],
    { cancelable: false }
  );

  let todosKeys = Object.keys(todos);
  
  return (
    <View style={styles.container}
      contentContainerStyle={styles.contentContainerStyle}>
      <Text style={styles.header}>Todolist ({todosKeys.length})</Text>
      <View style={styles.newItem}>
        <TextInput
          placeholder='Add new todo'
          value={newTodo}
          style={styles.textInput}
          onChangeText={setNewTodo}
        />
      </View>
      <View style={styles.buttonStyle}>
        <Button 
          title="Add new Todo item"
          onPress={() => addNewTodo()}
        />
      </View>
      <ScrollView>
        {todosKeys.length > 0 ? (
          todosKeys.map(key => (
          <TodoItem
            key={key}
            todoItem={todos[key]}
            id={key}
          />
        ))
        ) : (
          <Text style={styles.infoText}>There are no items</Text>
        )}
        <View style={styles.buttonStyle}>
          <Button 
            title="Remove all todos" 
            onPress={() => createTwoButtonAlert()} />
        </View>
      </ScrollView>
    </View>
  );
}