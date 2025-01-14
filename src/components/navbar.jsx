import { Box, Center, Flex, Icon, Pressable, Text, VStack } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import React, { useState } from "react";

export default function Navbar() {
  const navigation = useNavigation();

  return (
    <Box
      backgroundColor="white"
      w="100%"
      position="fixed"
      bottom="0%"
      px="5%"
      py="2%"
    >
      <Flex w="100%" direction="row" align="center" justify="space-between">
        <Pressable onPress={() => navigation.navigate("Home")}>
          <VStack>
            <Center>
              <Icon as={MaterialIcons} name="house" size={7} color="#FE5000" />
              <Text color="#FE5000" fontFamily="Mont">
                Home
              </Text>
            </Center>
          </VStack>
        </Pressable>
        <Pressable onPress={() => navigation.navigate("PetSaude")}>
          <VStack>
            <Center>
              <Icon
                as={MaterialIcons}
                name="local-hospital"
                size={7}
                color="#FE5000"
              />
              <Text color="#FE5000" fontFamily="Mont">
                Saúde
              </Text>
            </Center>
          </VStack>
        </Pressable>
        <Pressable onPress={() => navigation.navigate("Pets")}>
          <VStack>
            <Center>
              <Icon as={MaterialIcons} name="pets" size={7} color="#FE5000" />
              <Text color="#FE5000" fontFamily="Mont">
                Pets
              </Text>
            </Center>
          </VStack>
        </Pressable>

        <Pressable onPress={() => navigation.navigate("Events")}>
          <VStack>
            <Center>
              <Icon as={MaterialIcons} name="notes" size={7} color="#FE5000" />
              <Text color="#FE5000" fontFamily="Mont">
                Notas
              </Text>
            </Center>
          </VStack>
        </Pressable>
        <Pressable onPress={() => navigation.navigate("Perfil")}>
          <VStack>
            <Center>
              <Icon
                as={MaterialIcons}
                name="person-outline"
                size={7}
                color="#FE5000"
              />
              <Text color="#FE5000" fontFamily="Mont">
                Perfil
              </Text>
            </Center>
          </VStack>
        </Pressable>
      </Flex>
    </Box>
  );
}
