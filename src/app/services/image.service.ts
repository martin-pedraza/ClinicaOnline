import { Injectable } from '@angular/core';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor() { }

  async uploadImage(image: any,name: string): Promise<string> {
    const storage = getStorage();
    const storageRef = ref(storage, name);
    const snapshot = await uploadBytes(storageRef, image);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  }
}
