import FirestoreWrapper from "../firebase-wrapper/firestore.js";

const firestore = new FirestoreWrapper();

document.addEventListener("DOMContentLoaded", () => {
  // modal.htmlを読み込み
  fetch("userDataEditModal.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById("modalContainer").innerHTML = html;

      const modalBackdrop = document.getElementById("modalBackdrop");
      const modalPanel = document.getElementById("modalPanel");
      const openBtn = document.getElementById("openUserDataEditModal");
      const closeBtn = document.getElementById("cancelModal");
      const postBtn = document.getElementById("postModal");

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

        // 👇 編集ボタンのクリック処理
        postBtn.addEventListener("click", async () => {
          const name = document.getElementById("name")?.value || "";
          const mailAddress = document.getElementById("mailAddress")?.value || "";

          // バリデーションなど必要に応じて追加
          if (!name || !mailAddress) {
            alert("すべての項目を入力してください。");
            return;
          }

          // 仮の処理: 入力内容をログに出力
          console.log("入力されたデータ:", { name, mailAddress });

          const userData = {
            email: mailAddress, // メールアドレス
            name: name, // ユーザー名
            updated: FirestoreWrapper.dateToTimestamp(new Date()),
          };

          // TODO: ここでAPI送信やデータ保存処理を行う
          await firestore.updateDocument("users", mailAddress, userData);

          // モーダルを閉じる
          modalBackdrop.classList.add("hidden");
          modalPanel.classList.add("hidden");
        });

      } else {
        console.error("モーダル要素が正しく読み込まれていません");
      }
    });
});
