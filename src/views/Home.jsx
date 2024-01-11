import React, { useEffect, useState } from 'react';
import { auth } from '../../services/firebase';
import Navbar from '../components/navbar';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons';
import { getPetsByEmail, getPetById } from '../../services/pets';
import { EventCard } from "../components/EventCard"
import { getAllNotes } from '../../services/notes';

import {
    HStack,
    VStack,
    Box,
    View,
    Center,
    ScrollView,
    Heading,
    Avatar,
    Text,
    Pressable,
    Icon
} from 'native-base';
import { ImagePet } from './PetDetails/index';

function HomeActions(){

    const navigation = useNavigation();

    return(
        <Box w="100%" bg="white">
        <HStack VStack >
            
                  <Box flexDirection="row" w="100%"  justifyContent="space-between">
                    <Pressable bg="#E6E9F7" onPress={() => navigation.navigate('Pets')} borderRadius="md" w="22%" h={20}>
                        <Center h="100%">
                        <Box alignItems="center" justifyContent="center" padding={3} w={8} h={8} borderRadius={20} borderWidth={1} borderColor="#003DA5" >
                        <Icon
                            as={MaterialIcons}
                            name="pets"
                            size={6}
                            color="#003DA5"
                            />
                        </Box>
                            
                            <Heading size="sm" color="#003DA5" fontFamily="Mont" marginTop={2}>Pets</Heading>
                        </Center>
                    </Pressable>
                <Pressable bg="#FFF9E0" onPress={() => navigation.navigate('PetSaude')} borderRadius="md" w="20%" h={20}>
                    <Center h="100%">
                    <Box alignItems="center" justifyContent="center" padding={3} w={8} h={8} borderRadius={20} borderWidth={1} borderColor="#FECF00" >
                        <Icon
                            as={MaterialCommunityIcons}
                            name="hospital"
                            size={7}
                            color="#FECF00"
                            />
                    </Box>
                    
                    <Heading size="sm" color="#FECF00" fontFamily="Mont" marginTop={2}>Saúde</Heading>
                     </Center>
              </Pressable>
              <Pressable bg="#F3E5FD"  onPress={() => navigation.navigate('Events')} borderRadius="md" w="22%" h={20}>
                    <Center h="100%">
                        <Box alignItems="center" justifyContent="center" padding={3} w={8} h={8} borderRadius={20} borderWidth={1} borderColor="#A83FF1" >
                        <Icon
                            as={MaterialIcons}
                            name="notes"
                            size={7}
                            color="#A83FF1"
                            />
                        </Box>
                       
                        <Heading size="sm" color="#A83FF1" fontFamily="Mont" marginTop={2}>Notas</Heading>
                     </Center>
              </Pressable>
              <Pressable bg="#D4F8EF"  onPress={() => navigation.navigate('Perfil')} borderRadius="md" w="22%" h={20} >
                    <Center h="100%">
                    <Box alignItems="center" justifyContent="center" padding={3} w={8} h={8} borderRadius={20} borderWidth={1} borderColor="#01DEBB" >
                        <Icon
                            as={MaterialIcons}
                            name="person-outline"
                            size={7}
                            color="#01DEBB"
                            />
                        </Box>
                        <Heading size="sm" color="#01DEBB" fontFamily="Mont" marginTop={2}>Perfil</Heading>
                     </Center>
              </Pressable>
           </Box>
        </HStack>
        </Box>
    )
}

function CardAnimal(props){
    const navigation = useNavigation();
    return(

    <Pressable onPress={() => navigation.navigate('PetDetails', {petId: props.pet.id})} borderRadius={12} borderWidth="1" borderColor="#E54300" w={150} h={200}  bg="white">
        <Center h="100%">
            <ImagePet specie={props.pet.specie}></ImagePet>
            <Text fontFamily="Mont" color="#E54300" mt={3} textSize="lg" bold>{props.pet.name}</Text>
            <Text fontFamily="Mont" mb={3} textSize="lg">{props.pet.specie}</Text>
        </Center>
    </Pressable>
    )
}

