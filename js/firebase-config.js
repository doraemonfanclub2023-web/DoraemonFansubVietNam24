// Dùng link CDN trực tiếp cho Web thuần
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBt3G9n5JYu3EsvqJR9IoW2vRAc_Es3-ws",
  authDomain: "doraemon-fansub-vietnam.firebaseapp.com",
  projectId: "doraemon-fansub-vietnam",
  storageBucket: "doraemon-fansub-vietnam.appspot.com", // Đã sửa lại đúng đường dẫn chuẩn
  messagingSenderId: "380840935390",
  appId: "1:380840935390:web:60fab4722a9fba5053a74f"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
