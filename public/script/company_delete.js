import AuthWrapper from "../firebase-wrapper/auth.js";
import FirestoreWrapper from "../firebase-wrapper/firestore.js";
import { getCurrentUser, onUserChange } from "../auth/authState.js";

const auth = new AuthWrapper();
const firestore = new FirestoreWrapper();

/**
 * Firestore にユーザー情報を保存する
 * @param {string} company_name 企業名
 * @param {string} place  所在地
 * @param {string} job 業種
 * @param {string} exp 説明
 */

document.addEventListener("DOMContentLoaded", () => {
  // modal.htmlを読み込み
  fetch("company_delete.html") //独自のid 使用
    .then((res) => res.text())
    .then((html) => {
      document.getElementById("deleteModalContainer").innerHTML = html; //独自のid 使用

      const modalBackdrop = document.getElementById("deleteBackdrop"); //独自のid 使用
      const modalPanel = document.getElementById("deletePanel"); //独自のid 使用
      const openBtn = document.getElementById("delete"); //独自のid 使用
      const closeBtn = document.getElementById("canceldelete"); //独自のid 使用
      const postBtn = document.getElementById("postdelete"); //独自のid 使用

      if (modalBackdrop && modalPanel && openBtn && closeBtn && postBtn) {
        openBtn.addEventListener("click", () => {
          modalBackdrop.classList.remove("hidden");
          modalPanel.classList.remove("hidden");
        });

        closeBtn.addEventListener("click", () => {
          modalBackdrop.classList.add("hidden");
          modalPanel.classList.add("hidden");
        });

        modalBackdrop.addEventListener("click", () => {
          modalBackdrop.classList.add("hidden");
          modalPanel.classList.add("hidden");
        });
      }

      // 👇 編集ボタンのクリック処理
      postBtn.addEventListener("click", async () => {
        const name = document.getElementById("name")?.value || "";

        firestore.deleteDocument("companys", company.id);
        alert("企業情報を削除しました");

        // 仮の処理: 入力内容をログに出力
        console.log("入力されたデータ:", { name });
        // モーダルを閉じる
        modalBackdrop.classList.add("hidden");
        modalPanel.classList.add("hidden");
      });
    });
});
