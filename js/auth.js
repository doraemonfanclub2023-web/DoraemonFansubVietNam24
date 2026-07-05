import { auth } from './firebase-config.js';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Xử lý Đăng nhập
document.getElementById('btnAuthSubmit').addEventListener('click', async () => {
    const email = document.getElementById('auth-email').value;
    const password = document.getElementById('auth-password').value;
    try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Đăng nhập thành công!");
        location.reload(); 
    } catch (e) {
        alert("Lỗi: " + e.message);
    }
});

// Xử lý Quên mật khẩu (Chỉ giữ một đoạn này thôi)
const btnForgotPassword = document.getElementById('btn-forgot-password');
if (btnForgotPassword) {
    btnForgotPassword.addEventListener('click', async () => {
        const email = document.getElementById('auth-email').value.trim();
        if (!email) return alert("Bồ vui lòng nhập email vào ô trên trước nhé!");
        
        try {
            await sendPasswordResetEmail(auth, email);
            alert("Đã gửi email khôi phục mật khẩu. Bồ kiểm tra hộp thư nhé!");
        } catch (error) {
            alert("Có lỗi xảy ra: " + error.message);
        }
    });
}
