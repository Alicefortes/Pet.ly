import React, { useEffect, useState } from "react";
//import { getUsers } from './services/users';
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";
//Importando Components e Views
import LoginScreen from "./src/views/LoginScreen";
import Home from "./src/views/Home";
import RegisterPets from "./src/views/RegisterPets";
import { PetDetails } from "./src/views/PetDetails";
import Health from "./src/views/Health";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./services/firebase";
//import Tutorial from './src/views/Tutorial';
import Pets from "./src/views/Pets";
import MedicalCard from "./src/views/MedicalCard";
import Profile from "./src/views/Profile";
import Events from "./src/views/events";
import CadastroNotas from "./src/views/cadastroNota";
import RegisterMedications from "./src/views/RegisterMedications";
import Medications from "./src/views/Medications";
import Vaccines from "./src/views/Vaccines";
import RegisterVaccines from "./src/views/RegisterVaccines";
const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  const [loaded] = useFonts({
    Nunito: require("./assets/fonts/Nunito-Medium.ttf"),
    Mont: require("./assets/fonts/Montserrat-Regular.ttf"),
  });
  if (!loaded) {
    return null;
  }
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {user ? (
            <>
              <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Pets"
                component={Pets}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="PetDetails"
                component={PetDetails}
                options={{ headerShown: false }}
              ></Stack.Screen>
              <Stack.Screen
                name="CadPets"
                component={RegisterPets}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="PetSaude"
                component={Health}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="CardMed"
                component={MedicalCard}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Perfil"
                component={Profile}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Events"
                component={Events}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="CadEvents"
                component={CadastroNotas}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="CadastroMedc"
                component={RegisterMedications}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="medicacao"
                component={Medications}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="vacina"
                component={Vaccines}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="CadastroVacina"
                component={RegisterVaccines}
                options={{ headerShown: false }}
              />
            </>
          ) : (
            <>
              {/* <Stack.Screen name='Tutorial' component={Tutorial} options={{headerShown: false}}></Stack.Screen> */}
              <Stack.Screen
                name="TelaLogin"
                component={LoginScreen}
                options={{ headerShown: false }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
