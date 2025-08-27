import AuthWrapper from "../firebase-wrapper/auth.js";
import FirestoreWrapper from "../firebase-wrapper/firestore.js";

const auth = new AuthWrapper();
const firestore = new FirestoreWrapper();

document.querySelectorAll(".sukebo").forEach(function (btn1) {
  btn1.addEventListener("click", function () {
    console.log("予定がクリックされました。");
  });
});

document.querySelectorAll(".edit").forEach(function (btn2) {
  btn2.addEventListener("click", function () {
    console.log("編集がクリックされました。");
  });
});

document.querySelectorAll(".delete").forEach(function (btn3) {
  btn3.addEventListener("click", function () {
    console.log("削除がクリックされました。");
  });
});

async function loadCompanyData() {
  try {
    const allCompanies = await firestore.getDocuments("company");
    // console.log("allCompanies", allCompanies);
    const filteredData = allCompanies.map((doc) => ({
      company_name: doc.company_name ?? null,
      job: doc.job ?? null,
      place: doc.place ?? null,
      exp: doc.exp ?? null,
    }));
    console.log("filteredData", filteredData);
    filteredData.forEach((data, index) => {
      document.getElementsByClassName("company_name")[index].textContent =
        filteredData[index].company_name;
      document.getElementsByClassName("place")[index].textContent =
        filteredData[index].place;
      document.getElementsByClassName("job")[index].textContent =
        filteredData[index].job;
      document.getElementsByClassName("exp")[index].textContent =
        filteredData[index].exp;

      addEiwa(index);
    });
  } catch (error) {
    console.error("データ取得失敗", error);
  }
}
loadCompanyData();

const container = document.getElementById("container");
const source = document.querySelector(".eiwa");

function addEiwa(index) {
  const clone = source.cloneNode(true);
  clone.style.marginTop = index * 80 + "px";
  container.appendChild(clone);
}
