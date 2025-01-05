import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import {
  ScrollView,
  Box,
  Text,
  Spinner,
  HStack,
  Heading,
  Pressable,
  Icon,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { EventCard } from "../components/EventCard";
import { getAllNotes, deleteNote } from "../../services/notes";

export default function Events() {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    (async function getNotesList() {
      try {
        const notesList = await getAllNotes();
        setNotes(notesList);
      } catch (error) {
        console.error("Erro ao recuperar notas:", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const handleDeleteNote = async (noteId) => {
    setIsDeleting(true);
    try {
      await deleteNote(noteId);
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
      console.log("Nota deletada com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar nota:", error);
    } finally {
      setIsDeleting(false);
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
        <Pressable onPress={() => console.log("Navegar de volta")}>
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

        {isLoading ? (
          <Box alignItems="center" justifyContent="center">
            <Spinner size="lg" color="#FE5000" />
            <Text mt={2}>Carregando notas...</Text>
          </Box>
        ) : (
          <ScrollView w="100%" maxH="70%">
            {notes.length > 0 ? (
              notes.map((note) => (
                <EventCard
                  key={note.id}
                  note={note}
                  onDelete={() => handleDeleteNote(note.id)}
                />
              ))
            ) : (
              <Text textAlign="center" mt={4}>
                Nenhuma nota encontrada.
              </Text>
            )}
          </ScrollView>
        )}

        {isDeleting && (
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bg="rgba(0,0,0,0.5)"
            justifyContent="center"
            alignItems="center"
          >
            <Spinner size="lg" color="white" />
            <Text color="white" mt={2}>
              Excluindo nota...
            </Text>
          </Box>
        )}
      </Box>

      <Navbar />
    </Box>
  );
}
