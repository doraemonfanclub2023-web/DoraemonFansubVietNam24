import { auth } from './firebase-config.js';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    updateProfile, 
    onAuthStateChanged, 
    signOut 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Khai báo các biến DOM
const btnAuthSubmit = document.getElementById('btnAuthSubmit'); // Nút này bồ cần thêm id vào HTML nếu chưa có
const authModal = document.getElementById('auth-modal'); // Cần có modal id này
let isSignUpMode = false; // Mặc định là đăng nhập

// Lắng nghe trạng thái đăng nhập
onAuthStateChanged(auth, (user) => {
    const userLoggedIn = document.getElementById('user-logged-in');
    const btnOpenAuth = document.getElementById('btn-open-auth-modal');
    const postButton = document.getElementById('btn-open-post-modal');

    if (user) {
        // Đã đăng nhập
        userLoggedIn?.classList.remove('hidden');
        btnOpenAuth?.classList.add('hidden');
        if (postButton) {
            postButton.disabled = false;
            postButton.classList.remove('bg-gray-800', 'text-gray-500', 'cursor-not-allowed');
            postButton.classList.add('bg-blue-600', 'text-white');
        }
        document.getElementById('user-display-name').innerText = user.displayName || "Thành viên";
        document.getElementById('user-avatar').src = user.photoURL || "";
    } else {
        // Chưa đăng nhập
        userLoggedIn?.classList.add('hidden');
        btnOpenAuth?.classList.remove('hidden');
        if (postButton) {
            postButton.disabled = true;
            postButton.classList.add('bg-gray-800', 'text-gray-500', 'cursor-not-allowed');
        }
    }
});

// Xử lý sự kiện click Đăng nhập/Đăng ký
btnAuthSubmit?.addEventListener('click', async () => {
    const email = document.getElementById('auth-email')?.value.trim();
    const password = document.getElementById('auth-password')?.value.trim();
    const username = document.getElementById('auth-username')?.value.trim();

    if (!email || !password) return alert("Vui lòng nhập đầy đủ thông tin!");
    if (password.length < 6) return alert("Mật khẩu phải từ 6 ký tự trở lên!");

    try {
        btnAuthSubmit.disabled = true;
        btnAuthSubmit.innerText = "Đang xử lý...";

        if (isSignUpMode) {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, {
                displayName: username,
                photoURL: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(username)}`
            });
            alert("✅ Tạo tài khoản thành công!");
        } else {
            await signInWithEmailAndPassword(auth, email, password);
            alert("✅ Đăng nhập thành công!");
        }
        authModal?.classList.add('hidden');
    } catch (error) {
        alert("Lỗi: " + error.message);
    } finally {
        btnAuthSubmit.disabled = false;
        btnAuthSubmit.innerText = isSignUpMode ? "Đăng Ký" : "Đăng Nhập";
    }
});

// Xử lý đăng xuất
document.getElementById('btn-logout')?.addEventListener('click', () => signOut(auth));
