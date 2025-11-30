import { db } from "./config";
import {
  collection,
  query,
  getDocs,
  limit,
  startAfter,
  orderBy,
  where,
  type DocumentData,
  DocumentSnapshot,
  QueryConstraint,
  doc,
  getDoc,
} from "firebase/firestore";

export interface Review {
  reviewer: string;
  rating: number;
  comment: string;
}

export interface Psychologist {
  id: string;
  name: string;
  avatar_url: string;
  experience: string;

  reviews: Review[];
  price_per_hour: number;
  rating: number;
  license: string;
  specialization: string;
  initial_consultation: string;
  about: string;
}

export type SortField = "name" | "price_per_hour" | "rating";
export type SortDirection = "asc" | "desc";
export type PriceFilter = "less_than_10" | "greater_than_10" | "all";

const PAGE_SIZE = 3;
let lastDoc: DocumentSnapshot<DocumentData> | null = null;

export const fetchPsychologists = async (
  reset: boolean = false,
  sortField: SortField = "rating",
  sortDirection: SortDirection = "desc",
  priceFilter: PriceFilter = "all"
) => {
  if (reset) {
    lastDoc = null;
  }

  const psychologistsRef = collection(db, "psychologists");
  const queryArgs: QueryConstraint[] = [];

  if (priceFilter === "less_than_10") {
    queryArgs.push(where("price_per_hour", "<=", 10));
  } else if (priceFilter === "greater_than_10") {
    queryArgs.push(where("price_per_hour", ">", 10));
  }

  queryArgs.push(orderBy(sortField, sortDirection));

  if (lastDoc) {
    queryArgs.push(startAfter(lastDoc));
  }

  queryArgs.push(limit(PAGE_SIZE));

  const finalQuery = query(psychologistsRef, ...queryArgs);

  const querySnapshot = await getDocs(finalQuery);

  if (!querySnapshot.empty) {
    lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
  } else {
    lastDoc = null;
  }

  const psychologists: Psychologist[] = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as Omit<Psychologist, "id">),
  }));

  return {
    data: psychologists,
    hasMore: !!lastDoc,
  };
};

export const fetchPsychologistsByIds = async (ids: string[]) => {
  if (!ids || ids.length === 0) return [];

  try {
    const docRefs = ids.map(id => doc(db, "psychologists", id));
    const docSnaps = await Promise.all(docRefs.map(getDoc));

    const psychologists: Psychologist[] = docSnaps
      .filter(snap => snap.exists())
      .map(snap => ({
        id: snap.id,
        ...(snap.data() as Omit<Psychologist, "id">),
      }));

    return psychologists;
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return [];
  }
};