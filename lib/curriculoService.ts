import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import { Curriculo } from "./data";

const COL = "curriculos";

function toIso(value: unknown): string {
  if (value instanceof Timestamp) return value.toDate().toISOString();
  return new Date().toISOString();
}

export async function getCurriculos(): Promise<Curriculo[]> {
  const q = query(collection(db, COL), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({
    id: d.id,
    ...(d.data() as Omit<Curriculo, "id" | "createdAt">),
    createdAt: toIso(d.data().createdAt),
  }));
}

export async function getCurriculoById(id: string): Promise<Curriculo | null> {
  const snap = await getDoc(doc(db, COL, id));
  if (!snap.exists()) return null;
  return {
    id: snap.id,
    ...(snap.data() as Omit<Curriculo, "id" | "createdAt">),
    createdAt: toIso(snap.data().createdAt),
  };
}

export async function createCurriculo(
  data: Omit<Curriculo, "id" | "createdAt">
): Promise<string> {
  const ref = await addDoc(collection(db, COL), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateCurriculo(
  id: string,
  data: Partial<Omit<Curriculo, "id" | "createdAt">>
): Promise<void> {
  await updateDoc(doc(db, COL, id), data);
}

export async function deleteCurriculo(id: string): Promise<void> {
  await deleteDoc(doc(db, COL, id));
}
