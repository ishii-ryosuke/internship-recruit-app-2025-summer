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
  fetch("companyModal.html") //独自のid 使用
    .then((res) => res.text())
    .then((html) => {
      document.getElementById("companyModalContainer").innerHTML = html; //独自のid 使用

      const modalBackdrop = document.getElementById("modal_company_Backdrop"); //独自のid 使用
      const modalPanel = document.getElementById("modal_company_Panel"); //独自のid 使用
      const openBtn = document.getElementById("openCompanyModal"); //独自のid 使用
      const closeBtn = document.getElementById("cancel_company_Modal"); //独自のid 使用
      const postBtn = document.getElementById("post_company_Modal"); //独自のid 使用

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

        // 👇 登録ボタンのクリック処理
        postBtn.addEventListener("click", async () => {
          const currentUser = getCurrentUser();
          console.log(currentUser.email);

          const sample = await firestore.getDocuments("users");
          console.log("users:", sample);

          const user_data = await firestore.getDocuments("users", [
            { field: "email", operator: "==", value: currentUser.email },
          ]);
          const email_data = user_data[0];
          const email = email_data.email;
          const company_name =
            document.getElementById("company_name")?.value || "";
          const place = document.getElementById("place")?.value || "";
          const jobs = document.getElementById("jobs")?.value || "";
          const exp = document.getElementById("exp")?.value || "";

          const companyData = {
            email: email, //E-mail
            company_name: company_name, // 企業名
            place: place, // 所在地
            job: jobs, //業種
            exp: exp, //説明
          };

          try {
            //入力されてた企業名が登録されていれば取得

            const sample = await firestore.getDocuments("companys");
            console.log("companys:", sample);

            const same_name = await firestore.getDocuments("companys", [
              {
                field: "company_name",
                operator: "==",
                value: companyData.company_name,
              },
            ]);

            //未入力エラー
            if (!company_name || !place || !jobs || !exp) {
              alert("すべての項目を入力してください。");
              return;
            } else if (same_name.length !== 0) {
              alert("この企業は既に登録されています。");
              return;
            } else {
              await firestore.createDocument("companys", companyData);
              console.log("regtest");
              alert("企業情報を登録しました");
            }
          } catch (error) {
            // エラー発生時のログ出力とアラート表示
            console.error(
              "ユーザー情報の取得中にエラーが発生しました:",
              error.message
            );
            alert(
              "ユーザー情報の取得に失敗しました。時間を置いて再試行してください。"
            );
          }

          // モーダルを閉じる
          modalBackdrop.classList.add("hidden");
          modalPanel.classList.add("hidden");
        });
      } else {
        console.error("モーダル要素が正しく読み込まれていません");
      }
    });
});
