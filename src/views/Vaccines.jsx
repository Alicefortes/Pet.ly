import React, { useState } from "react";
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
import { useNavigation, useRoute } from "@react-navigation/native";

import { MaterialIcons } from "@expo/vector-icons";

export default function Vaccines() {
  const navigation = useNavigation();
  const route = useRoute();
  console.log(route);
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
          ></Icon>
        </Pressable>
        <Heading alignSelf="center" fontFamily="Nunito" color="white">
          Vacinas
        </Heading>
        <Box w={30}></Box>
      </HStack>
      <Box w="100%" h="100%" py={3} px={5} borderTopRadius="md" bg="white">
        <Heading size="md" fontFamily="Mont" color="#003DA5" my={5}>
          Últimas vacinas
        </Heading>
        <Pressable
          onPress={() =>
            navigation.navigate("CadastroVacina", { pet: route.params.pet })
          }
          w="120"
          h={10}
          borderRadius="20"
          justifyContent="center"
          alignItems="center"
          backgroundColor="#FE5000"
        >
          <Text fontFamily="Mont" color="white">
            Adicionar{" "}
          </Text>
        </Pressable>
        <VStack w="100%" my={5} space={2}>
          {route.params.pet.vaccines?.map((vac) => (
            <Box
              padding={8}
              borderWidth={1}
              borderRadius={10}
              borderColor="#FE5000"
              alignItems="center"
              justifyContent="center"
            >
              <Heading fontFamily="Mont" size="sm">
                {vac.name}
              </Heading>
              <Text fontFamily="Mont">{vac.dosage}</Text>
              <Text fontFamily="Mont">{vac.dose}</Text>
              <Text fontFamily="Mont">{vac.usageDate}</Text>
            </Box>
          ))}
        </VStack>
      </Box>
    </Box>
  );
}
