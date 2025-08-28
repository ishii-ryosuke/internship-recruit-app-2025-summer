import AuthWrapper from "../firebase-wrapper/auth.js";
import FirestoreWrapper from "../firebase-wrapper/firestore.js";
import { loadAndDisplayUserInfo } from "./header.js";

const auth = new AuthWrapper();
const firestore = new FirestoreWrapper();

let startDates = []; // 🔥 start_day の日付リストを保持

function generate_year_range(start, end) {
  var years = "";
  for (var year = start; year <= end; year++) {
      years += "<option value='" + year + "'>" + year + "</option>";
  }
  return years;
}

var today = new Date();
var currentMonth = today.getMonth();
var currentYear = today.getFullYear();
var selectYear = document.getElementById("year");
var selectMonth = document.getElementById("month");

var createYear = generate_year_range(1970, 2200);
document.getElementById("year").innerHTML = createYear;

var calendar = document.getElementById("calendar");
var lang = calendar.getAttribute('data-lang');

var months = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
var days = ["日", "月", "火", "水", "木", "金", "土"];

var dayHeader = "<tr>";
for (var day in days) {
  dayHeader += "<th data-days='" + days[day] + "'>" + days[day] + "</th>";
}
dayHeader += "</tr>";
document.getElementById("thead-month").innerHTML = dayHeader;

var monthAndYear = document.getElementById("monthAndYear");

// ✅ 初期表示（start_day 読み込み後にカレンダー描画）
loadcompanyDate();

function next() {
  currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
  currentMonth = (currentMonth + 1) % 12;
  showCalendar(currentMonth, currentYear);
}

function previous() {
  currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
  currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
  showCalendar(currentMonth, currentYear);
}

function jump() {
  currentYear = parseInt(selectYear.value);
  currentMonth = parseInt(selectMonth.value);
  showCalendar(currentMonth, currentYear);
}

async function loadcompanyDate() {
  try {
    const allschedule = await firestore.getDocuments("schedule");

    startDates = allschedule
      .map(doc => doc.start_day)
      .filter(date => date !== null)
      .map(dateStr => new Date(dateStr)); // 日付型に変換

    showCalendar(currentMonth, currentYear); // 🔁 日付取得後に描画
  } catch (error) {
    console.error("データなし", error);
  }
}

function showCalendar(month, year) {
  var firstDay = (new Date(year, month)).getDay();
  var tbl = document.getElementById("calendar-body");
  tbl.innerHTML = "";

  monthAndYear.innerHTML = months[month] + " " + year;
  selectYear.value = year;
  selectMonth.value = month;

  var date = 1;
  for (var i = 0; i < 6; i++) {
    var row = document.createElement("tr");

    for (var j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        var cell = document.createElement("td");
        var cellText = document.createTextNode("");
        cell.appendChild(cellText);
        row.appendChild(cell);
      } else if (date > daysInMonth(month, year)) {
        break;
      } else {
        var cell = document.createElement("td");
        cell.setAttribute("data-date", date);
        cell.setAttribute("data-month", month + 1);
        cell.setAttribute("data-year", year);
        cell.setAttribute("data-month_name", months[month]);
        cell.className = "date-picker";
        cell.innerHTML = "<span>" + date + "</span>";

        if (
          date === today.getDate() &&
          year === today.getFullYear() &&
          month === today.getMonth()
        ) {
          cell.className += " selected";
        }
        const todaynow = today.some(today =>
          today.getDate() === date &&
          today.getFullYear() === year &&
          today.getMonth() === month

        )
        // 🔥 start_day に該当する日付をハイライト
        const isStartDate = startDates.some(startDate =>
          startDate.getFullYear() === year &&
          startDate.getMonth() === month &&
          startDate.getDate() === date
        );

        if (isStartDate) {
          cell.style.backgroundColor = "orange"; // ゴールド色
          cell.title = "予定あり"; // ツールチップも追加
        }

        row.appendChild(cell);
        date++;
      }
    }

    tbl.appendChild(row);
  }
}

function daysInMonth(iMonth, iYear) {
  return 32 - new Date(iYear, iMonth, 32).getDate();
}
