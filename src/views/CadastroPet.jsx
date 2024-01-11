import React, { useState } from "react";
import { Box, HStack, Icon, FormControl, Input, Select, Button, Text, Heading, VStack, Spinner,Pressable} from "native-base";
import { Feather} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { addPet } from "../../services/pets";
import { auth } from "../../services/firebase";
import { MaterialIcons } from "@expo/vector-icons";
function FormCadPet(){

    const navigation = useNavigation()

    const [isLoading, setIsLoading] = useState(false)

    const [formData, setFormData] = useState({
        name: '',
        specie: '',
        breed: '',
        sex: '',
        ageYears: '',
        ageMonths: '',
        tutors: [auth.currentUser.email]
      });
    
      function sendForm(e) {
        e.preventDefault()
        setIsLoading(true)
        addPet(formData)
            .then((result) => {
                setTimeout(() => {
                    setIsLoading(false)
                    navigation.navigate('PetDetails', {petId: result})
                }, 2000)
            })
    }   

    return(
    <>
    {
        (isLoading) ?
        (
            <VStack space={2} h="100%" alignItems="center" justifyContent="center">
              <Spinner size="lg" color="#FE5000" accessibilityLabel="Criando perfil" />
              <Heading fontSize="md" >
                Criando o perfil do seu Pet
              </Heading>
            </VStack>
        ) :
        
        (
        <>
            <Box flexDirection="column" justifyContent="center" textAlign="left">
                    <Heading size="md" fontFamily="Mont" py={3}>Configurando o Perfil do seu Pet</Heading>
                </Box>
                    <FormControl isRequired pt={5}>
                        <FormControl.Label>
                        <Text fontFamily="Mont" color="#666666">Qual o nome do seu Pet?</Text>
                        </FormControl.Label>
                        <Input
                            type="text"
                            placeholder="José" 
                            py={3} 
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
        
                        <FormControl.Label>
                        <Text fontFamily="Mont" color="#666666">Qual a espécie do seu pet?</Text>
                            </FormControl.Label>
                        <Select
                            aria-label="Defult sealect example"
                            placeholder="Selecione..."
                            py={3}
                            onValueChange={(itemValue) => setFormData({ ...formData, specie: itemValue })}
                        >
                            <Select.Item value="Cachorro" label="Cachorro" />
                            <Select.Item value="Gato" label="Gato" />
                        </Select>
        
        
                        <FormControl.Label>
                        <Text fontFamily="Mont" color="#666666">Qual a Raça do seu pet?</Text>
                            </FormControl.Label>
                        <Input
                            type="text"
                            placeholder="Golden Retriver"
                            py={3}
                            onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                        />

                        <FormControl.Label>
                        <Text fontFamily="Mont" color="#666666">Qual é o sexo do seu pet?</Text>   
                        </FormControl.Label>
                        <Select
                            aria-label="Default select example"
                            placeholder="select"
                            py={3}
                            onValueChange={(itemValue) => setFormData({ ...formData, sex: itemValue })}
                        >
                            <Select.Item value="Macho" label="Macho" />
                            <Select.Item value="Femea" label="Fêmea" />
                        </Select>
        
                        <Heading size="sm" fontFamily="Mont" pt={3}>Qual a idade do seu pet?</Heading>
                        <HStack justifyContent="space-between" w="100%">
                            <VStack w="45%">
                                <FormControl.Label>
                                <Text fontFamily="Mont" color="#666666">Anos</Text>   
                                </FormControl.Label>
                                <Input
                                    height={10} 
                                    type="Number"
                                    placeholder="Golden Retriver" 
                                    keyboardType="numeric"
                                    py={3}
                                    onChange={(e) => setFormData({ ...formData, ageYears: e.target.value })}
                                />
                            </VStack>
        
                            <VStack w="45%">
                                <FormControl.Label>
                                <Text fontFamily="Mont" color="#666666">Meses</Text> 
                                </FormControl.Label>
        
                                <Select
                                    aria-label="Default select example"
                                    placeholder="select"
                                    py={3}
                                    onValueChange={(itemValue) => setFormData({ ...formData, ageMonths: itemValue })}
                                >
                                    <Select.Item value="1" label="1"/>
                                    <Select.Item value="2" label="2"/>
                                    <Select.Item value="3" label="3"/>
                                    <Select.Item value="4" label="4"/>
                                    <Select.Item value="5" label="5"/>
                                    <Select.Item value="6" label="6"/>
                                    <Select.Item value="7" label="7"/>
                                    <Select.Item value="8" label="8"/>
                                    <Select.Item value="9" label="9"/>
                                    <Select.Item value="10" label="10"/>
                                    <Select.Item value="11" label="11"/>
                                </Select>
                            </VStack>
                        </HStack>     
                        <Button justifySelf="flex-end" onPress={sendForm} borderRadius="full" marginTop={10} backgroundColor="#E54300">
                        <Heading size="sm" color="#FFFFFF" fontFamily="Mont">
                                Completar
                            </Heading>
                        </Button>                              
                    </FormControl> 
                    </>
        )
    }
    </>
    )
}

export default function CadastroPet(){

    

      const navigation = useNavigation();

    return (
        <Box flex={1} backgroundColor="#FE5000">
            <HStack h="10%" px={2} w="100%" color="#FFF" justifyContent="space-between" alignItems="center" textAlign="center">
            <Pressable onPress={() => navigation.goBack()}>
                        <Icon
                            as={MaterialIcons}
                            name="chevron-left"
                            size={30}
                            color="white">
                        </Icon>
                        </Pressable>
                    <Heading alignSelf="center" color="white">Adicione o seu Pet</Heading>
                    <Box w={30}></Box>
            </HStack>
           
            <Box h="90%" w="100%" backgroundColor="#FFF" borderTopRadius="10" padding={5}>
                
                <FormCadPet></FormCadPet>

            </Box>
        </Box>
      )
  }
