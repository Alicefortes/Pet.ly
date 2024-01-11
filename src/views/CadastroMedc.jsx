import React, { useState } from "react";
import { Box, HStack, Icon, FormControl, Input, Select, Button, Text, Heading, VStack, Spinner, TextArea,Pressable} from "native-base";
import { Feather} from '@expo/vector-icons';
import { useNavigation, useRoute } from "@react-navigation/native"
import { addMedicationToPet } from "../../services/pets";
import { auth } from "../../services/firebase";
import { MaterialIcons } from '@expo/vector-icons';

function FormCadMedc(){
    const navigation = useNavigation()
    const route = useRoute()

    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState('')


    const [formData, setFormData] = useState({
        type: "",
        dosage: "",
        usageDate: "",
        notes: ""
      });
    
        function sendForm(e) {
            e.preventDefault()
            setIsLoading(true)
            addMedicationToPet(route.params.pet.id, formData)
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
      };

    return(
    <>
    {
        (isLoading) ?
        (
            <VStack space={2} h="100%" alignItems="center" justifyContent="center">
              <Spinner size="lg" color="#FE5000" accessibilityLabel="Criando perfil" />
              <Heading fontSize="md" fontFamily="Mont" >
                Adicionando medicação para {route.params.pet.name}
              </Heading>
            </VStack>
        ) :
        
        (
        <>
            <Box flexDirection="column" justifyContent="center" textAlign="center">
                    <Heading color="#FE5000" size="md"fontFamily="Mont" py={3}>Adicionando medicação para {route.params.pet.name}</Heading>
                </Box>
                    <FormControl isRequired pt={5}>
                    <FormControl.Label >
                    <Text fontFamily="Mont" color="#666666">Qual o tipo de medicação</Text>
                        </FormControl.Label>
                        <Select
                            aria-label="Defult sealect example"
                            placeholder="Selecione..."
                            py={3}
                            onValueChange={(itemValue) => setFormData({ ...formData, type: itemValue })}
                        >
                            <Select.Item value="Antibióticos" label="Antibióticos" />
                            <Select.Item value="Anti-inflamatórios" label="Anti-inflamatórios" />
                            <Select.Item value="Antiparasitários/vermífogo" label="Antiparasitários" />
                            <Select.Item value="Antifúngicos" label="Antifúngicoss" />
                            <Select.Item value="Antivirais" label="Antivirais" />
                            <Select.Item value="Analgésicos" label="Analgésicos" />
                            <Select.Item value="Medicamentos cardíaco" label="Medicamentos cardíaco" />
                            <Select.Item value="Medicamentos hormonal" label="Medicamentos hormonal" />
                        </Select>
        
                        <FormControl.Label>
                        <Text fontFamily="Mont" color="#666666"> Qual a dosagem?</Text>
                         </FormControl.Label>
                        <Input
                            type="text"
                            placeholder="5mg"
                            py={3}
                            onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
                        />
        
        
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
                      <FormControl.Label>
                      <Text fontFamily="Mont" color="#666666">Observações</Text>
                      </FormControl.Label>
                                    <TextArea
                                        type="text"
                                        placeholder="Ex: Aplicação após refeições..."
                                        py={3}
                                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
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

export default function CadastroMedc(){

    const navigation = useNavigation();
    const route = useRoute(); 

   

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
                    <Heading alignSelf="center" fontFamily="Mont" color="white">Adicione a medicação</Heading>
                    <Box w={30}></Box>
            </HStack>
           
            <Box h="90%" w="100%" backgroundColor="#FFF" borderTopRadius="10" padding={5}>
                
                <FormCadMedc></FormCadMedc>

            </Box>
        </Box>
      )
  }
