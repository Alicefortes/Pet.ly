import React from "react";
import { Button, Text } from "native-base";
import { signInWithPopup, getRedirectResult } from "firebase/auth";
import { addUser, verifyUserExists } from "../../services/users";
import { auth, provider } from "../../services/firebase";

export default function LoginButton() {
  async function registerUser(user) {
    let userExist = await verifyUserExists(user.uid);
    if (userExist) {
      console.log("Usuário já registrado: ", user.displayName);
    } else {
      console.log("Novo cadastro realizado!");

      // Início cadastro de usuários
      let user_infos = {
        name: user.displayName,
        email: user.email,
        uId: user.uid,
        photoUrl: user.photoURL,
      };
      addUser(user_infos);
      // Fim cadastro de usuários
    }
  }

  async function signIn() {
    try {
      result = await signInWithPopup(auth, provider);
      // const result = await getRedirectResult(auth);
      const user = result.user;
      await registerUser(user);
    } catch (error) {
      console.log("Promise Rejected:", error.message);
    }
  }

  return (
    <Button
      onPress={signIn}
      borderRadius="full"
      backgroundColor="white"
      borderColor="#FE5000"
      borderWidth="1"
    >
      <Text color="#FE5000" fontFamily="Mont">
        Login com Google
      </Text>
    </Button>
  );
}
