import { collection, getDocs, addDoc, where, query } from 'firebase/firestore/lite';
import { db, auth } from "./firebase.js"

export async function getAllNotes() {
    try{
        const notesCol = query(collection(db, "notes"), where("userEmail", "==", auth.currentUser.email));
        const notesSnapshot = await getDocs(notesCol);
        const notesList = notesSnapshot.docs.map(doc => ({ ... doc.data(), id: doc.id}));
        return notesList;
    }catch(error){
        console.log('Erro ao recuperar notas')
    }
}

export async function getPetNotes(petId) {
  try{
      const notesCol = query(collection(db, "notes"), where("petId", "==", petId));
      const notesSnapshot = await getDocs(notesCol);
      const notesList = notesSnapshot.docs.map(doc => ({ ... doc.data(), id: doc.id}));
      return notesList;
  }catch(error){
      console.log('Erro ao recuperar notas')
  }
}

export async function addNote(note) {
    try {
      const notesCol = collection(db, 'notes');
      await addDoc(notesCol, note);
      console.log('Nota cadastrada com sucesso!');
    } catch (error) {
      console.error('Erro ao cadastrar nota:', error);
    }
}