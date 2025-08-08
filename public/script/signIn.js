import AuthWrapper from "../firebase-wrapper/auth.js";

const auth = new AuthWrapper();

/**
 * メールアドレスとパスワードでサインインする
 * @param {Event} event イベントオブジェクト
 */
async function signIn(event) {
  // フォームのデフォルト送信動作をキャンセル
  event.preventDefault();

  // 入力フィールドから値を取得
  const email = document.querySelector('input[type="email"]').value;
  const password = document.querySelector('input[type="password"]').value;

  // 入力内容のチェック
  if (!email || !password) {
    alert("メールアドレスとパスワードを入力してください");
    return;
  }

  try {
    // サインイン処理
    await auth.login(email, password);
    // ホーム画面に遷移する
    moveToHome();
  } catch (error) {
    console.error("Error during sign-in:", error);
    if (error.code === "auth/user-not-found") {
      alert("ユーザーが見つかりません。サインアップしてください。");
    } else if (error.code === "auth/wrong-password") {
      alert("パスワードが間違っています。もう一度お試しください。");
    } else {
      alert(`サインインに失敗しました: ${error.code || "Unknown"} - ${error.message || "No message available"}`);
    }
  }
}

/**
 * ホーム画面に遷移する
 */
function moveToHome() {
  window.location.href = "home.html";
}

// 「Sign In」ボタンがクリックされたときの処理を登録
document.getElementById("signIn").addEventListener("click", signIn);