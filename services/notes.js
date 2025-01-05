import {
  collection,
  getDocs,
  addDoc,
  where,
  query,
  doc,
  deleteDoc,
} from "firebase/firestore/lite";
import { db, auth } from "./firebase.js";

// Recupera todas as notas do usuário logado
export async function getAllNotes() {
  try {
    const notesCol = query(
      collection(db, "notes"),
      where("userEmail", "==", auth.currentUser.email)
    );
    const notesSnapshot = await getDocs(notesCol);
    const notesList = notesSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return notesList;
  } catch (error) {
    console.error("Erro ao recuperar notas:", error);
    return [];
  }
}

// Recupera todas as notas associadas a um pet específico
export async function getPetNotes(petId) {
  try {
    const notesCol = query(
      collection(db, "notes"),
      where("petId", "==", petId)
    );
    const notesSnapshot = await getDocs(notesCol);
    const notesList = notesSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return notesList;
  } catch (error) {
    console.error("Erro ao recuperar notas do pet:", error);
    return [];
  }
}

// Adiciona uma nova nota
export async function addNote(note) {
  try {
    const notesCol = collection(db, "notes");
    await addDoc(notesCol, note);
    console.log("Nota cadastrada com sucesso!");
  } catch (error) {
    console.error("Erro ao cadastrar nota:", error);
  }
}

export async function deleteNote(noteId) {
  try {
    const noteRef = doc(db, "notes", noteId);
    await deleteDoc(noteRef);
    console.log("Nota deletada com sucesso!");
  } catch (error) {
    console.error("Erro ao deletar nota:", error);
  }
}
