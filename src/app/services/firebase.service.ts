import { Injectable } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  addDoc,
  updateDoc,
  query,
  where,
  doc,
} from '@angular/fire/firestore';
import { WhereFilterOp, deleteDoc } from 'firebase/firestore';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private firestore: Firestore) {}

  getList(list: string) {
    const col = collection(this.firestore, list);
    return collectionData(col);
  }

  getListWithAttribute(list: string, attribute: string, value: string) {
    const col = collection(this.firestore, list);
    const filteredCol = query(col, where(attribute, '==', value));
    return collectionData(filteredCol);
  }

  getListWithAttributes(
    list: string,
    attribute1: string,
    value1: string,
    attribute2: string,
    operator: WhereFilterOp,
    value2: string
  ) {
    const col = collection(this.firestore, list);
    const filteredCol = query(
      col,
      where(attribute1, '==', value1),
      where(attribute2, operator, value2)
    );
    return collectionData(filteredCol);
  }

  getListCheckAttribute(
    list: string,
    attribute: string,
    operator: WhereFilterOp,
    value: any
  ) {
    const col = collection(this.firestore, list);
    const filteredCol = query(col, where(attribute, operator, value));
    return collectionData(filteredCol);
  }

  async saveItem(item: any, list: string) {
    const col = collection(this.firestore, list);
    const newDoc = await addDoc(col, item);
    await updateDoc(newDoc, {
      id: newDoc.id,
    });
    return newDoc;
  }

  async updateItem(id: string, data: any, list: string) {
    const col = collection(this.firestore, list);
    const document = doc(col, id);
    await updateDoc(document, data);
    return document;
  }

  deleteItem(id: string, list: string) {
    const col = collection(this.firestore, list);
    const document = doc(col, id);
    deleteDoc(document);
  }
}
