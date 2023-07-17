import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useAssets } from "expo-asset";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

// const loadFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));
// const loadImages = (images) =>
//   images.map((image) => {
//     if (typeof image === "string") {
//       return Image.prefetch(image);
//     } else {
//       return Asset.loadAsync(image);
//     }
//   });

// export default function App() {
//   const [ready, setReady] = useState(false);

//   SplashScreen.preventAutoHideAsync();

//   useEffect(() => {
//     async function prepare() {
//       try {
//         const fonts = loadFonts([Ionicons.font]);
//         const images = loadImages([
//           require("./logo.jpg"),
//           "https://reactnative.dev/img/showcase/adsmanager.png"
//         ]);
//         await Promise.all([...fonts, ...images]);
//       } catch (e) {
//         console.error(e);
//       } finally {
//         setReady(true);
//       }
//     }

//     prepare();
//   }, []);

//   const onLayoutRootView = useCallback(async () => {
//     if (appIsReady) {
//       await SplashScreen.hideAsync();
//     }
//   }, [ready]);

//   if (!ready) {
//     return null;
//   }

//   return (
//     <View
//       style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
//       onLayout={onLayoutRootView}
//     >
//       <Text>SplashScreen Demo! 👋</Text>
//     </View>
//   );
// }

export default function App() {
  const [assets] = useAssets([require("./logo.jpg")]);
  const [loaded] = Font.useFonts(Ionicons.font);

  if (!assets || !loaded) {
    return <Text>testingtestingtestingtestingtesting</Text>;
  }
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>😁 We are done loading! 😁</Text>
    </View>
  );
}
