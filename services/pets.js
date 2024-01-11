import { doc, getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, where, query, getDoc, arrayUnion } from 'firebase/firestore/lite';
import { db } from "./firebase.js";

// Função para obter uma lista de pets pelo email do tutor
export async function getPetsByEmail(email) {
    const petsQuery = query(collection(db, "pets"), where("tutors", "array-contains", email));
    const petsSnapshot = await getDocs(petsQuery);
    const petsList = petsSnapshot.docs.map(doc => ({ ... doc.data(), id: doc.id}));
    return petsList;
}

export async function getPetById(id) {
    const petDocRef = doc(db, "pets", id);
    const petDocSnapshot = await getDoc(petDocRef);

    if (petDocSnapshot.exists()) {
        const petData = petDocSnapshot.data();
        const pet = { ...petData, id: petDocSnapshot.id };
        return pet;
    } else {
        return null;
    }
}

export async function addMedicationToPet(petId, medicationData) {
    const petRef = doc(db, "pets", petId);
  
    try {
      await updateDoc(petRef, {
        medicines: arrayUnion(medicationData)
      });
    } catch (error) {
      console.error("Erro ao adicionar medicação ao pet:", error);
    }
}

export async function addVaccineToPet(petId, vaccineData) {
    const petRef = doc(db, "pets", petId);
  
    try {
      await updateDoc(petRef, {
        vaccines: arrayUnion(vaccineData)
      });
    } catch (error) {
      console.error("Erro ao adicionar vacina ao pet:", error);
    }
}

// Função para adicionar um novo pet
export async function addPet(petData) {
    try{
        const newPetRef = await addDoc(collection(db, "pets"), petData);
        return newPetRef.id;
    }catch(error){
        return error
    }    
}

// Função para atualizar os dados de um pet
export async function updatePet(petId, updatedPetData) {
    const petRef = doc(db, "pets", petId);
    await updateDoc(petRef, updatedPetData);
}

// Função para excluir um pet
export async function deletePet(petId) {
    const petRef = doc(db, "pets", petId);
    await deleteDoc(petRef);
}