import { collection, getDocs, addDoc, where, query } from 'firebase/firestore/lite';
import { db } from "./firebase.js"

export async function getUsers() {
    const usersCol = collection(db, 'users');
    const usersSnapshot = await getDocs(usersCol);
    const usersList = usersSnapshot.docs.map(doc => ({ ... doc.data(), id: doc.id}));
    return usersList;
}

export async function addUser(user) {
    try {
      const usersCol = collection(db, 'users');
      await addDoc(usersCol, user);
      console.log('Usuário cadastrado com sucesso!');
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
    }
}

export async function verifyUserExists(uId) {

    //Prepara a consulta
    const q = query(collection(db, "users"), where("uId", "==", uId));
    
    try {
        //Captura a consulta
        const docSnapshot = await getDocs(q);

        //Map nos resultados
        //const userData = docSnapshot.docs.map(doc => ({ ... doc.data(), id: doc.id}));

        //Se o retorno não for vazio retorna verdadeiro, se for vazio retorna false
        if(!docSnapshot.empty) {
            return true;
        } else {
            return false;
        }

    } catch (error) {
      console.log('Erro ao verificar usuário no Firestore:', error);
    }
}

export async function verifyEmailExists(email) {

  //Prepara a consulta
  const q = query(collection(db, "users"), where("email", "==", email));
  
  try {
      //Captura a consulta
      const docSnapshot = await getDocs(q);

      //Map nos resultados
      //const userData = docSnapshot.docs.map(doc => ({ ... doc.data(), id: doc.id}));

      //Se o retorno não for vazio retorna verdadeiro, se for vazio retorna false
      if(!docSnapshot.empty) {
          return true;
      } else {
          return false;
      }

  } catch (error) {
    console.log('Erro ao verificar usuário no Firestore:', error);
  }
}