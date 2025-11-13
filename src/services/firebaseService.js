import { db } from '../firebase'
import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
} from 'firebase/firestore'

export async function getProjects() {
  const q = query(collection(db, 'projects'), orderBy('name'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
}

export async function getProject(id) {
  const d = await getDoc(doc(db, 'projects', id))
  return d.exists() ? { id: d.id, ...d.data() } : null
}

export async function addProject(project) {
  const ref = await addDoc(collection(db, 'projects'), project)
  const docSnap = await getDoc(ref)
  return { id: ref.id, ...docSnap.data() }
}

export async function updateProject(id, data) {
  const ref = doc(db, 'projects', id)
  await updateDoc(ref, data)
  const docSnap = await getDoc(ref)
  return { id: docSnap.id, ...docSnap.data() }
}

export async function deleteProject(id) {
  await deleteDoc(doc(db, 'projects', id))
}

export async function getCategories() {
  const snapshot = await getDocs(collection(db, 'categories'))
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
}
