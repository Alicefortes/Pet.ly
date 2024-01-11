import React, { useState } from "react";
import { Box, HStack, Icon, Text, Heading, VStack,Pressable} from "native-base";
import { Feather} from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
export default function Medicacoes (){

    const route = useRoute();    
    const navigation = useNavigation();
    const petId = route.params.pet.id;

    return(
        <Box flex={1} bg="#FE5000">        
            <HStack  h="10%" px={2} w="100%" color="#FFF" justifyContent="space-between" alignItems="center" textAlign="center">
                                <Icon
                                    as={Feather}
                                    name="chevron-left"
                                    size={30}
                                    color="#FFF"
                                    onPress={() => navigation.goBack()}
                                >
                                </Icon>
                                <Heading alignSelf="center" fontFamily="Nunito" color="white">Medicações</Heading>
                                <Box w={30}></Box>
                        </HStack>
        <Box w="100%" h="100%" py={3} px={5} borderTopRadius="md" bg="white">

            <Heading size="md" fontFamily="Mont" color="#003DA5" my={5}>Últimas medicações</Heading>
            <Pressable onPress={() => navigation.navigate('CadastroMedc', {pet: route.params.pet})} w="120" h={10} borderRadius="20" justifyContent="center" alignItems="center" backgroundColor="#FE5000">
                <Text fontFamily="Mont" color="white">Adicionar </Text>
            </Pressable>

            <VStack w="100%" my={5} space={2}>

                    {
                        route.params.pet.medicines?.map((med) => (
                            <Box padding={8} borderWidth={1} borderRadius={10} borderColor="#FE5000" alignItems="center" justifyContent="center" >
                                <Heading fontFamily="Mont" size="sm">{med.type}</Heading>
                                <Text fontFamily="Mont">{med.notes}</Text>
                                <Text fontFamily="Mont">{med.dosage}</Text>
                                <Text fontFamily="Mont">{med.usageDate}</Text>
                            </Box>
                        ))
                    }

            </VStack>
            

        </Box>
        
        </Box>
    )
    
}