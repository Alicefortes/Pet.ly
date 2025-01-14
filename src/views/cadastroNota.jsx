import React, { useEffect, useState } from "react";
import {
  Box,
  HStack,
  Icon,
  FormControl,
  Input,
  Select,
  Button,
  Text,
  Heading,
  VStack,
  Spinner,
  TextArea,
  Pressable,
} from "native-base";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getPetsByEmail } from "../../services/pets";
import { addNote } from "../../services/notes";
import { auth } from "../../services/firebase";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
function FormCadEvent() {
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState("");

  const navigation = useNavigation();

  function mascararData(value) {
    // Remove todos os caracteres não numéricos
    const dataNumerica = value.replace(/\D/g, "");

    // Verifica se a data possui pelo menos 8 dígitos (dd/mm/yyyy)
    if (dataNumerica.length >= 8) {
      // Extrai os componentes de dia, mês e ano
      const dia = dataNumerica.slice(0, 2);
      const mes = dataNumerica.slice(2, 4);
      const ano = dataNumerica.slice(4, 8);

      // Aplica a máscara: dd/mm/yyyy
      const dataMascarada = `${dia}/${mes}/${ano}`;
      setData(dataMascarada);
      setFormData({ ...formData, date: dataMascarada });
    } else {
      setData(dataNumerica);
      setFormData({ ...formData, date: dataMascarada });
    }
  }

  const [formData, setFormData] = useState({
    petId: "",
    userEmail: auth.currentUser.email,
    type: "",
    name: "",
    desc: "",
    date: "",
  });

  function sendForm(e) {
    e.preventDefault();
    setIsLoading(true);
    addNote(formData).then((result) => {
      setTimeout(() => {
        setIsLoading(false);
        navigation.navigate("Events");
      }, 2000);
    });
  }

  const [userPets, setUserPets] = useState(null);

  useEffect(() => {
    (async function getPetList() {
      try {
        let petList = await getPetsByEmail(auth.currentUser.email);
        console.log(petList);
        setUserPets(petList);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      {isLoading ? (
        <VStack space={2} h="100%" alignItems="center" justifyContent="center">
          <Spinner
            size="lg"
            color="#FE5000"
            accessibilityLabel="Criando perfil"
          />
          <Heading fontSize="md">Criando evento</Heading>
        </VStack>
      ) : (
        <>
          <Box
            flexDirection="column"
            justifyContent="center"
            textAlign="center"
          >
            <Heading color="#FE5000" fontFamily="Nunito" size="md" py={3}>
              Novo evento
            </Heading>
          </Box>
          <FormControl isRequired pt={5}>
            <FormControl.Label>Selecione o Pet</FormControl.Label>
            <Select
              aria-label="Defult sealect example"
              placeholder="Selecione..."
              py={3}
              onValueChange={(itemValue) =>
                setFormData({ ...formData, petId: itemValue })
              }
            >
              {userPets?.map((pet) => (
                <Select.Item key={pet.id} value={pet.id} label={pet.name} />
              ))}
            </Select>

            <FormControl.Label>Selecione o tipo de evento</FormControl.Label>
            <Select
              aria-label="Defult sealect example"
              placeholder="Selecione..."
              py={3}
              onValueChange={(itemValue) =>
                setFormData({ ...formData, type: itemValue })
              }
            >
              <Select.Item value="Saúde" label="Saúde" />
              <Select.Item value="Higiene" label="Higiene" />
              <Select.Item value="Alimentação" label="Alimentação" />
              <Select.Item value="Exercícios" label="Exercícios" />
            </Select>

            <FormControl.Label>
              <Text fontFamily="Mont" color="#666666">
                Nome do evento
              </Text>
            </FormControl.Label>
            <Input
              type="text"
              placeholder="Nome do evento"
              py={3}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />

            <FormControl.Label>
              <Text fontFamily="Mont" color="#666666">
                Descrição do evento
              </Text>
            </FormControl.Label>
            <TextArea
              type="text"
              placeholder="Ex: Banho e tosa, Passeio no parque, etc..."
              py={3}
              onChange={(e) =>
                setFormData({ ...formData, desc: e.target.value })
              }
            />
            <FormControl.Label>
              {" "}
              <Text fontFamily="Mont" color="#666666">
                Data
              </Text>
            </FormControl.Label>
            <Input
              placeholder="Data (dd/mm/yyyy)"
              value={data}
              onChangeText={mascararData}
              maxLength={10}
              keyboardType="numeric"
            />

            <Button
              justifySelf="flex-end"
              onPress={sendForm}
              borderRadius="full"
              marginTop={10}
              backgroundColor="#E54300"
            >
              <Heading size="sm" color="#FFFFFF" fontFamily="Mont">
                Completar
              </Heading>
            </Button>
          </FormControl>
        </>
      )}
    </>
  );
}

export default function CadastroNotas() {
  const navigation = useNavigation();

  return (
    <Box flex={1} backgroundColor="#FE5000">
      <HStack
        h="10%"
        px={2}
        w="100%"
        color="#FFF"
        justifyContent="space-between"
        alignItems="center"
        textAlign="center"
      >
        <Pressable onPress={() => navigation.goBack()}>
          <Icon
            as={MaterialIcons}
            name="chevron-left"
            size={30}
            color="white"
          ></Icon>
        </Pressable>
        <Heading alignSelf="center" color="white">
          Adicione um novo evento
        </Heading>
        <Box w={30}></Box>
      </HStack>

      <Box
        h="90%"
        w="100%"
        backgroundColor="#FFF"
        borderTopRadius="10"
        padding={5}
      >
        <FormCadEvent />
      </Box>
    </Box>
  );
}
