import {
  HStack,
  Box,
  VStack,
  View,
  Center,
  Avatar,
  Button,
  Heading,
  Text,
  Icon,
  TextArea,
  Pressable,
  Image,
} from "native-base";
import { MedicalRecord } from "../../components/MedicalRecord";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getPetById } from "../../../services/pets";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { EventCard } from "../../components/EventCard";
import Navbar from "../../components/Navbar";
import { getPetNotes } from "../../../services/notes";
import cat from "../../../assets/images/cat.png";
import dog from "../../../assets/images/dog.png";

export function ImagePet(props) {
  return (
    <HStack>
      {!props.specie ? (
        <Avatar borderWidth={1} borderColor="#fff" bg="#fff" hsize="xl" />
      ) : props.specie == "Gato" ? (
        <Avatar borderWidth={1} borderColor="#FE5000" size="xl" source={cat} />
      ) : (
        <Avatar borderWidth={1} borderColor="#FE5000" size="xl" source={dog} />
      )}
    </HStack>
  );
}

function PetHeader(props) {
  return (
    <HStack w="100%" h={150} bg="white">
      <VStack h="100%">
        <Center h="100%" marginRight={5} alignItems="flex-start">
          <ImagePet specie={props.pet.specie}></ImagePet>
        </Center>
      </VStack>
      <VStack
        justifyContent="center"
        space={1}
        alignItems="flex-start"
        h="100%"
      >
        <HStack space="10%" justifyContent="space-between" alignItems="center">
          <Text fontSize="md" bold>
            {props.pet.name}
          </Text>
          {props.pet.sex === "Macho" ? (
            <HStack alignItems="center">
              <Icon as={Ionicons} name="ios-male" color="#FE5000" size={5} />
              <Text fontSize="sm" color="coolGray.400">
                Macho
              </Text>
            </HStack>
          ) : (
            <HStack>
              <Icon as={Ionicons} name="ios-female" color="#FE5000" size={5} />
              <Text fontSize="sm" color="coolGray.400">
                Fêmea
              </Text>
            </HStack>
          )}
        </HStack>
        <Text color="coolGray.500">{props.pet.specie}</Text>
        <Text color="coolGray.500">{props.pet.breed}</Text>
        <Text color="coolGray.500">
          {props.pet.ageYears} Anos e {props.pet.ageMonths} Meses
        </Text>
      </VStack>
    </HStack>
  );
}

export function PetDetails() {
  const navigation = useNavigation();

  const [petData, setPetData] = useState({});
  const [notes, setNotes] = useState(null);

  const route = useRoute();

  useEffect(() => {
    (async function getPetDoc() {
      try {
        let petDoc = await getPetById(route.params.petId);
        setPetData(petDoc);
      } catch (error) {
        console.log(error);
      }
    })();

    (async function getPetNotesList() {
      try {
        let notesList = await getPetNotes(route.params.petId);
        console.log(notesList);
        setNotes(notesList);
      } catch (error) {
        console.log(error);
      }
    })();
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
        <Icon
          as={Feather}
          name="chevron-left"
          size={30}
          color="#FFF"
          onPress={() => navigation.goBack()}
        ></Icon>
        <Heading alignSelf="center" color="white">
          Detalhes do pet
        </Heading>
        <Box w={30}></Box>
      </HStack>
      <View w="100%" h="100%" borderTopRadius="md" py={3} px={5} bg="white">
        <PetHeader pet={petData}></PetHeader>

        <Heading fontSize="xl" my={3}>
          Ficha médica
        </Heading>
        <MedicalRecord key={petData.id} pet={petData}></MedicalRecord>

        <HStack justifyContent="space-between" alignItems="center">
          <Heading fontSize="xl" color="#003DA5" my={5}>
            Próximos eventos
          </Heading>
          <Pressable
            onPress={() => navigation.navigate("Events")}
            flexDirection="row"
            alignItems="center"
          >
            <Heading color="#FE5000" size="sm">
              Ver todos
            </Heading>
            <Icon
              size="6"
              as={MaterialIcons}
              name="chevron-right"
              color="#323232"
            />
          </Pressable>
        </HStack>

        {notes == null ? (
          <Text mb={10}>Carregando...</Text>
        ) : notes.length == 0 ? (
          <Center w="100%">
            <Text mb={10}>Você ainda não tem eventos para esse pet</Text>
          </Center>
        ) : (
          <EventCard note={notes[0]}></EventCard>
        )}
      </View>
      <Navbar></Navbar>
    </Box>
  );
}
