import React, { useEffect, useState } from 'react';
//import { getUsers } from './services/users';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
//Importando Components e Views
import LoginScreen from './src/views/LoginScreen';
import Home from './src/views/Home';
import CadastroPet from './src/views/CadastroPet';
import { PetDetails } from './src/views/PetDetails';
import SessaoSaude from './src/views/sessaoSaúde';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './services/firebase';
//import Tutorial from './src/views/Tutorial';
import SessaoPets from './src/views/sessaoPets';
import CardMedico from './src/views/CardMedico';
import Perfil from './src/views/Perfil';
import Events from './src/views/events';
import CadastroNotas from './src/views/cadastroNota';
import CadastroMedc from './src/views/CadastroMedc';
import Medicacoes from './src/views/medicacoes';
import Vacinas from './src/views/vacinas';
import CadastroVacina from './src/views/cadastroVacina';
const Stack = createStackNavigator();

export default function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  }, []);

  const [loaded] = useFonts({
    Nunito: require('./assets/fonts/Nunito-Medium.ttf'),
    Mont: require('./assets/fonts/Montserrat-Regular.ttf')
  })
  if(!loaded){
    return null;
  }
  return(
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {
            (user) ?
            ( 
            <>              
              <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>  
              <Stack.Screen name="Pets" component={SessaoPets} options={{ headerShown: false }}/>
              <Stack.Screen name="PetDetails" component={PetDetails} options={{ headerShown: false }}></Stack.Screen>       
              <Stack.Screen name="CadPets" component={CadastroPet} options={{ headerShown: false }}/>  
              <Stack.Screen name="PetSaude" component={SessaoSaude} options={{ headerShown: false }}/>  
              <Stack.Screen name="CardMed" component={CardMedico} options={{ headerShown: false }}/> 
              <Stack.Screen name="Perfil" component={Perfil} options={{ headerShown: false }}/> 
              <Stack.Screen name="Events" component={Events} options={{ headerShown: false }}/> 
              <Stack.Screen name="CadEvents" component={CadastroNotas} options={{ headerShown: false }}/> 
              <Stack.Screen name="CadastroMedc" component={CadastroMedc} options={{ headerShown: false }}/> 
              <Stack.Screen name="medicacao" component={Medicacoes} options={{ headerShown: false }}/> 
              <Stack.Screen name="vacina" component={Vacinas} options={{ headerShown: false }}/>
              <Stack.Screen name="CadastroVacina" component={CadastroVacina} options={{ headerShown: false }}/>
            </>
            
            ) :
            (
              <>
                {/* <Stack.Screen name='Tutorial' component={Tutorial} options={{headerShown: false}}></Stack.Screen> */}
                <Stack.Screen name="TelaLogin" component={LoginScreen} options={{ headerShown: false }}/>                
              </>
            )
          }          
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );

}
