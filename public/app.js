import { firebaseConfig } from "./firebase-config.js";
import FirestoreWrapper from "./firebase-wrapper/firestore.js";
import AuthWrapper from "./firebase-wrapper/auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
// import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// エミュレーターのホストとポートを設定
export const authEmulatorHost = "http://localhost:9099"; // null にすると本番
export const firestoreEmulatorHost = "http://localhost:8080"; // null にすると本番

// export const authEmulatorHost = null;
// export const firestoreEmulatorHost = null;

// Firebase アプリの初期化
export const app = initializeApp(firebaseConfig);
// export const db  = getFirestore(app);
// Firestore のインスタンスをエクスポート
export const firestore = new FirestoreWrapper(app);
// Auth のインスタンスをエクスポート
export const auth = new AuthWrapper(app);
