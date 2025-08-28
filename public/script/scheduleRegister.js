import AuthWrapper from "../firebase-wrapper/auth.js";
import FirestoreWrapper from "../firebase-wrapper/firestore.js";
import { loadAndDisplayUserInfo } from "./header.js";

const auth = new AuthWrapper();
const firestore = new FirestoreWrapper();

document.addEventListener("DOMContentLoaded", () => {
  fetch("scheduleRegister.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById("schedule_modalContainer").innerHTML = html;

      const modalBackdrop = document.getElementById("schedule_modalBackdrop");
      const modalPanel = document.getElementById("schedule_modalPanel");
      const openBtn = document.getElementById("schedule_openUserDataEditModal");
      const closeBtn = document.getElementById("schedule_cancelModal");
      const postBtn = document.getElementById("schedule_postModal");

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

        postBtn.addEventListener("click", async () => {

          const start = document.getElementById("start-time").value;
          const end = document.getElementById("end-time").value;
          const title = document.getElementById("te-ma").value;
          const startday = document.getElementById("start-day").value;
          const endday = document.getElementById("end-day").value;
          const location = document.getElementById("location").value;
          const memo = document.getElementById("memo").value;

          // 入力バリデーション
          if (!title && !startday && !start && !endday && !end) {
            alert("必要事項をすべて入力してください。");
            return;
          }
          else if (title === "") {
             alert("タイトルを入力してください。");
              return; 
            } 
          else if (startday === "") {
             alert("開始日を入力してください。"); 
             return;
             } 
          else if (start === "") { 
              alert("開始時間を入力してください。"); 
              return;
             }
          else if (endday === "") {
               alert("終了日を入力してください。");
                return;
               }
          else if (end === "") { 
                alert("終了時間を入力してください。"); 
                return;
               }

          if (endday < startday) {
            alert("終了日は開始日より後に設定してください。");

            return;
          }

          const startTime = new Date(`1970-01-01T${start}:00`);
          const endTime = new Date(`1970-01-01T${end}:00`);
          if (startday === endday && endTime <= startTime) {
            alert("終了時間は開始時間より後に設定してください。");
            return;
          }

          // 現在のユーザーを取得
const currentUser = auth.getCurrentUser();

try {
  // Firestoreからuser情報を取得
  const users = await firestore.getDocuments("users", [
    { field: "email", operator: "==", value: currentUser.email }
  ]);

  if (users.length === 0) {
    alert("ユーザー情報が見つかりません。");
    return;
  }

  const userData = users[0];

  // スケジュールデータ作成
  const scheduleData = {
    email: userData.email,
    title: title,
    start_day: startday,
    start_time: start,
    end_day: endday,
    end_time: end,
    place: location,
    memo: memo,
    created: FirestoreWrapper.dateToTimestamp(new Date())
  };

  await firestore.createDocument("schedule", scheduleData);

  alert("就活の予定が登録できました。");

  loadAndDisplayUserInfo();

  modalBackdrop.classList.add("hidden");
  modalPanel.classList.add("hidden");

} catch (error) {
  console.error("スケジュール登録時のエラー:", error);
  alert("スケジュール登録に失敗しました。");
}
        }); // ← postBtn.addEventListener の終了

      } else {
        console.error("モーダル要素が正しく読み込まれていません");
      }
    });
}); // ← DOMContentLoaded の終了