function CardAddAnimal(){
    const navigation = useNavigation();
    return(
        <Pressable onPress={() => navigation.navigate("CadPets")} w={150} h="100%"  borderRadius="md" borderColor="coolGray.100" borderWidth="1" shadow="5" bg="#E54300">
            <Center alignItems="center" justifyContent="center" h="100%" textAlign="center">
                <Icon
                    size="20"
                    as={MaterialIcons}
                    name="add"
                    color="#FFFFFF"
                    paddingBottom="50"
                />
                <Heading fontFamily="Mont" padding={3} color="#FFFFFF"size="sm">Adicionar novo pet</Heading>
            </Center>
        </Pressable>
    )
}

function PetsViewer(props){
    const navigation = useNavigation();
    return(
    <>
    
        <HStack justifyContent="space-between" alignItems="center">
        <Heading  fontFamily="Nunito" fontSize="xl" color="#003DA5" my={5}>Seus Pets</Heading>
        <Pressable  flexDirection="row" alignItems="center" onPress={() => navigation.navigate('Pets')}>
            <Heading color="#FE5000" fontFamily="Mont" size="sm">Ver todos</Heading>
            <Icon
                    size="6"
                    as={MaterialIcons}
                    name="chevron-right"
                    color="#323232"
            />
           
         </Pressable>
        </HStack>
       
        <ScrollView w="100%"  horizontal={true}>
            <HStack w="90%"  space="3%">           
                {
                    props.petList?.map((pet) => (
                        <CardAnimal key={pet.id} pet={pet}></CardAnimal>
                        ))
                }
                <CardAddAnimal/>
            </HStack>
        </ScrollView>
    </>
    )
}

export default function Home(){

    const [userPets, setUserPets] = useState(null);
    const [notes, setNotes] = useState(null);

    const navigation = useNavigation();
    

    useEffect(() => {
        (async function getPetList(){
            try{
                let petList = await getPetsByEmail(auth.currentUser.email);
                setUserPets(petList)
            }catch(error){
                console.log(error)
            }
        })(); 
        
        (async function getNotesList(){
            try{
                let notesList = await getAllNotes();
                setNotes(notesList)
            }catch(error){
                console.log(error)
            }
        })();

      }, []);
      
    return(
       
        <View flex={1} bg="#FE5000">        
            <HStack HStack h="10%" px={2} w="100%" color="#FFF" justifyContent="space-between" alignItems="center" textAlign="center">
               <Icon
                as={MaterialIcons}
                name="menu"
                size={7}
                color="#FFFEF9"

               />
            </HStack>
            <Box h="100%"bg="white" borderTopRadius="md">
            <View w="100%"  py={3} px={5}  >    
            <Heading color="#003DA5" fontFamily="Nunito" marginBottom={5}>Olá, {auth.currentUser.displayName}</Heading>           
                <HomeActions/>
                <PetsViewer petList={userPets}/>
                <HStack justifyContent="space-between" alignItems="center">
                <Heading fontSize="xl" fontFamily="Nunito" color="#003DA5" my={5}>Próximos eventos</Heading>
                    <Pressable  flexDirection="row" alignItems="center" onPress={() => navigation.navigate('Events')}>
                        <Heading fontFamily="Mont" color="#FE5000" size="sm">Ver todos</Heading>
                        <Icon
                                size="6"
                                as={MaterialIcons}
                                name="chevron-right"
                                color="#323232"
                        />

                    </Pressable>
                </HStack>
                {
                    notes == null
                    ? (<Text mb={10}>Carregando...</Text>)
                    : (notes.length == 0) 
                        ? (<Center w="100%"><Text mb={10}>Você ainda não tem eventos para seus pet</Text></Center>)
                        : (<EventCard note={notes[0]}></EventCard>)
                }
                
            </View>
            </Box>
           
            <Navbar></Navbar>
        </View>
    )
}

