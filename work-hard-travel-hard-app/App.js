import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { Fontisto, Ionicons, Feather } from "@expo/vector-icons";
import { theme } from "./colors";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "./styles";

const STORAGE_KEY = "@todo";
const CURRENTTITLE_KEY = '@currenttitle'

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [todo, setTodo] = useState({});
  const [done, setDone] = useState(false);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    loadTodo();
  }, []);

  const travel = async () => {
    setWorking(false);
    setText("");
  };

  const work = () => {
    setWorking(true);
    setText("");
  };

  const saveTodo = async (toSave) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
      setText("");
    } catch (err) {
      console.error(err);
    }
  };

  const loadTodo = async () => {
    const res = await AsyncStorage.getItem(STORAGE_KEY);
    const parsed = JSON.parse(res);
    setTodo(parsed);
  };

  const changeTexthandler = (payload) => setText(payload);

  const addTodo = async () => {
    if (!text) return;
    const newTodo = {
      ...todo,
      [Date.now()]: { text, working, done, isEditing: false, date: new Date().toISOString().split('T')[[0]] }
    };
    setTodo(newTodo);
    await saveTodo(newTodo);
  };

  const deleteTodo = async (id) => {
    Alert.alert("Delete To Do?", "Are you sure?", [
      { text: "Cancel" },
      {
        text: "I'm sure",
        style: "destructive",
        onPress: async () => {
          const newTodo = { ...todo };
          delete newTodo[id];
          setTodo(newTodo);
          await saveTodo(newTodo);
        }
      }
    ]);
    return;
  };

  const checkTodo = async (id) => {
    const newTodo = { ...todo };
    newTodo[id].done = !newTodo[id].done;
    setTodo(newTodo);
    await saveTodo(newTodo);
  };

  const editing = async (id) => {
    const newTodo = { ...todo };
    newTodo[id].isEditing = true;
    setTodo(newTodo);
    await saveTodo(newTodo);
  };

  const changeEditTexthandler = (payload) => setEditText(payload);

  const editTodo = async (id) => {
    const newTodo = { ...todo };
    if (editText) {
      newTodo[id].text = editText;
    }
    newTodo[id].isEditing = false;
    setTodo(newTodo);
    await saveTodo(newTodo);
    setEditText("");
  };

  const deleteAllTodo = async () => {
    const newTodo = { ... todo}
    const test = Object.keys(newTodo).filter(el => newTodo[el].working === working)
    for (t of test) {
      delete newTodo[t]
    }
    setTodo(newTodo);
    await saveTodo(newTodo)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text
            style={{ ...styles.btnText, color: working ? "white" : theme.grey }}
          >
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text
            style={{
              ...styles.btnText,
              color: !working ? "white" : theme.grey
            }}
          >
            Travel
          </Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        placeholder={working ? "Add a To-do" : "Where do you want to go?"}
        onChangeText={changeTexthandler}
        value={text}
        onSubmitEditing={addTodo}
        returnKeyType="done"
      ></TextInput>
      <ScrollView>
        {Object.keys(todo).length > 2 && (<View style={styles.deleteAll}>
          <View style={styles.allButton}>
            <TouchableOpacity onPress={deleteAllTodo}>
              <Text>Delete All</Text>
            </TouchableOpacity>
          </View>
        </View>)}
        {todo &&
          Object.keys(todo)
            .reverse()
            .map((key) =>
              todo[key].working === working ? (
                <View
                  style={styles.todo}
                  key={key}
                >
                  <View style={styles.check}>
                    <TouchableOpacity onPress={() => checkTodo(key)}>
                      <Ionicons
                        name="checkbox"
                        size={20}
                        color={todo[key].done ? theme.grey : "tomato"}
                      />
                    </TouchableOpacity>
                    {!todo[key].isEditing ? (
                      <Text
                        style={{
                          ...styles.todoText,
                          color: todo[key].done ? theme.grey : "white",
                          textDecorationLine: todo[key].done
                            ? "line-through"
                            : "none"
                        }}
                      >
                        {todo[key].text}
                      </Text>
                    ) : (
                      <TextInput
                        style={styles.editInput}
                        placeholder="Type something new"
                        onChangeText={changeEditTexthandler}
                        value={editText}
                        placeholderTextColor={theme.grey}
                      />
                    )}
                  </View>
                  {todo[key].isEditing ? (
                    <View>
                      <TouchableOpacity onPress={() => editTodo(key)}>
                        <Text style={styles.ok}>OK</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View style={styles.icons}>
                      <TouchableOpacity onPress={() => editing(key)}>
                        <Feather
                          name="edit"
                          size={18}
                          color={theme.grey}
                          style={{ marginTop: 1 }}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => deleteTodo(key)}>
                        <Fontisto
                          name="trash"
                          size={18}
                          color={theme.grey}
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              ) : null
            )}
      </ScrollView>
    </View>
  );
}

