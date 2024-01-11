import React, { useEffect, useState , useRef } from 'react';
import {Box, Flex, Icon, HStack, VStack, Heading, Text, Avatar, Center,Pressable } from "native-base";
import { Feather } from "@expo/vector-icons";
import { AlertDialog, Button,Group } from "native-base";
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../services/firebase';
import Navbar from '../components/navbar';
import { MaterialIcons } from '@expo/vector-icons';
//onPress={() => auth.signOut()
export default function Perfil(){
const [isOpen, setIsOpen] = useState(false);

const onClose = () => setIsOpen(false);

const cancelRef = useRef(null);

const navigation = useNavigation();
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
                        <Heading alignSelf="center" fontFamily="Nunito" color="white">Perfil</Heading>
                        <Box w={30}></Box>
                </HStack>
            <Box Box h="100%" w="100%" borderTopRadius="md" bg="white">
                <HStack w="95%" margin="5%" space={5} alignItems="center" >
                    <Box>
                        <Avatar borderWidth={1} borderColor="#FE5000" size="xl" source={{
                            uri: auth.currentUser.photoURL
                        }}/>
                    </Box>
                    <VStack>
                            <Heading paddingBottom={1} fontFamily="Nunito" color="Black">{auth.currentUser.displayName}</Heading>
                            <Text fontFamily="Mont" color="coolGray.400" fontSize={10} paddingBottom={1}>{auth.currentUser.email}</Text>
                        
                    </VStack>
                        
                </HStack>
                <Center>
            <Box w="90%">
                <Box w="100%" marginBottom={5}> 
                    <HStack justifyContent="space-between" alignItems="center">
                    <Box alignItems="center" flexDirection="row">
                    <Box  borderWidth={1} borderRadius="full" borderColor="#FE5000" padding={0.5}>
                            <Icon 
                            as={MaterialIcons}
                            name="settings"
                            size={7}
                            color="#FE5000">
                            
                        </Icon>
                    </Box>
                   
                <Text fontFamily="Mont" marginLeft={5}>Conta</Text>
                    </Box>
                    <Pressable>
                    <HStack alignItems="center" >
                    <Text marginRight={2} fontFamily="Mont">Configuração de conta</Text>
                    <Icon 
                            as={MaterialIcons}
                            name="chevron-right"
                            size={7}
                            color="#FE5000">
                            
                        </Icon>
                    </HStack>
                    </Pressable>
                    </HStack>
                </Box>
            <Box w="100%" marginBottom={5}> 
                <HStack justifyContent="space-between" alignItems="center">
                <Box alignItems="center" flexDirection="row">
                <Box  borderWidth={1} borderRadius="full" borderColor="#FE5000" padding={0.5}>
                            <Icon 
                            as={MaterialIcons}
                            name="info"
                            size={7}
                            color="#FE5000">
                            
                        </Icon>
                    </Box>
            <Text fontFamily="Mont" marginLeft={5}>Sobre nós</Text>
                </Box>
                <Pressable>
                <HStack alignItems="center" >
                    <Text marginRight={2} fontFamily="Mont">Desenvolvedores</Text>
                    <Icon 
                            as={MaterialIcons}
                            name="chevron-right"
                            size={7}
                            color="#FE5000">
                            
                        </Icon>
                    </HStack>
                </Pressable>
                </HStack>
            </Box>
            <Box w="100%" marginBottom={5}> 
            <HStack justifyContent="space-between" alignItems="center">
                <Box alignItems="center" flexDirection="row">
                <Box  borderWidth={1} borderRadius="full" borderColor="#FE5000" padding={0.5}>
                            <Icon 
                            as={MaterialIcons}
                            name="logout"
                            size={6}
                            color="#FE5000">
                            
                        </Icon>
                    </Box>
                    <HStack></HStack>
                    <Text fontFamily="Mont" marginLeft={5}>Sair</Text>
                    </Box>
            <Box >
            <Pressable onPress={() => setIsOpen(!isOpen)}>
                    <HStack alignItems="center" >
                    <Text marginRight={2} fontFamily="Mont">Encerrar sessão</Text>
                    <Icon 
                            as={MaterialIcons}
                            name="chevron-right"
                            size={7}
                            color="#FE5000">
                            
                        </Icon>
                    </HStack>
                    
                </Pressable>
                <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
                    <AlertDialog.Content>
                    <AlertDialog.CloseButton />
                    <AlertDialog.Header fontFamily="Mont">Logout</AlertDialog.Header>
                    <AlertDialog.Body fontFamily="Mont">
                       Você deseja sair da sua conta?
                    </AlertDialog.Body>
                    <AlertDialog.Footer>
                        <Button.Group space={2}>
                        <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef} fontFamily="Mont">
                            Cancelar
                        </Button>
                        <Button colorScheme="danger" onPress={ () => auth.signOut()} fontFamily="Mont" >
                            Sair
                        </Button>
                        </Button.Group>
                    </AlertDialog.Footer>
                    </AlertDialog.Content>
                </AlertDialog>
            </Box>
                           
            </HStack>
            </Box>
            </Box>
        </Center>
        </Box>
       
        <Navbar/>
        </Box>
    )
}