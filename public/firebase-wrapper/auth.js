import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { app } from "../app.js";

class AuthWrapper {
  constructor() {
    this.auth = getAuth(app);
  }

  // ユーザー登録 (Email/Password)
  async register(email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw new Error(`Failed to register: ${error.message}`);
    }
  }

  // ログイン (Email/Password)
  async login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw new Error(`Failed to login: ${error.message}`);
    }
  }

  // ログアウト
  async logout() {
    try {
      await signOut(this.auth);
      return true;
    } catch (error) {
      throw new Error(`Failed to logout: ${error.message}`);
    }
  }

  // 現在のユーザーを取得
  getCurrentUser() {
    return this.auth.currentUser;
  }

  // 認証状態の変更を監視
  onAuthStateChanged(callback) {
    onAuthStateChanged(this.auth, callback);
  }

  // パスワードリセットメールを送信
  async sendPasswordReset(email) {
    try {
      await sendPasswordResetEmail(this.auth, email);
      return true;
    } catch (error) {
      throw new Error(`Failed to send password reset email: ${error.message}`);
    }
  }
}

export default AuthWrapper;
