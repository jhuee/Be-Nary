import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import Start from "./screens/Start";
import Miss from "./screens/Miss";
import VoiceGame from "./screens/VoiceGame";
import VoiceTalk from "./screens/VoiceTalk";
import Home from "./screens/Home";
import NameStart from "./screens/NameStart";
import { NativeBaseProvider } from 'native-base';
import "react-native-url-polyfill/auto";
import LevelUP from "./screens/LevelUp";

const Stack = createNativeStackNavigator();

const App = () => {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(false);
  const [fontsLoaded, error] = useFonts({
    Jua_regular: require("./assets/fonts/Jua_regular.ttf"),
    SF_Pro_bold: require("./assets/fonts/SF_Pro_bold.ttf"),
  });


  React.useEffect(() => {
    setTimeout(() => {
      setHideSplashScreen(true);
    }, 0);
  }, []);

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <>
    <NativeBaseProvider>
      <NavigationContainer>
        {hideSplashScreen ? (
          <Stack.Navigator
            initialRouteName="Start"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen
              name="Start"
              component={Start}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Miss"
              component={Miss}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="VoiceGame"
              component={VoiceGame}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="VoiceTalk"
              component={VoiceTalk}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="NameStart"
              component={NameStart}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="LevelUp"
              component={LevelUP}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        ) : null}
      </NavigationContainer>
      </NativeBaseProvider>
    </>
  );
};

export default App;
