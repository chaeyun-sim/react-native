import react from "react";
import { Text, TouchableOpacity, View } from "react-native";

const Movies = ({ navigation: { navigate } }) => {
  return (
    <TouchableOpacity
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      onPress={() => navigate("Stack", { screen: "Three" })}
    >
      <Text>Movies</Text>
    </TouchableOpacity>
  );
};

export default Movies;
