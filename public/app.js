import { firebaseConfig } from "./firebase-config.js";
import FirestoreWrapper from "./firebase-wrapper/firestore.js";
import AuthWrapper from "./firebase-wrapper/auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// エミュレーターのホストとポートを設定
export const authEmulatorHost = "http://localhost:9099";        // null にすると本番
export const firestoreEmulatorHost = "http://localhost:8080";  // null にすると本番

// Firebase アプリの初期化
export const app = initializeApp(firebaseConfig);
// Firestore のインスタンスをエクスポート
export const firestore = new FirestoreWrapper(app);
// Auth のインスタンスをエクスポート
export const auth = new AuthWrapper(app);

// TODO:動作確認用のため用削除。ID：authButtonを付与したボタンがクリックされたときの処理
document.getElementById("authButton").addEventListener("click", async () => {
  try {
    const user = await auth.login("test@example.com", "Password123");
    console.log("ログイン成功:", user.uid);
  } catch (e) {
    console.error("ログイン失敗:", e);
  }
});

// TODO:動作確認用のため用削除。認証情報が変わったときの処理
onAuthStateChanged(auth, (user) => {
  if (user) {
    alert("ログインしました: " + user.uid);
  }
});
