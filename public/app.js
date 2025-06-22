import { firebaseConfig } from "./firebase-config.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// Firebase アプリの初期化
export const app = initializeApp(firebaseConfig);
// Firestore のインスタンスをエクスポート
export const firestore = getFirestore(app);

// TODO:動作確認用のため用削除。ID：authButtonを付与したボタンがクリックされたときの処理
document.getElementById("authButton").addEventListener("click", () => {
  signInAnonymously(auth);
});

// TODO:動作確認用のため用削除。認証情報が変わったときの処理
onAuthStateChanged(auth, (user) => {
  if (user) {
    alert("ログインしました: " + user.uid);
  }
});
