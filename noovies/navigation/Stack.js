import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, TouchableOpacity } from "react-native";
import { YELLOW_COLOR } from "../colors";

const NativeStack = createNativeStackNavigator();

const Screen1 = ({ navigation: { navigate } }) => (
  <TouchableOpacity onPress={() => navigate("Two")}>
    <Text>Go to Two</Text>
  </TouchableOpacity>
);
const Screen2 = ({ navigation: { navigate } }) => (
  <TouchableOpacity onPress={() => navigate("Three")}>
    <Text>Go to Three</Text>
  </TouchableOpacity>
);
const Screen3 = ({ navigation: { navigate } }) => (
  <TouchableOpacity onPress={() => navigate("Tabs", { screen: "Search" })}>
    <Text>Change title</Text>
  </TouchableOpacity>
);

const Stack = () => {
  return (
    <NativeStack.Navigator
      screenOptions={{
        headerBackTitleVisible: YELLOW_COLOR,
      }}
    >
      <NativeStack.Screen name="One" component={Screen1} />
      <NativeStack.Screen name="Two" component={Screen2} />
      <NativeStack.Screen name="Three" component={Screen3} />
    </NativeStack.Navigator>
  );
};

export default Stack;
