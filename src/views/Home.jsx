import React, { useEffect, useState } from "react";
import { auth } from "../../services/firebase";
import Navbar from "../components/navbar";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { getPetsByEmail } from "../../services/pets";
import { EventCard } from "../components/EventCard";
import { getAllNotes, deleteNote } from "../../services/notes";
import {
  HStack,
  Box,
  View,
  Center,
  ScrollView,
  Heading,
  Text,
  Pressable,
  Icon,
} from "native-base";
import { ImagePet } from "./PetDetails/index";

function HomeActions() {
  const navigation = useNavigation();

  return (
    <Box w="100%" bg="white">
      <HStack>
        <Box flexDirection="row" w="100%" justifyContent="space-between">
          {/* Botões para Pets, Saúde, Notas e Perfil */}
          <Pressable
            bg="#E6E9F7"
            onPress={() => navigation.navigate("Pets")}
            borderRadius="md"
            w="22%"
            h={20}
          >
            <Center h="100%">
              <Box
                alignItems="center"
                justifyContent="center"
                padding={3}
                w={8}
                h={8}
                borderRadius={20}
                borderWidth={1}
                borderColor="#003DA5"
              >
                <Icon as={MaterialIcons} name="pets" size={6} color="#003DA5" />
              </Box>
              <Heading size="sm" color="#003DA5" fontFamily="Mont" mt={2}>
                Pets
              </Heading>
            </Center>
          </Pressable>
          <Pressable
            bg="#FFF9E0"
            onPress={() => navigation.navigate("PetSaude")}
            borderRadius="md"
            w="20%"
            h={20}
          >
            <Center h="100%">
              <Box
                alignItems="center"
                justifyContent="center"
                padding={3}
                w={8}
                h={8}
                borderRadius={20}
                borderWidth={1}
                borderColor="#FECF00"
              >
                <Icon
                  as={MaterialCommunityIcons}
                  name="hospital"
                  size={7}
                  color="#FECF00"
                />
              </Box>
              <Heading size="sm" color="#FECF00" fontFamily="Mont" mt={2}>
                Saúde
              </Heading>
            </Center>
          </Pressable>
          <Pressable
            bg="#F3E5FD"
            onPress={() => navigation.navigate("Events")}
            borderRadius="md"
            w="22%"
            h={20}
          >
            <Center h="100%">
              <Box
                alignItems="center"
                justifyContent="center"
                padding={3}
                w={8}
                h={8}
                borderRadius={20}
                borderWidth={1}
                borderColor="#A83FF1"
              >
                <Icon
                  as={MaterialIcons}
                  name="notes"
                  size={7}
                  color="#A83FF1"
                />
              </Box>
              <Heading size="sm" color="#A83FF1" fontFamily="Mont" mt={2}>
                Notas
              </Heading>
            </Center>
          </Pressable>
          <Pressable
            bg="#D4F8EF"
            onPress={() => navigation.navigate("Perfil")}
            borderRadius="md"
            w="22%"
            h={20}
          >
            <Center h="100%">
              <Box
                alignItems="center"
                justifyContent="center"
                padding={3}
                w={8}
                h={8}
                borderRadius={20}
                borderWidth={1}
                borderColor="#01DEBB"
              >
                <Icon
                  as={MaterialIcons}
                  name="person-outline"
                  size={7}
                  color="#01DEBB"
                />
              </Box>
              <Heading size="sm" color="#01DEBB" fontFamily="Mont" mt={2}>
                Perfil
              </Heading>
            </Center>
          </Pressable>
        </Box>
      </HStack>
    </Box>
  );
}

export default function Home() {
  const [userPets, setUserPets] = useState(null);
  const [notes, setNotes] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async function fetchData() {
      try {
        const petList = await getPetsByEmail(auth.currentUser.email);
        setUserPets(petList);

        const notesList = await getAllNotes();
        setNotes(notesList);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    })();
  }, []);

  const handleDeleteNote = async (noteId) => {
    try {
      await deleteNote(noteId);
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
      console.log("Nota deletada com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar nota:", error);
    }
  };

  return (
    <View flex={1} bg="#FE5000">
      <HStack
        h="10%"
        px={2}
        w="100%"
        color="#FFF"
        justifyContent="space-between"
        alignItems="center"
        textAlign="center"
      >
        <Icon as={MaterialIcons} name="menu" size={7} color="#FFFEF9" />
      </HStack>
      <Box h="100%" bg="white" borderTopRadius="md">
        <View w="100%" py={3} px={5}>
          <Heading color="#003DA5" fontFamily="Nunito" mb={5}>
            Olá, {auth.currentUser.displayName}
          </Heading>
          <HomeActions />
          <HStack justifyContent="space-between" alignItems="center">
            <Heading fontSize="xl" fontFamily="Nunito" color="#003DA5" my={5}>
              Próximos eventos
            </Heading>
            <Pressable
              flexDirection="row"
              alignItems="center"
              onPress={() => navigation.navigate("Events")}
            >
              <Heading fontFamily="Mont" color="#FE5000" size="sm">
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
          {notes === null ? (
            <Text mb={10}>Carregando...</Text>
          ) : notes.length === 0 ? (
            <Center w="100%">
              <Text mb={10}>Você ainda não tem eventos para seus pets</Text>
            </Center>
          ) : (
            <EventCard
              note={notes[0]}
              onDelete={() => handleDeleteNote(notes[0].id)}
            />
          )}
        </View>
      </Box>
      <Navbar />
    </View>
  );
}
