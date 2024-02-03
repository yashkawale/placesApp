import { StatusBar } from "expo-status-bar";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AllPlaces from "./screens/AllPlaces";
import AddPlace from "./screens/AddPlace";
import IconButton from "./ui/IconButton";
import { Colors } from "./constants/Colors";

const Stack = createNativeStackNavigator();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.black,
  },
};

const App = () => {
  return (
    <>
      <StatusBar style="auto" />
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
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
