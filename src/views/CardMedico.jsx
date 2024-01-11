import  React, {useState ,  useEffect} from "react";
import {Box, Flex, Icon, HStack, VStack, Heading, Text, Avatar, Center,Pressable, TextArea} from "native-base";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native"
import Navbar from "../components/navbar";
import { MaterialIcons } from '@expo/vector-icons';
import { ImagePet } from './PetDetails/index';


export default function CardMedico (props){

    const navigation = useNavigation();
    const route = useRoute();

    return(
        <Box flex={1} bg="#FE5000">

            <HStack h="10%" px={2} w="100%" color="#FFF" justifyContent="space-between" alignItems="center" textAlign="center">
            <Pressable onPress={() => navigation.goBack()}>
                        <Icon
                            as={MaterialIcons}
                            name="chevron-left"
                            size={30}
                            color="white">
                        </Icon>
                        </Pressable>
                        <Heading alignSelf="center" fontFamily="Nunito" color="white">Card Médico</Heading>
                        <Box w={30}></Box>
                </HStack>
            <Box Box h="100%" w="100%" py={3} px={5} borderTopRadius="md" bg="white" >
            <Center >
        <HStack w="100%"  justifyContent="space-between" alignItems="center" >
          
            <HStack alignItems="center">
                <Box h="100%">
                <ImagePet specie={route.params.pet.specie}></ImagePet>
                </Box>
                <VStack marginLeft={3}> 
                        <Heading fontFamily="Mont" size="sm">{route.params.pet.name}</Heading>
                        <Text fontFamily="Mont">{route.params.pet.specie}</Text>
                        <Text fontFamily="Mont">{route.params.pet.breed}</Text>
                        <Text fontFamily="Mont">{route.params.pet.ageYears} Anos e  {route.params.pet.ageMonths}  meses</Text>
                            
                </VStack>
             
            </HStack>

            <Pressable onPress={() => navigation.navigate('PetDetails', {petId:route.params.pet.id})}  w="120" h={10} borderRadius="20" justifyContent="center" alignItems="center" backgroundColor="#FE5000">
                <Text fontFamily="Mont" color="white">Ver Perfil</Text>
            </Pressable>
        </HStack>
        </Center>        
            <Center> 
                <Box w="100%">
                    <Heading fontFamily="Mont" marginTop={8} marginBottom={5} color="#003DA5">Histórico Médico</Heading>
                    <Center>
                   
                    <Pressable  onPress={() => navigation.navigate('medicacao', {pet: route.params.pet})} padding={7} marginBottom={3} w="100%" flexDirection="row" alignItems="center" h={50} borderRadius={30} justifyContent="space-between" backgroundColor="#FE5000">
                            <Heading  fontFamily="Mont" size="sm"  color="white">Medicações</Heading>
                             <Icon
                            as={MaterialIcons}
                            name="chevron-right"
                            size={10}
                            color="#FFFFFF"
                            />
                       
                    </Pressable>
                    <Pressable padding={7} onPress={() => navigation.navigate('vacina', {pet: route.params.pet})} marginBottom={3} w="100%" flexDirection="row" alignItems="center" h={50} borderRadius={30} justifyContent="space-between" backgroundColor="#FE5000">
                            <Heading size="sm"  fontFamily="Mont" color="white">Vacinas</Heading>
                             <Icon
                            as={MaterialIcons}
                            name="chevron-right"
                            size={10}
                            color="#FFFFFF"
                            />
                    </Pressable>
                    </Center>
                </Box>  
            </Center>
            </Box>
       
        <Navbar/>
     </Box>
    )
}

