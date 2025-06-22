import { firebaseConfig } from "./firebase-config.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// アプリの初期化処理
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ID：authButtonを付与したボタンがクリックされたときの処理
document.getElementById("authButton").addEventListener("click", () => {
  signInAnonymously(auth);
});

// 認証情報が変わったときの処理
onAuthStateChanged(auth, (user) => {
  if (user) {
    alert("ログインしました: " + user.uid);
  }
});
