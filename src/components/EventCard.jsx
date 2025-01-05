import { useEffect, useState } from "react";
import {
  HStack,
  VStack,
  Box,
  Heading,
  Text,
  Pressable,
  Icon,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { getPetById } from "../../services/pets";

export function EventCard({ note, onDelete }) {
  const dataString = note.date;
  const dataFormat = dataString.slice(0, 5);

  const [petData, setPetData] = useState(null);

  useEffect(() => {
    (async function getPetDoc() {
      try {
        const petDoc = await getPetById(note.petId);
        setPetData(petDoc);
      } catch (error) {
        console.error("Erro ao buscar dados do pet:", error);
      }
    })();
  }, [note.petId]);

  return (
    <Box w="100%" mb={5}>
      <HStack>
        {/* Data e Tipo */}
        <VStack w="30%">
          <Heading size="md" fontFamily="Mont" color="#FE5000">
            {dataFormat}
          </Heading>
          <Heading fontFamily="Mont" size="sm">
            {note.type}
          </Heading>
        </VStack>

        {/* Card do Evento */}
        <Pressable bg="#FE5000" h="100%" padding="2%" borderRadius="12" w="60%">
          <HStack justifyContent="space-between">
            <Heading color="#FFFFFF" size="md" fontFamily="Mont">
              {note.name}
            </Heading>
            <Icon
              size="6"
              as={MaterialIcons}
              name="notifications-active"
              color="#FFFFFF"
            />
          </HStack>
          <Text color="#FFFFFF" fontFamily="Mont">
            {petData ? petData.name : "carregando..."}
          </Text>
        </Pressable>
        <Pressable onPress={() => onDelete(note.id)} ml={3}>
          <Icon as={MaterialIcons} name="delete" size="6" color="red.500" />
        </Pressable>
      </HStack>
    </Box>
  );
}
