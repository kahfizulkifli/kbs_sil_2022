const K_MONTHS = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

export { K_MONTHS };

export function phoneIsValid(phone) {
  if (!phone) {
    return false;
  }

  const re = /^((62)|(0))?8\d{8,11}$/;

  if (!re.test(phone)) {
    return false;
  }

  return true;
}

export function getValidPhone(phone) {
  if (!phoneIsValid(phone)) {
    return 0;
  }

  if (phone.substring(0, 2) === "62") {
    return phone;
  } else if (phone.substring(0, 2) === "08") {
    return "628" + phone.substring(2, phone.length);
  } else {
    return phone;
  }
}

export function validateEmail(email) {
  const re =
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export function getDate(dateString = Date.now()) {
  const date = new Date(dateString).getDate();
  const dateTwo = date < 10 ? "0" + date : date;

  const month = new Date(dateString).getMonth() + 1;
  const monthTwo = month < 10 ? "0" + month : month;

  const year = new Date(dateString).getFullYear();

  return dateTwo + "/" + monthTwo + "/" + year;
}

export function convertToDate(dateString) {
  const year = dateString.split("/")[2];
  const month = dateString.split("/")[1] - 1;
  const date = dateString.split("/")[0];

  return new Date(year, month, date);
}

export function getDateDash(dateString) {
  const date = new Date(dateString).getDate();
  const dateTwo = date < 10 ? "0" + date : date;

  const month = new Date(dateString).getMonth() + 1;
  const monthTwo = month < 10 ? "0" + month : month;

  const year = new Date(dateString).getFullYear();

  return year + "-" + monthTwo + "-" + dateTwo;
}

export function getTime(dateString = Date.now()) {
  const date = new Date(dateString);

  const hours = date.getHours();
  const minutes = date.getMinutes();

  const hoursTwo = hours < 10 ? "0" + hours : hours;
  const minutesTwo = minutes < 10 ? "0" + minutes : minutes;

  return `${hoursTwo}:${minutesTwo}`;
}

export function getIndonesianDate() {
  const myDays = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
  ];

  const date = new Date();
  const currentDate = date.getDate();

  const month = date.getMonth();
  const thisDay = myDays[date.getDay()];

  const yy = date.getYear();

  const year = yy < 1000 ? yy + 1900 : yy;

  // return thisDay
  return thisDay + ", " + currentDate + " " + K_MONTHS[month] + " " + year;
}

export function truncate(
  str,
  maxLength,
  { side = "end", ellipsis = "..." } = {}
) {
  if (str.length > maxLength) {
    switch (side) {
      case "start":
        return ellipsis + str.slice(-(maxLength - ellipsis.length));
      case "end":
      default:
        return str.slice(0, maxLength - ellipsis.length) + ellipsis;
    }
  }
  return str;
}

export function getDateWithMonthName(dateString) {
  const date = new Date(dateString).getDate();
  const dateTwo = date < 10 ? "0" + date : date;

  // const month = new Date(dateString).getMonth() + 1
  // const monthTwo = month < 10 ? '0' + month : month
  const month = K_MONTHS[new Date(dateString).getMonth()];

  const year = new Date(dateString).getFullYear();

  return dateTwo + " " + month + " " + year;
}
