// app.js
import FirestoreWrapper from "../firebase-wrapper/firestore.js";

// HTML内のコンテナ要素を取得
const companyListContainer = document.getElementById("company-list-container");

// FirestoreWrapperのインスタンスを作成
const firestore = new FirestoreWrapper();

// モーダルが作動するコンテナ
const deleteModalContainer = document.getElementById("deleteModalContainer");

// モーダル関連の要素を格納する変数
let modalElements;
let docIdToDelete;

// モーダルを開く関数
window.openDeleteModal = (docId) => {
  docIdToDelete = docId;
  if (modalElements && modalElements.backdrop) {
    modalElements.backdrop.classList.remove("hidden");
    modalElements.panel.classList.remove("hidden");
  }
};

// モーダルを閉じる関数
const closeModal = () => {
  if (modalElements && modalElements.backdrop) {
    modalElements.backdrop.classList.add("hidden");
    modalElements.panel.classList.add("hidden");
    docIdToDelete = null; // IDをリセット
  }
};

/**
 * モーダルを初期化し、イベントリスナーを設定する関数
 */
const initModal = () => {
  fetch("company_delete.html")
    .then((res) => res.text())
    .then((html) => {
      deleteModalContainer.innerHTML = html;

      // モーダル関連の要素を取得
      modalElements = {
        backdrop: document.getElementById("deleteBackdrop"),
        panel: document.getElementById("deletePanel"),
        closeBtn: document.getElementById("canceldelete"),
        postBtn: document.getElementById("postdelete"),
      };

      // イベントリスナーを設定
      if (
        modalElements.backdrop &&
        modalElements.panel &&
        modalElements.closeBtn &&
        modalElements.postBtn
      ) {
        // モーダルを閉じる処理
        modalElements.closeBtn.addEventListener("click", () => closeModal());
        modalElements.backdrop.addEventListener("click", () => closeModal());

        // モーダル内の削除ボタンがクリックされた時の処理
        modalElements.postBtn.addEventListener("click", async () => {
          if (docIdToDelete) {
            try {
              await firestore.deleteDocument("company", docIdToDelete);
              console.log(
                "ドキュメントが正常に削除されました！ID:",
                docIdToDelete
              );
              alert("企業情報を削除しました");
              closeModal();

              // 削除後、企業一覧を再表示
              fetchAndDisplayCompanies();
            } catch (error) {
              console.error("削除中にエラーが発生しました:", error);
              alert("削除に失敗しました。");
              closeModal();
            }
          }
        });
      }
    });
};

/**
 * Firestoreから企業情報を取得し、一覧として表示する関数
 */
const fetchAndDisplayCompanies = async () => {
  try {
    // FirestoreWrapperを使ってドキュメントを取得
    const companies = await firestore.getDocuments("company");

    // 既存のリストを一度クリア
    companyListContainer.innerHTML = "";

    if (companies.length === 0) {
      companyListContainer.innerHTML =
        '<p class="text-center text-gray-500 py-8">企業情報はまだ登録されていません。</p>';
      return;
    }

    companies.forEach((company) => {
      const companyItem = document.createElement("div");
      companyItem.classList.add(
        "company-item",
        "bg-gray-50",
        "p-4",
        "rounded-lg",
        "flex",
        "justify-between",
        "items-center",
        "shadow-sm",
        "mb-4"
      );

      // ドキュメントIDをdata-id属性に埋め込む
      companyItem.innerHTML = `
                <span class="text-lg font-medium text-gray-700">${company.company_name}</span>
                <span class="text-lg font-medium text-gray-700">${company.job}</span>
                <span class="text-lg font-medium text-gray-700">${company.place}</span>
                <span class="text-lg font-medium text-gray-700">${company.exp}</span>

                <button onclick="location.href='./companySchedule.html?id=${company.id}'" id="schedulecalenderbutton"
 class="schedule-btn bg-green-500 text-white font-bold py-2 px-4 rounded-full shadow-md hover:bg-green-600 transition-colors duration-200" >スケジュール</button>

                <button class="delete-btn bg-red-500 text-white font-bold py-2 px-4 rounded-full shadow-md hover:bg-red-600 transition-colors duration-200" data-id="${company.id}">削除</button>
            `;

      companyListContainer.appendChild(companyItem);
    });
  } catch (error) {
    console.error("データの取得中にエラーが発生しました:", error);
    companyListContainer.innerHTML =
      '<p class="text-center text-red-500 py-8">データの取得に失敗しました。詳細: ' +
      error.message +
      "</p>";
  }
};

// 親要素にイベントリスナーを設定（イベント委譲）
companyListContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const docIdToDelete = e.target.dataset.id;
    window.openDeleteModal(docIdToDelete);
  }
});

// ページ読み込み時に企業情報を取得して表示
window.onload = () => {
  initModal();
  fetchAndDisplayCompanies();
};
