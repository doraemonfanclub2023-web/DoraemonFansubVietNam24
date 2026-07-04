import { auth } from './firebase-config.js';
import { 
    signInWithEmailAndPassword, createUserWithEmailAndPassword, 
    updateProfile, onAuthStateChanged, signOut 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const btnAuthSubmit = document.getElementById('btnAuthSubmit');
const authModal = document.getElementById('auth-modal');
const btnToggleAuth = document.getElementById('btn-toggle-auth'); // Nút chuyển đổi
const authUsername = document.getElementById('auth-username');
let isSignUp = false; // Biến đánh dấu trạng thái

// 1. Chuyển đổi giữa Đăng nhập và Đăng ký
btnToggleAuth.addEventListener('click', () => {
    isSignUp = !isSignUp;
    authUsername.classList.toggle('hidden', !isSignUp); 
    btnAuthSubmit.innerText = isSignUp ? "Đăng Ký" : "Đăng Nhập";
    btnToggleAuth.innerText = isSignUp ? "Đã có tài khoản? Đăng nhập ngay" : "Chưa có tài khoản? Đăng ký ngay";
});

// 2. Xử lý nút bấm Đăng nhập/Đăng ký
btnAuthSubmit.addEventListener('click', async () => {
    const email = document.getElementById('auth-email').value;
    const password = document.getElementById('auth-password').value;
    const username = document.getElementById('auth-username').value;
    
    try {
        if (isSignUp) {
            // Logic Đăng ký
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, { displayName: username });
            alert("Đăng ký thành công!");
        } else {
            // Logic Đăng nhập
            await signInWithEmailAndPassword(auth, email, password);
            alert("Đăng nhập thành công!");
        }
        authModal.classList.add('hidden');
        location.reload(); 
    } catch (e) {
        alert("Lỗi: " + e.message);
    }
});

// 3. Hiển thị UI khi đã đăng nhập
onAuthStateChanged(auth, (user) => {
    if (user) {
        document.getElementById('user-logged-in').classList.remove('hidden');
        document.getElementById('btn-open-auth-modal').classList.add('hidden');
        document.getElementById('user-display-name').innerText = user.displayName || "Thành viên";
    }
});

document.getElementById('btn-open-auth-modal').onclick = () => authModal.classList.remove('hidden');
document.getElementById('btn-logout').onclick = () => signOut(auth).then(() => location.reload());
