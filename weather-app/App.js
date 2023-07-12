import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import * as Location from "expo-location";
import { Fontisto } from "@expo/vector-icons";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const API_KEY = "784ab24ff2ed5d94d4288abed9e25d13";

const icons = {
  Clear: "day-sunny",
  Clouds: "cloudy",
  Rain: "rain",
  Atmosphere: "cloudy-gusts",
  Snow: "snow",
  Drizzle: "day-rain",
  Thunderstorm: "lightning"
};

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState([]);
  const [location, setLocation] = useState(null);
  const [ok, setOk] = useState(true);

  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }
    const {
      coords: { latitude, longitude }
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    const location = await Location.reverseGeocodeAsync(
      {
        latitude,
        longitude
      },
      { useGoogleMaps: false }
    );
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    );
    const json = await response.json();
    setCity(json.city.name);
    setDays(
      json.list.filter((weather) => {
        if (weather.dt_txt.includes("00:00:00")) {
          return weather;
        }
      })
    );
  };

  const icons = {
    Clear: "day-sunny",
    Clouds: "cloudy",
    Rain: "rain",
    Atmosphere: "cloudy-gusts",
    Snow: "snow",
    Drizzle: "day-rain",
    Thunderstorm: "lightning"
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView
        showsHorizontalScrollIndicator="false"
        pagingEnabled
        horizontal
        contentContainerStyle={styles.weather}
      >
        {days.length === 0 ? (
          <View style={styles.day}>
            <ActivityIndicator
              size="large"
              color="white"
              style={{ marginTop: 10 }}
            />
          </View>
        ) : (
          days.map((day, index) => (
            <>
              <View
                style={styles.day}
                key={index}
              >
                <View
                  style={{
                    width: "100%",
                    marginBottom: 50
                  }}
                >
                  <Text style={styles.time}>
                    {new Date(day.dt * 1000)
                      .toISOString()
                      .substring(0, 10)
                      .replaceAll("-", " ")}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    paddingRight: 20
                  }}
                >
                  <Text style={styles.temp}>{day.main.temp.toFixed(1)}</Text>
                  <Fontisto
                    name={icons[day.weather[0].main]}
                    size={68}
                    color="white"
                  />
                </View>
                <Text style={styles.desc}>{day.weather[0].main}</Text>
                <Text style={styles.tinyDesc}>
                  {day.weather[0].description}
                </Text>
              </View>
            </>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "tomato",
    paddingTop: 40
  },
  city: {
    flex: 1.2,
    justifyContent: "center",
    alignItems: "center"
  },
  cityName: {
    fontSize: 50,
    fontWeight: 500,
    color: "white"
  },
  time: {
    fontSize: 20,
    color: "white",
    width: "100%",
    textAlign: "center",
    position: "absolute",
    paddingTop: 10,
  },
  weather: {},
  day: {
    width: SCREEN_WIDTH,
    flex: 1,
    paddingLeft: 10,
    paddingTop: 20
  },
  temp: {
    fontSize: 90,
    marginTop: 50,
    fontWeight: 600,
    marginBottom: 20,
    color: "white"
  },
  desc: {
    marginTop: -30,
    fontSize: 30,
    color: "white"
  },
  tinyDesc: {
    fontSize: 20,
    color: "white"
  }
});
