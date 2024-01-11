import  React,{useState ,  useEffect} from "react";
import {Box, Flex, Icon, HStack, VStack, Heading, Text, Avatar, Center, Pressable } from "native-base";
import { Feather } from "@expo/vector-icons";
import { getPetsByEmail } from '../../services/pets';
import { auth } from '../../services/firebase';
import { CardAnimal } from '../components/CardAnimal'
import { useNavigation } from '@react-navigation/native';
import Navbar from "../components/navbar";
import { MaterialIcons } from "@expo/vector-icons";
function ButtonAdd(){
    return(
        <Box alignItems="center" justifyContent="center" w="45%" borderRadius={12}  backgroundColor="#E54300" padding={8}>
                         <Icon
                        as={Feather}
                        name="heart"
                        size= "2xl"
                        color="#FFF">
                        </Icon>
                     <Heading marginTop={5} size="lg" alignSelf="center"  color="#FFF">Adicionar Pet</Heading>
                     
        </Box>
    )
}

export default function SessaoPets(){

    const [userPets, setUserPets] = useState(null);

    useEffect(() => {
        (async function getPetList(){
            try{
                let petList = await getPetsByEmail(auth.currentUser.email);
                setUserPets(petList)
            }catch(error){
                console.log(error)
            }
        })()
      

      }, []);

      function renderizarCardAnimais(userPets) {

        if (!userPets) {
            return null; // ou qualquer outro valor que você queira retornar quando userPets for null
        }

        const cardAnimais = [];
        let hStack = [];
      
        userPets?.forEach((pet, index) => {
          hStack.push(<CardAnimal key={pet.id} pet={pet}></CardAnimal>);
      
          if ((index + 1) % 2 === 0 || index === userPets.length - 1) {
            cardAnimais.push(
              <HStack key={`hStack-${index}`} w="100%" justifyContent="center">
                {hStack}
              </HStack>
            );
            hStack = [];
          }
        });
      
        return cardAnimais;
      }

      const navigation = useNavigation();

    return(

        <Box flex={1} backgroundColor="#FE5000" h="10%">
        <HStack  h="10%"  px={2} w="100%" color="#FFF" justifyContent="space-between" alignItems="center" textAlign="center">
        <Pressable onPress={() => navigation.goBack()}>
                        <Icon
                            as={MaterialIcons}
                            name="chevron-left"
                            size={30}
                            color="white">
                        </Icon>
                        </Pressable>
            <Heading alignSelf="center" fontFamily="Nunito" color="white">Pets</Heading>
            <Box w={30}></Box>
        </HStack>
        <Box borderTopRadius="md" backgroundColor= "#FFF" h="100%"  w="100%" py={3} px={5}  bg="white">
                <Box>
                    <HStack alignItems="center" justifyContent="space-between" marginTop={5}>
                        <Heading fontFamily="Mont" color="#003DA5" size="md">Meus Pets</Heading>
                    </HStack>
                </Box>
            <VStack marginTop={5} alignItems="center" justifyContent="center" textAlign="center">
                {renderizarCardAnimais(userPets)}                
            </VStack>
              
        </Box>
        <HStack marginTop="10" w="100%" position="fixed" bottom="0%" left="0%" mb={20} px="5%" justifyContent="space-between">
                    <Box w={30}></Box>
                    <Pressable onPress={() => navigation.navigate('CadPets')} w="50" h="50" borderRadius="100%" bg="#003DA5" alignItems="center" justifyContent="center">
                        <Icon
                            size="5"
                            as={MaterialIcons}
                            name="add"
                            color="#FFFFFF"
                        />
                    </Pressable>
                </HStack>
        <Navbar/>
        </Box>

          
    )
}