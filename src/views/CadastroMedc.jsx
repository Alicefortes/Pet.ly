import React, { useState, useEffect } from "react";
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
  ScrollView,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { addMedicationToPet, getPetMedications } from "../../services/pets";

function FormCadMedc({ onReload }) {
  const navigation = useNavigation();
  const route = useRoute();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState("");

  const [formData, setFormData] = useState({
    type: "",
    dosage: "",
    usageDate: "",
    notes: "",
  });

  function mascararData(value) {
    const dataNumerica = value.replace(/\D/g, "");
    let dataMascarada = "";

    if (dataNumerica.length <= 2) {
      dataMascarada = dataNumerica;
    } else if (dataNumerica.length <= 4) {
      dataMascarada = `${dataNumerica.slice(0, 2)}/${dataNumerica.slice(2, 4)}`;
    } else {
      dataMascarada = `${dataNumerica.slice(0, 2)}/${dataNumerica.slice(
        2,
        4
      )}/${dataNumerica.slice(4, 8)}`;
    }

    setData(dataMascarada);
    setFormData({ ...formData, usageDate: dataMascarada });
  }

  async function sendForm() {
    setIsLoading(true);
    try {
      await addMedicationToPet(route.params.pet.id, formData);
      onReload(); // Chama a função de reload após adicionar
      navigation.navigate("CardMed", { pet: route.params.pet });
    } catch (error) {
      console.error("Erro ao adicionar medicação:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {isLoading ? (
        <VStack space={2} h="100%" alignItems="center" justifyContent="center">
          <Spinner
            size="lg"
            color="#FE5000"
            accessibilityLabel="Criando perfil"
          />
          <Heading fontSize="md" fontFamily="Mont">
            Adicionando medicação para {route.params.pet.name}
          </Heading>
        </VStack>
      ) : (
        <>
          <Box
            flexDirection="column"
            justifyContent="center"
            textAlign="center"
          >
            <Heading color="#FE5000" size="md" fontFamily="Mont" py={3}>
              Adicionando medicação para {route.params.pet.name}
            </Heading>
          </Box>
          <FormControl isRequired pt={5}>
            <FormControl.Label>
              <Text fontFamily="Mont" color="#666666">
                Qual o tipo de medicação
              </Text>
            </FormControl.Label>
            <Select
              placeholder="Selecione..."
              py={3}
              onValueChange={(itemValue) =>
                setFormData({ ...formData, type: itemValue })
              }
            >
              <Select.Item value="Antibióticos" label="Antibióticos" />
              <Select.Item
                value="Anti-inflamatórios"
                label="Anti-inflamatórios"
              />
              <Select.Item value="Antiparasitários" label="Antiparasitários" />
              <Select.Item value="Antifúngicos" label="Antifúngicos" />
              <Select.Item value="Antivirais" label="Antivirais" />
              <Select.Item value="Analgésicos" label="Analgésicos" />
              <Select.Item
                value="Medicamentos cardíaco"
                label="Medicamentos cardíaco"
              />
              <Select.Item
                value="Medicamentos hormonal"
                label="Medicamentos hormonal"
              />
            </Select>

            <FormControl.Label>
              <Text fontFamily="Mont" color="#666666">
                Qual a dosagem?
              </Text>
            </FormControl.Label>
            <Input
              type="text"
              placeholder="5mg"
              py={3}
              onChangeText={(value) =>
                setFormData({ ...formData, dosage: value })
              }
            />

            <FormControl.Label>
              <Text fontFamily="Mont" color="#666666">
                Qual a data do uso?
              </Text>
            </FormControl.Label>
            <Input
              placeholder="Data (dd/mm/yyyy)"
              value={data}
              onChangeText={mascararData}
              maxLength={10}
              keyboardType="numeric"
            />

            <FormControl.Label>
              <Text fontFamily="Mont" color="#666666">
                Observações
              </Text>
            </FormControl.Label>
            <TextArea
              placeholder="Ex: Aplicação após refeições..."
              py={3}
              onChangeText={(value) =>
                setFormData({ ...formData, notes: value })
              }
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

export default function CadastroMedc() {
  const navigation = useNavigation();
  const route = useRoute();
  const [isReloading, setIsReloading] = useState(false);
  const [medications, setMedications] = useState([]);

  const reloadMedications = async () => {
    setIsReloading(true);
    try {
      const meds = await getPetMedications(route.params.pet.id);
      setMedications(meds);
      console.log(medications);
    } catch (error) {
      console.error("Erro ao carregar medicações:", error);
    } finally {
      setIsReloading(false);
    }
  };

  useEffect(() => {
    reloadMedications();
  }, []);

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
          />
        </Pressable>
        <Heading alignSelf="center" fontFamily="Mont" color="white">
          Adicione a medicação
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
        {isReloading ? (
          <Spinner
            size="lg"
            color="#FE5000"
            accessibilityLabel="Carregando medicações"
          />
        ) : (
          <ScrollView>
            <FormCadMedc onReload={reloadMedications} />
            <VStack space={4} mt={5}>
              {medications.map((medication) => (
                <Box
                  key={medication.id} // Certifique-se de que `id` é único
                  borderWidth={1}
                  borderColor="gray.300"
                  borderRadius={10}
                  p={4}
                  mb={2}
                >
                  <Text fontWeight="bold">Tipo: {medication.type}</Text>
                  <Text>Dosagem: {medication.dosage} mg</Text>
                  <Text>Data de Uso: {medication.usageDate}</Text>
                  <Text>Observações: {medication.notes}</Text>
                </Box>
              ))}
            </VStack>
          </ScrollView>
        )}
      </Box>
    </Box>
  );
}
