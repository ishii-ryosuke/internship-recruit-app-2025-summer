document.addEventListener("DOMContentLoaded", () => {
  // modal.htmlを読み込み
  fetch("userDataEditModal.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById("modalContainer").innerHTML = html;

      // fetch完了後に要素を取得する！
      const modalBackdrop = document.getElementById("modalBackdrop");
      const modalPanel = document.getElementById("modalPanel");
      const openBtn = document.getElementById("openModal");
      const closeBtn = document.getElementById("cancelModal");

      // エラー防止: 全ての要素が揃っているかチェック
      if (modalBackdrop && modalPanel && openBtn && closeBtn) {
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
      } else {
        console.error("モーダル要素が正しく読み込まれていません");
      }
    });
});