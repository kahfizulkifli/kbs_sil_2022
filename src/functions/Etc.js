import Accounting from "accounting-js";

const K_PPN_DEFAULT = 11;

export function generateColor(uid) {
  const str = uid || "randomajasih";

  let hash = 0;

  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  let colour = "#";

  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    colour += ("00" + value.toString(16)).substr(-2);
  }

  return colour;
}

export function generateName(name = "") {
  const arrName = name.split(" ");

  let initialName = "";

  for (let i = 0; i < arrName.length; i++) {
    const current_word = arrName[i];
    initialName = initialName + current_word.charAt(0).toUpperCase();
    if (i >= 1) {
      return initialName;
    }
  }

  return initialName;
}

export function formatMoney(value = 0) {
  return Accounting.formatMoney(value, {
    symbol: "",
    precision: 0,
    thousand: ".",
    decimal: ",",
  });
}

export function calculateAll({
  price_buy_nett_after_discount = 0,
  price_buy_discount = 0,
  price_buy_discount_percent = 0,
  price_buy_discount_type = "",
  price_buy = 0,
  price_buy_isPPN = false,
  price_buy_PPN = K_PPN_DEFAULT,
  price_margin = 0,
  price_sell_isPPN = false,
}) {
  let price_buy_nett = 0;
  let price_sell = 0;
  let price_sell_nett = 0;

  if (price_buy_isPPN) {
    price_buy_nett = (price_buy * (100 + price_buy_PPN)) / 100;
  } else {
    price_buy_nett = price_buy * 1;
  }

  if (price_buy_discount_type) {
    if (price_buy_discount_type === "Rp") {
      price_buy_discount_percent = (
        (price_buy_discount * 100) /
        price_buy_nett
      ).toFixed(2);
      price_buy_nett_after_discount = price_buy_nett - price_buy_discount;
    } else if (price_buy_discount_type === "%") {
      price_buy_discount = Math.round(
        (price_buy_discount_percent * price_buy_nett) / 100
      );
      price_buy_nett_after_discount = price_buy_nett - price_buy_discount;
    }
  } else {
    price_buy_nett_after_discount = price_buy_nett;
  }

  price_sell = parseInt(price_buy_nett) + parseInt(price_margin);

  if (price_sell_isPPN) {
    price_sell_nett = price_sell * ((100 + price_buy_PPN) / 100);
  } else {
    price_sell_nett = price_sell * 1;
  }

  return {
    price_buy_nett_after_discount: parseInt(price_buy_nett_after_discount),
    price_buy_discount: parseInt(price_buy_discount),
    price_buy_discount_percent,
    price_buy_discount_type,
    price_buy: parseInt(price_buy),
    price_buy_isPPN,
    price_buy_PPN: price_buy_PPN,
    price_margin: parseInt(price_margin),
    price_sell_isPPN,
    price_buy_nett: parseInt(price_buy_nett),
    price_sell: parseInt(price_sell),
    price_sell_nett: parseInt(price_sell_nett),
  };
}

export function getMarginPercentage({ price_margin, price_buy_nett }) {
  if (price_buy_nett === 0) {
    return 0;
  } else {
    return Math.round((price_margin / price_buy_nett) * 100);
  }
}

// TODO: price buy ppn belum dipakai
export function getMarginFromPriceBuyPriceBuyIsPPNPriceSell({
  price_buy = 0,
  price_buy_isPPN = false,
  price_buy_PPN = K_PPN_DEFAULT,
  price_sell = 0,
}) {
  let price_buy_nett = 0;

  if (price_buy_isPPN) {
    price_buy_nett = price_buy * ((100 + price_buy_PPN) / 100);
  } else {
    price_buy_nett = price_buy * 1;
  }

  return price_sell - price_buy_nett;
}

// buat reactselect
export function generateLabelValueFromObjectNameKey(
  obj = {},
  valueKey = "key",
  labelKey = "name"
) {
  return Object.values(obj).reduce((arrFinal, data, index) => {
    arrFinal[index] = {
      ...data,
      value: data[valueKey],
      label: data[labelKey],
    };
    return arrFinal;
  }, []);
}
