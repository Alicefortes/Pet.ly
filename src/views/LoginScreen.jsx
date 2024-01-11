import React from 'react';
import {
    Center,
    VStack,
    HStack,
    FormControl, 
    Input, 
    Text, 
    Heading, 
    Button,
    Box,
    Link,
    Flex,
    Pressable,
    Avatar,
    Image,
    AspectRatio
} from 'native-base';
import LoginButton from '../components/LoginButton'
import logoBranca from '../../assets/images/logo_branca.png'

export default function LoginScreen(){
    return (
      <Box flex={1} bg="#FE5000">
        
            <HStack h="20%" px={2} w="100%" color="#FFF" justifyContent="center" alignItems="center" textAlign="center">
                <AspectRatio ratio={{
                      base: 3 / 4,
                    }} height={{
                      base: 20,
                      md: 40
                }}>
                    <Image resizeMode="cover" source={logoBranca}/>
                </AspectRatio>
            </HStack>
            <Box h="100%" w="100%" py={3} px={5} borderTopRadius="md" bg="white" >
            <Box w="100%" h="100%">
           
                <VStack w="100%">
                <Box>
                    <Heading fontFamily="Mont" alignSelf="left" size="lg" fontWeight="600" mt={5}>
                        Entre no Pet.ly
                    </Heading>
                    <Text fontFamily="Mont">
                        Seu app e do seu Pet
                    </Text>
                </Box>
        
                <VStack marginTop={5} w="100%">
                  <FormControl w="100%">
                  <Text fontFamily="Mont" color="#666666">E-mail</Text>
                  <Input
                                    height={10} 
                                    type="Number"
                                    placeholder="xxxxxxxxxxxxxx@gmail.com" 
                                    bg="#F6F6F6"
                                />
                  </FormControl>
                    <FormControl.Label marginTop={5}>
                    <Text fontFamily="Mont" color="#666666">Senha</Text>
                    </FormControl.Label>
                    <Input        
                                    height={10} 
                                    type="password"
                                    bg="#F6F6F6"
                                />
                </VStack>
                </VStack>

                <VStack w="100%">

                    <Button marginTop={10} bg="#FE5000" my="2"   borderRadius="full">
                      <Text fontFamily="Mont" color="white">Fazer Login</Text>
                        
                    </Button>

                    <LoginButton></LoginButton>

                    <HStack  bottom="0%" Center margin={10} justifyContent="center">
                        <Text fontFamily="Mont" fontSize="sm" color="coolGray.600" _dark={{
                        color: "warmGray.200"
                        }}>
                            Não possui uma conta? 
                        </Text>
                        <Link _text={{
                          fontFamily:"Mont", 
                          color: "indigo.500",
                          fontWeight: "medium",
                          fontSize: "sm"
                        }} href="#">
                            Cadastre-se!
                        </Link>
                    </HStack>

                </VStack>
            
        </Box>
            </Box>              
           
        </Box>
       
      );
    }