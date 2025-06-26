import { firebaseConfig } from "./firebase-config.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Firebase アプリの初期化
export const app = initializeApp(firebaseConfig);
// Firestore のインスタンスをエクスポート
export const firestore = getFirestore(app);
