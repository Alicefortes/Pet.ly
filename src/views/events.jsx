import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { EventCard } from "../components/EventCard";
import { getAllNotes, deleteNote } from "../../services/notes"; // Adicionada a função deleteNote

import {
  HStack,
  VStack,
  Box,
  Heading,
  Text,
  Pressable,
  Icon,
  Image,
  ScrollView,
} from "native-base";

import saude from "../../assets/images/check-up.svg";
import banho from "../../assets/images/banho.svg";
import comida from "../../assets/images/alimentacao.svg";
import passeio from "../../assets/images/passeio.svg";

export default function Events() {
  const navigation = useNavigation();

  const [notes, setNotes] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  useEffect(() => {
    (async function getNotesList() {
      try {
        let notesList = await getAllNotes();
        setNotes(notesList);
      } catch (error) {
        console.log(error);
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
    <Box flex={1} bg="#FE5000">
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
        <Heading alignSelf="center" fontFamily="Nunito" color="white">
          Notas
        </Heading>
        <Box w={30}></Box>
      </HStack>
      <Box h="100%" w="100%" py={3} px={5} borderTopRadius="md" bg="white">
        <Text
          padding={2}
          fontFamily="Mont"
          textAlign="center"
          color="rgba(0, 0, 0, 0.6)"
        >
          Não perca de vista os próximos eventos importantes do seu animal de
          estimação.
        </Text>
        <Heading fontSize="xl" fontFamily="Nunito" color="#003DA5" my={5}>
          Próximos eventos
        </Heading>

        <ScrollView w="100%" maxh="15%">
          {notes.length > 0 ? (
            notes.map((note) => (
              <EventCard
                key={note.id}
                note={note}
                onDelete={handleDeleteNote}
              />
            ))
          ) : (
            <Text>Você ainda não tem eventos para seus pet</Text>
          )}
        </ScrollView>

        <Heading fontSize="xl" fontFamily="Nunito" color="#003DA5" my={5}>
          Todas as Categorias
        </Heading>
        <VStack>
          <HStack justifyContent="space-between">
            <Box
              w="48%"
              borderRadius={20}
              h={120}
              bg="#FFF9E0"
              paddingLeft={5}
              justifyContent="center"
            >
              <Image marginBottom={2} source={saude} size="10"></Image>
              <Heading color="rgba(254, 207, 0, 1)" size="sm">
                Saúde
              </Heading>
              <Text fontFamily="Mont" color="rgba(254, 207, 0, 1)">
                Vacinas e Medicações
              </Text>
            </Box>
            <Box
              w="48%"
              borderRadius={20}
              h={120}
              bg="#E6E9F7"
              paddingLeft={5}
              justifyContent="center"
            >
              <Image marginBottom={2} source={banho} size="10"></Image>
              <Heading fontFamily="Mont" color="#003DA5" size="sm">
                Higiene
              </Heading>
              <Text fontFamily="Mont" color="#003DA5">
                Banhos e tosas
              </Text>
            </Box>
          </HStack>
          <HStack
            marginTop={5}
            marginBottom={20}
            justifyContent="space-between"
          >
            <Box
              w="48%"
              borderRadius={20}
              h={120}
              bg="#D4F8EF"
              paddingLeft={5}
              justifyContent="center"
            >
              <Image marginBottom={2} source={comida} size="10"></Image>
              <Heading color="#01DEBB" fontFamily="Mont" size="sm">
                Alimentação
              </Heading>
              <Text color="#01DEBB" fontFamily="Mont">
                Ração e Hidratação
              </Text>
            </Box>
            <Box
              w="48%"
              borderRadius={20}
              h={120}
              bg="#F3E5FD"
              paddingLeft={5}
              justifyContent="center"
            >
              <Image marginBottom={2} source={passeio} size="10"></Image>
              <Heading color="#A83FF1" fontFamily="Mont" size="sm">
                Exercícios
              </Heading>
              <Text color="#A83FF1" fontFamily="Mont">
                Passeios e Brincadeiras
              </Text>
            </Box>
          </HStack>
        </VStack>
        <HStack
          marginTop="10"
          w="100%"
          position="fixed"
          bottom="0%"
          left="0%"
          mb={20}
          px="5%"
          justifyContent="space-between"
        >
          <Box w={30}></Box>
          <Pressable
            onPress={() => navigation.navigate("CadEvents")}
            w="50"
            h="50"
            borderRadius="100%"
            bg="#003DA5"
            alignItems="center"
            justifyContent="center"
          >
            <Icon size="5" as={MaterialIcons} name="add" color="#FFFFFF" />
          </Pressable>
        </HStack>
      </Box>
      <Navbar />
    </Box>
  );
}
