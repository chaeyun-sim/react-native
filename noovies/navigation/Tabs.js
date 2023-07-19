import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from "../screen/Movies";
import Tv from "../screen/Tv";
import Search from "../screen/Search";
import { BLACK_COLOR, DARK_GREY, LIGHT_GREY, YELLOW_COLOR } from "../colors";
import { useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const isDark = useColorScheme() === "dark";
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgrounColor: isDark ? BLACK_COLOR : "white"
        },
        tabBarActiveTintColor: isDark ? YELLOW_COLOR : BLACK_COLOR,
        tabBarInactiveTintColor: isDark ? DARK_GREY : LIGHT_GREY,
        headerStyle: {
          backgroundColor: isDark ? BLACK_COLOR : "white"
        },
        headerTitleStyle: {
          color: isDark ? "white" : BLACK_COLOR
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "600"
        }
      }}
    >
      <Tab.Screen
        name="Movies"
        component={Movies}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            console.log(focused, color, size);
            return (
              <Ionicons
                name="film-outline"
                color={color}
                size={size}
              />
            );
          }
        }}
      />
      <Tab.Screen
        name="TV"
        component={Tv}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            console.log(focused, color, size);
            return (
              <Ionicons
                name="tv-outline"
                color={color}
                size={size}
              />
            );
          }
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            console.log(focused, color, size);
            return (
              <Ionicons
                name="search-outline"
                color={color}
                size={size}
              />
            );
          }
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
