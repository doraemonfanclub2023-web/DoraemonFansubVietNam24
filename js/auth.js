// js/auth.js
import { auth } from './firebase-config.js';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged,
    updateProfile 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// ... (Các đoạn khai báo biến phía trên giữ nguyên, không cần sửa) ...

// Lắng nghe trạng thái đăng nhập Realtime (Đã gộp chuẩn)
onAuthStateChanged(auth, (user) => {
    // Lấy các element liên quan
    const btnPost = document.getElementById('btn-open-post-modal');
    
    if (user) {
        // --- TRẠNG THÁI: ĐÃ ĐĂNG NHẬP ---
        if (btnOpenAuth) btnOpenAuth.classList.add('hidden');
        if (userLoggedInZone) userLoggedInZone.classList.remove('hidden');
        
        // Cập nhật thông tin Header & Side
        if (userDisplayName) userDisplayName.innerText = user.displayName || "Thành viên";
        if (userAvatar) userAvatar.src = user.photoURL || `https://api.dicebear.com/7.x/bottts/svg?seed=mon`;
        if (sideUserName) sideUserName.innerText = user.displayName || "Thành viên";
        if (sideUserAvatar) sideUserAvatar.src = user.photoURL || `https://api.dicebear.com/7.x/bottts/svg?seed=mon`;

        // Mở khóa nút Tạo bài viết
        if (btnPost) {
            btnPost.disabled = false;
            btnPost.classList.remove('bg-gray-800', 'text-gray-500', 'cursor-not-allowed');
            btnPost.classList.add('bg-[#248a3d]', 'text-white');
            btnPost.innerHTML = '<i class="fa-solid fa-pen-nib"></i> Tạo bài viết';
        }
    } else {
        // --- TRẠNG THÁI: CHƯA ĐĂNG NHẬP ---
        if (btnOpenAuth) btnOpenAuth.classList.remove('hidden');
        if (userLoggedInZone) userLoggedInZone.classList.add('hidden');
        
        // Reset về trạng thái Khách
        if (sideUserName) sideUserName.innerText = "Khách ẩn danh";
        if (sideUserAvatar) sideUserAvatar.src = `https://api.dicebear.com/7.x/bottts/svg?seed=mon`;

        // Khóa nút Tạo bài viết
        if (btnPost) {
            btnPost.disabled = true;
            btnPost.classList.add('bg-gray-800', 'text-gray-500', 'cursor-not-allowed');
            btnPost.classList.remove('bg-[#248a3d]', 'text-white');
            btnPost.innerHTML = '<i class="fa-solid fa-lock text-xs"></i> Đăng nhập để tạo bài';
        }
    }
});

// ... (Giữ nguyên đoạn xử lý btnLogout phía dưới) ...
