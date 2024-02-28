import { SigninUi } from "./src/Signin";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { RegisterUi } from "./src/Register";
import Home from "./src/Home";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import Newnote from "./src/Newnote";
import Loading from "./src/loading";
import UpdateNote from "./src/Updatenote";

const Stack = createNativeStackNavigator();

function App() {
  const [mobile, setMobile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getItem = async () => {
    try {
      const mobile = await AsyncStorage.getItem("mobile");
      setMobile(mobile);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getItem();
  }, []);

  const [fontsLoaded] = useFonts({
    "Poppins-BoldItalic": require("./assets/fonts/Poppins-BoldItalic.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    DancingScript: require("./assets/fonts/DancingScript-VariableFont_wght.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={mobile ? "Home" : "Signin"}>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Signin"
            component={SigninUi}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterUi}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Newnote"
            component={Newnote}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="UpdateNote"
            component={UpdateNote}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
export default App;
