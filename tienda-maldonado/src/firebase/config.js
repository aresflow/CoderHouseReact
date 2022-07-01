import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC9Zcz6fjIsT0_WQqAls0wdQmkcIEO6kbk",
  authDomain: "ecommerce-maldonado.firebaseapp.com",
  projectId: "ecommerce-maldonado",
  storageBucket: "ecommerce-maldonado.appspot.com",
  messagingSenderId: "808651429314",
  appId: "1:808651429314:web:7c9b83d3d0eaefa457b25b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const getFirestoreApp = () => {
    return app;
}

