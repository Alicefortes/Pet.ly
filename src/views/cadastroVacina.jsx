import React, { useState } from "react";
import { Box, HStack, Icon, FormControl, Input, Select, Button, Text, Heading, VStack, Spinner, Pressable} from "native-base";
import { useNavigation, useRoute } from "@react-navigation/native"
import { addVaccineToPet } from "../../services/pets";
import { auth } from "../../services/firebase";
import { MaterialIcons } from "@expo/vector-icons";
function FormCadMedc(){

    const navigation = useNavigation()
    const route = useRoute()
    const [data, setData] = useState('')

    const [isLoading, setIsLoading] = useState(false)

    const [formData, setFormData] = useState({
        name: "",
        dosage: "",
        dose: "",
        usageDate: "",
      });
    
        function sendForm(e) {
            e.preventDefault()
            setIsLoading(true)
            addVaccineToPet(route.params.pet.id, formData)
                .then(() => {
                    setTimeout(() => {
                        setIsLoading(false)
                        navigation.navigate('CardMed', {pet: route.params.pet})
                    }, 2000)
                })
        }  

        function mascararData (value){
            // Remove todos os caracteres não numéricos
            const dataNumerica = value.replace(/\D/g, '');
        
            // Verifica se a data possui pelo menos 8 dígitos (dd/mm/yyyy)
            if (dataNumerica.length >= 8) {
              // Extrai os componentes de dia, mês e ano
              const dia = dataNumerica.slice(0, 2);
              const mes = dataNumerica.slice(2, 4);
              const ano = dataNumerica.slice(4, 8);
        
              // Aplica a máscara: dd/mm/yyyy
              const dataMascarada = `${dia}/${mes}/${ano}`;
              setData(dataMascarada);
              setFormData({ ...formData, usageDate: dataMascarada })
            } else {
              setData(dataNumerica);
              setFormData({ ...formData, usageDate: dataMascarada })
            }
        }

    return(
    <>
    {
        (isLoading) ?
        (
            <VStack space={2} h="100%" alignItems="center" justifyContent="center">
              <Spinner size="lg" color="#FE5000" accessibilityLabel="Criando perfil" />
              <Heading fontSize="md" fontFamily="Mont" >
                Adicionando Vacina
              </Heading>
            </VStack>
        ) :
        
        (
        <>
            <Box flexDirection="column" justifyContent="center" textAlign="center">
                    <Heading color="#FE5000" size="md"fontFamily="Mont" py={3}>Vacina</Heading>
            </Box>
            <FormControl isRequired pt={5}>
                    <FormControl.Label >
                    <Text fontFamily="Mont" color="#666666">Qual o nome da Vacina?</Text>
                        </FormControl.Label>
                        <Input
                            type="text"
                            placeholder="v8"
                            py={3}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
        
                        <FormControl.Label>
                        <Text fontFamily="Mont" color="#666666">Qual a dosagem?</Text>
                         </FormControl.Label>
                        <Input
                            type="text"
                            placeholder="5mg"
                            py={3}
                            onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
                        />
                         <FormControl.Label >
                    <Text fontFamily="Mont" color="#666666">Qual a Dose ?</Text>
                        </FormControl.Label>
                        <Select
                            aria-label="Defult sealect example"
                            placeholder="Selecione..."
                            py={3}
                            onValueChange={(itemValue) => setFormData({ ...formData, dose: itemValue })}
                        >
                            <Select.Item value="Dose 1" label="Dose 1" />
                            <Select.Item value="Dose 2" label="Dose 2" />
                            <Select.Item value="Dose 3" label="Dose 3" />
                            <Select.Item value="Dose 4" label="Dose 4" />
                            <Select.Item value="Reforço" label="Reforço" />
                        </Select>
                        
                        <FormControl.Label>
                        <Text fontFamily="Mont" color="#666666">Qual a data do uso?</Text>
                        </FormControl.Label>
                                    <Input
                                        placeholder="Data (dd/mm/yyyy)"
                                        value={data}
                                        onChangeText={mascararData}
                                        maxLength={10}
                                        keyboardType="numeric"
                                    />
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

export default function CadastroVacina(){    

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
                    <Heading alignSelf="center" fontFamily="Mont" color="white">Adicione a vacina</Heading>
                    <Box w={30}></Box>
            </HStack>
           
            <Box h="90%" w="100%" backgroundColor="#FFF" borderTopRadius="10" padding={5}>
                
                <FormCadMedc></FormCadMedc>

            </Box>
        </Box>
      )
  }
