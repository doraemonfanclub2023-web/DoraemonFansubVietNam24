import { db, auth } from './firebase-config.js'; // Đảm bảo đã import auth từ file config
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, doc, getDoc, setDoc, deleteDoc, getDocs, where } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const getEl = (id) => document.getElementById(id);
const newsfeedContainer = getEl('newsfeed-container'); // KHAI BÁO 1 LẦN DUY NHẤT Ở ĐÂY

// Hàm upload ảnh
async function uploadToCloudinary(file) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', "tên_preset_của_bồ"); // Thay lại preset của bồ nhé
    try {
        const response = await fetch("https://api.cloudinary.com/v1_1/tên_cloud_của_bồ/image/upload", { method: 'POST', body: formData });
        const data = await response.json();
        return data.secure_url;
    } catch (error) { console.error("Lỗi upload:", error); return null; }
}

// Xử lý đăng bài
const btnSubmitPost = getEl('btn-submit-post');
if (btnSubmitPost) {
    btnSubmitPost.addEventListener('click', async () => {
        const content = getEl('post-content')?.value.trim();
        const file = getEl('post-file')?.files[0];
        const user = auth.currentUser;

        if (!user) return alert("Đăng nhập mới đăng bài được nha!");
        if (!content && !file) return alert('Nhập nội dung hoặc chọn ảnh!');

        try {
            btnSubmitPost.disabled = true;
            let mediaUrl = file ? await uploadToCloudinary(file) : '';
            await addDoc(collection(db, "posts"), {
                uid: user.uid,
                username: user.displayName || "Thành viên",
                avatar: user.photoURL || "https://api.dicebear.com/7.x/bottts/svg?seed=mon",
                content: content,
                mediaUrl: mediaUrl,
                createdAt: serverTimestamp()
            });
            getEl('post-content').value = '';
        } catch (e) { console.error(e); } finally { btnSubmitPost.disabled = false; }
    });
}

// Hiển thị Newsfeed (Đã gộp chung vào 1 khối logic duy nhất)
if (newsfeedContainer) {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    
    onSnapshot(q, async (snapshot) => {
        newsfeedContainer.innerHTML = '';
        
        let likedPosts = [];
        if (auth.currentUser) {
            const qLikes = query(collection(db, "likes"), where("uid", "==", auth.currentUser.uid));
            const likesSnap = await getDocs(qLikes);
            likesSnap.forEach(d => likedPosts.push(d.data().postId));
        }

        snapshot.forEach((docSnap) => {
            const post = docSnap.data();
            const date = post.createdAt ? new Date(post.createdAt.seconds * 1000).toLocaleDateString() : '';
            const isOwner = auth.currentUser && auth.currentUser.uid === post.uid;
            const isLiked = likedPosts.includes(docSnap.id);

            const postCard = `
                <div class="post-item bg-[#16181f] rounded-2xl p-4 border border-gray-800/50 space-y-3">
                    <div class="flex items-center space-x-3">
                        <img src="${post.avatar}" class="w-10 h-10 rounded-full" alt="avatar">
                        <div class="flex-1">
                            <h4 class="font-semibold text-sm text-white">${post.username}</h4>
                            <p class="text-[10px] text-gray-500">${date}</p>
                        </div>
                        <div class="relative group">
                            <button class="text-gray-400 p-2"><i class="fa-solid fa-ellipsis"></i></button>
                            <div class="absolute right-0 mt-0 w-32 bg-[#20232b] rounded-lg hidden group-hover:block z-50 border border-gray-700">
                                ${isOwner ? `<button data-id="${docSnap.id}" class="delete-btn w-full text-left px-4 py-2 text-sm text-red-400">Xóa</button>` : ''}
                            </div>
                        </div>
                    </div>
                    <p class="text-sm text-gray-200 whitespace-pre-line">${post.content}</p>
                    ${post.mediaUrl ? `<img src="${post.mediaUrl}" class="max-h-96 w-full object-cover rounded-xl mt-2" alt="post-img">` : ''}
                    <div class="flex gap-6 mt-3 border-t border-gray-800 pt-3">
                        <button data-id="${docSnap.id}" class="like-btn text-sm ${isLiked ? 'text-blue-500' : 'text-gray-400'}">
                            <i class="fa-thumbs-up mr-1"></i> Like
                        </button>
                    </div>
                </div>
            `;
            newsfeedContainer.insertAdjacentHTML('beforeend', postCard);
        });
    });
}
