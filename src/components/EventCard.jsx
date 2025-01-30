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

export function EventCard(props) {
  const dataString = props.note.date;
  const dataFormat = dataString.slice(0, 5);

  const [petData, setPetData] = useState(null);

  useEffect(() => {
    (async function getPetDoc() {
      try {
        let petDoc = await getPetById(props.note.petId);
        setPetData(petDoc);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <Box w="100%" mb={5}>
      <HStack>
        <VStack w="30%">
          <Heading size="md" fontFamily="Mont" color="#FE5000">
            {dataFormat}
          </Heading>
          <Text fontFamily="Mont" color="#00000066">
            14:00
          </Text>
          <Heading fontFamily="Mont" size="sm">
            {props.note.type}
          </Heading>
        </VStack>
        <Pressable bg="#FE5000" h="100%" padding="2%" borderRadius="12" w="70%">
          <HStack justifyContent="space-between">
            <Heading color="#FFFFFF" size="md" fontFamily="Mont">
              {props.note.name}
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
      </HStack>
    </Box>
  );
}
