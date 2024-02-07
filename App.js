import { StatusBar } from "expo-status-bar";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import AllPlaces from "./screens/AllPlaces";
import AddPlace from "./screens/AddPlace";
import IconButton from "./ui/IconButton";
import { Colors } from "./constants/Colors";
import Map from "./screens/Map";
import { useCallback, useEffect, useState } from "react";
import { init } from "./utils/database";
import { View } from "react-native";

const Stack = createNativeStackNavigator();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.black,
  },
};

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const App = () => {
  const [databaseInitialize, setDatabaseInitialize] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await init();
        setDatabaseInitialize(true);
        console.log("db init");
      } catch (error) {
        console.log(error);
      } finally {
        setDatabaseInitialize(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (databaseInitialize) {
      await SplashScreen.hideAsync();
    }
  }, [databaseInitialize]);

  if (!databaseInitialize) {
    return null;
  }

  return (
    <>
      <StatusBar style="auto" />
      <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
        <NavigationContainer theme={navTheme}>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: Colors.black,
                color: Colors.silver,
              },
              headerTintColor: Colors.silver,
            }}
          >
            <Stack.Screen
              name="AllPlaces"
              component={AllPlaces}
              options={({ navigation }) => ({
                headerRight: ({ tintColor }) => (
                  <IconButton
                    icon="add"
                    color={tintColor}
                    size={24}
                    onPress={() => navigation.navigate("AddPlaces")}
                  />
                ),
                headerTitle: "Favorite Places",
              })}
            />
            <Stack.Screen
              name="AddPlaces"
              component={AddPlace}
              options={{
                headerBackTitleVisible: false,
                headerTitle: "Add Place",
              }}
            />
            <Stack.Screen
              name="Map"
              component={Map}
              options={{
                headerBackTitleVisible: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </>
  );
};

export default App;
