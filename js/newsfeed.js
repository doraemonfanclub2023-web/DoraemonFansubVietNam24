// 1. Cập nhật import ở đầu file:
import { auth, db } from './firebase-config.js';
import { cloudinaryConfig, CLOUDINARY_URL } from './cloudinary-config.js';
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot, doc, deleteDoc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// ... (phần giữ nguyên)

// 2. Thay thế phần Xử lý Like trong đoạn code render:
newsfeedContainer.querySelectorAll('.like-btn').forEach(btn => {
    btn.onclick = async () => {
        if (!auth.currentUser) return alert("Đăng nhập mới like được nha!");
        
        const postId = btn.dataset.id;
        const userId = auth.currentUser.uid;
        const likeRef = doc(db, "likes", `${postId}_${userId}`);
        
        // Kiểm tra xem đã like chưa
        const likeSnap = await getDoc(likeRef);

        if (likeSnap.exists()) {
            // Đã like -> Bỏ like
            await deleteDoc(likeRef);
            btn.classList.remove('text-blue-500');
            btn.classList.add('text-gray-400');
            btn.querySelector('i').className = "fa-regular fa-thumbs-up mr-1";
        } else {
            // Chưa like -> Thêm like
            await setDoc(likeRef, {
                postId: postId,
                uid: userId,
                createdAt: serverTimestamp()
            });
            btn.classList.add('text-blue-500');
            btn.classList.remove('text-gray-400');
            btn.querySelector('i').className = "fa-solid fa-thumbs-up mr-1";
        }
    };
});
