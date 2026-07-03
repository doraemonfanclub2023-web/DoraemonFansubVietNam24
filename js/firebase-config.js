// js/firebase-config.js
// ĐÃ SỬA: Thay đổi cách import sang CDN chạy trực tiếp trên trình duyệt
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Cấu hình chuẩn của Doraemon Fansub Việt Nam
const firebaseConfig = {
  apiKey: "AIzaSyBt3G9n5JYu3EsvqJR9IoW2vRAc_Es3-ws",
  authDomain: "doraemon-fansub-vietnam.firebaseapp.com",
  projectId: "doraemon-fansub-vietnam",
  storageBucket: "doraemon-fansub-vietnam.firebasestorage.app",
  messagingSenderId: "380840935390",
  appId: "1:380840935390:web:60fab4722a9fba5053a74f",
  measurementId: "G-0S2Z4XRK0B"
};

// Khởi tạo Firebase (Chỉ gọi duy nhất một lần ở đây)
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Xuất các biến auth và db ra ngoài để file js/auth.js và js/newsfeed.js gọi vào xài
export { auth, db };
