import "./style.scss";
import "./tabs.scss";
import React, { useEffect, useState, useCallback } from "react";
import { observer } from "mobx-react";

import { formatMoney } from "src/functions/Etc";

import { getDate, getTime } from "src/functions/Format";

const moment = require("moment");

import { Bar } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";

import IconTotalKeuntungan from "src/icons/dashboard/totalKeuntungan";
import IconTotalPenjualan from "src/icons/dashboard/totalPenjualan";
import IconTotalTransksi from "src/icons/dashboard/totalTransaksi";
import IconSamanticPositive from "src/icons/dashboard/semanticPositive";
import IconSamanticNegative from "src/icons/dashboard/semanticNegative";
import IconSetting from "src/icons/dashboard/setting";
import IconRightBtn from "src/icons/dashboard/rightBtn";
import IconEyeBtn from "src/icons/dashboard/eye";
import DateRangeComponent from "src/components-v2/DateRange";
let dateInt = new Date();

const getDatesInRange = (startDate, endDate) => {
  const date = new Date(startDate);

  const dates = [];
  while (date <= endDate) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return dates;
};

const usePageState = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [dataOmzet, setDataOmzet] = useState([0]);
  const [dataProfit, setDataProfit] = useState([0]);
  const [dataTransactionsCount, setDataTransactionsCount] = useState([0]);
  const [dataDate, setDataDate] = useState([]);

  const [sales, setSales] = useState([]);
  const [isLoadingSales, setisLoadingSales] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const [productsBestSelling, setProductsBestSelling] = useState({});
  const [productsBestSellingToday, setProductsBestSellingToday] = useState({});
  const [productsBestSellingExcludeToday, setProductsBestSellingExcludeToday] =
    useState({});

  const [warningStock, setWarningStock] = useState({});
  const [isLoadingWarningStock, setIsLoadingWarningStock] = useState(true);
  const [ZeroStock, setZeroStock] = useState({});
  const [isLoadingZeroStock, setIsLoadingZeroStock] = useState(true);

  const [opname, setOpname] = useState({});
  const [isLoadingopname, setIsLoadingopname] = useState(true);

  return {
    dataOmzet,
    setDataOmzet,
    dataProfit,
    setDataProfit,
    dataTransactionsCount,
    setDataTransactionsCount,

    sales,
    setSales,
    isLoadingSales,
    setisLoadingSales,

    activeTab,
    setActiveTab,

    productsBestSelling,
    setProductsBestSelling,
    productsBestSellingToday,
    setProductsBestSellingToday,
    productsBestSellingExcludeToday,
    setProductsBestSellingExcludeToday,
    isLoadingWarningStock,
    setIsLoadingWarningStock,
    isLoadingZeroStock,
    setIsLoadingZeroStock,

    warningStock,
    setWarningStock,

    ZeroStock,
    setZeroStock,

    dataDate,
    setDataDate,

    opname,
    setOpname,
    isLoadingopname,
    setIsLoadingopname,

    isSubmitting,
    setIsSubmitting,
  };
};

const Dashboard = () => {
  const PageState = usePageState();

  const [timeSelection, setTimeSelection] = useState({
    startDate: new Date(dateInt).setHours(0, 0, 0, 0),
    endDate: new Date(dateInt).setHours(23, 59, 59, 999),
  });

  const {
    setDataOmzet,
    setDataProfit,
    setDataTransactionsCount,
    setSales,
    setisLoadingSales,
    setOpname,
    setProductsBestSellingExcludeToday,
    setProductsBestSellingToday,
    setWarningStock,
    setZeroStock,
    setIsLoadingZeroStock,
    setDataDate,
  } = PageState;

  useEffect(() => {
    loadOmzetAndProfitAndTransactionsCount();
    // loadAnalyticsProfit()
    // loadAnalyticsTransactionsCount()
    loadLastTransactions();
    loadLastOpname();
    loadBestSellingProducts();
    loadWarningStock();
    loadZeroStock();
  }, [timeSelection]);

  const loadOmzetAndProfitAndTransactionsCount = useCallback(() => {
    if (Object.keys(timeSelection).length < 1) {
      return;
    }

    const listDay = getDatesInRange(
      timeSelection?.startDate,
      timeSelection?.endDate
    );

    setDataOmzet([
      1000000, 1500000, 2000000, 3000000, 4000000, 5000000, 7000000,
    ]);
    setDataProfit([
      500000, 1000000, 1500000, 2000000, 3000000, 4000000, 6000000,
    ]);
    setDataTransactionsCount([50, 60, 70, 100, 150, 200, 300]);
    setDataDate(listDay);
  }, [timeSelection]);

  const loadLastTransactions = () => {
    setSales([{created_at:new Date(),products:['A','B'],price_total:100000},{created_at:new Date(),products:['A','B'],price_total:100000},{created_at:new Date(),products:['A','B'],price_total:100000},{created_at:new Date(),products:['A','B'],price_total:100000},{created_at:new Date(),products:['A','B'],price_total:100000}]);
  };

  const loadLastOpname = () => {};

  const listenLastOpname = () => {};

  const loadWarningStock = () => {};

  const loadZeroStock = () => {};

  const loadBestSellingProducts = () => {
    if (Object.keys(timeSelection).length < 1) {
      return;
    }

    const listDay = getDatesInRange(
      timeSelection?.startDate,
      timeSelection?.endDate
    );

    loadBestSellingProductsToday();
  };

  const listenBestSellingProductsToday = () => {};

  const loadBestSellingProductsToday = () => {};

  const setDateRange = useCallback((newSelectionDate) => {
    setTimeSelection({
      startDate: newSelectionDate?.startDate,
      endDate: newSelectionDate?.endDate,
    });
  }, []);

  return (
    <div className="w-full d-flex" style={{ flex: 1, overflowY: "auto" }}>
      <div className="main-content dashboard justify-content-between">
        <div className="col-xl col-lg col-md col">
          <div
            className="d-flex justify-content-end"
            style={{ marginBottom: 18 }}
          >
            <div style={{ minWidth: 142 }}>
              <DateRangeComponent
                value={timeSelection}
                onDateChange={setDateRange}
              />
            </div>
          </div>
          <RenderSummaries PageState={PageState} />
          <RenderChart PageState={PageState} />
          <RenderTableLaporan PageState={PageState} />
        </div>
      </div>
    </div>
  );
};

const RenderSummaries = ({ PageState }) => {
  const { dataOmzet, dataProfit, dataTransactionsCount, isLoadingSales } =
    PageState;

  return (
    <div
      className="row row align-items-center  "
      style={{
        backgroundColor: "#ffffff",
        marginLeft: 1,
        marginRight: 1,
        borderRadius: 6,
      }}
    >
      <div className="col-xl-4 col-lg-4 col-md-4 col-12">
        <div
          className="card"
          style={{
            padding: "0",
            boxShadow: "none",
            height: 48,
            marginTop: 24,
            marginBottom: 24,
          }}
        >
          <div className="d-flex border-right">
            <div
              className="d-flex justify-content-center align-items-center"
              style={{
                backgroundColor: "#2CB34D",
                borderRadius: 6,
                width: 48,
                height: 48,
                marginRight: 18,
              }}
            >
              <IconTotalKeuntungan />
            </div>
            <div>
              <div className="title-summaries">Total Penjualan</div>
              {isLoadingSales && (
                <div
                  className="text-center"
                  style={{ color: "#101223", marginTop: 4, marginBottom: 4 }}
                >
                  <div
                    className="animated-loader animated-loader-black"
                    style={{ margin: "0 auto" }}
                  ></div>
                </div>
              )}
              {!isLoadingSales && (
                <div className="value-summaries">
                  Rp {formatMoney((dataOmzet || []).reduce((a, b) => a + b, 0))}{" "}
                  <IconSamanticPositive />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-4 col-lg-4 col-md-4 col-12">
        <div
          className="card "
          style={{
            padding: "0",
            boxShadow: "none",
            height: 48,
            marginTop: 24,
            marginBottom: 24,
          }}
        >
          <div className="d-flex border-right">
            <div
              className="d-flex justify-content-center align-items-center"
              style={{
                backgroundColor: "#039DCC",
                borderRadius: 6,
                width: 48,
                height: 48,
                marginRight: 18,
              }}
            >
              <IconTotalPenjualan />
            </div>
            <div>
              <div className="title-summaries">Keuntungan Penjualan</div>
              {isLoadingSales && (
                <div
                  className="text-center"
                  style={{ color: "#101223", marginTop: 4, marginBottom: 4 }}
                >
                  <div
                    className="animated-loader animated-loader-black"
                    style={{ margin: "0 auto" }}
                  ></div>
                </div>
              )}
              {!isLoadingSales && (
                <div className="value-summaries">
                  Rp{" "}
                  {formatMoney((dataProfit || []).reduce((a, b) => a + b, 0))}{" "}
                  <IconSamanticNegative />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-4 col-lg-4 col-md-4 col-12">
        <div
          className="card"
          style={{
            padding: "0",
            boxShadow: "none",
            height: 48,
            marginTop: 24,
            marginBottom: 24,
          }}
        >
          <div className="d-flex ">
            <div
              className="d-flex justify-content-center align-items-center"
              style={{
                backgroundColor: "#57BABE",
                borderRadius: 6,
                width: 48,
                height: 48,
                marginRight: 18,
              }}
            >
              <IconTotalTransksi />
            </div>
            <div>
              <div className="title-summaries">Total Transaksi</div>
              {isLoadingSales && (
                <div
                  className="text-center"
                  style={{ color: "#101223", marginTop: 4, marginBottom: 4 }}
                >
                  <div
                    className="animated-loader animated-loader-black"
                    style={{ margin: "0 auto" }}
                  ></div>
                </div>
              )}
              {!isLoadingSales && (
                <div className="value-summaries">
                  {(dataTransactionsCount || []).reduce((a, b) => a + b, 0) ||
                    0}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RenderChart = ({ PageState }) => {
  const { dataOmzet, dataProfit, dataDate, sales } = PageState;

  const [templateChart, setTemplateChart] = useState([
    {name:"Arkram",amount:5000000},
    {name:"Bintang",amount:4000000},
    {name:"Khafi",amount:3040500},
    {name:"Habil",amount:2540500},
    {name:"Zulpan",amount:2040500},
    {name:"Arkan",amount:1040500},
  ]);

  useEffect(() => {
  }, [sales]);

  return (
    <div className="row">
      <div className="col-xl-8 col-md-12 col-12" style={{ paddingTop: 18 }}>
        <div className="card penjualan-keuntungan">
          <div className="d-flex justify-content-between w-full">
            <h6>Penjualan & Keuntungan</h6>
            <div style={{ cursor: "pointer" }}>
              <IconSetting />
            </div>
          </div>

          <Bar
            data={{
              labels: dataDate || [],
              datasets: [
                {
                  label: "Total Penjualan",
                  data: dataOmzet || [],
                  borderWidth: 1,
                  borderRadius: 20,
                  barPercentage: 0.4,
                  backgroundColor: "#2CB34D",
                  borderColor: "rgba(75,192,192,1)",
                  borderSkipped: false,
                },
                {
                  label: "Total Keuntungan",
                  data: dataProfit || [],
                  borderWidth: 1,
                  borderRadius: 20,
                  barPercentage: 0.4,
                  borderRadius: 20,
                  backgroundColor: "#039DCC",
                  borderColor: "rgba(75,192,192,1)",
                  borderSkipped: false,
                },
              ],
            }}
            legend={{
              display: false,
            }}
            options={{
              responsive: true,

              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                      // suggestedMax: (Math.max.apply(Math, dataOmzet) > 0)?Math.max.apply(Math, dataOmzet):10000,
                      maxTicksLimit: 6,
                      callback: function (value, index, values) {
                        return "Rp" + formatMoney(value);
                      },
                    },
                  },
                ],
                xAxes: [
                  {
                    ticks: {
                      callback: function (value, index, values) {
                        return moment(value).format("D/M/YYYY");
                      },
                    },
                  },
                ],
              },
            }}
          />
          <div
            className="d-flex justify-content-around"
            style={{ marginTop: 24, marginBottom: 18 }}
          >
            <div className="d-flex align-items-center">
              <div
                style={{
                  width: 14,
                  height: 14,
                  backgroundColor: "#2CB34D",
                  borderRadius: 4,
                  marginRight: 8,
                }}
              ></div>
              Total Penjualan
            </div>
            <div className="d-flex align-items-center">
              <div
                style={{
                  width: 14,
                  height: 14,
                  backgroundColor: "#039DCC",
                  borderRadius: 4,
                  marginRight: 8,
                }}
              ></div>
              Total Keuntungan
            </div>
          </div>
        </div>
      </div>
      <div
        className="col-xl-4 col-md-12 col-12"
        style={{ paddingTop: 18, paddingLeft: 0 }}
      >
        <div className="card penjualan-keuntungan" style={{ height: "100%" }}>
          <div className="d-flex align-items-center justify-content-between w-full">
            <h6>Penjualan per Kasir</h6>
            <div style={{ cursor: "pointer" }}>
              <IconRightBtn />
            </div>
          </div>
          {!templateChart.length && (
            <div style={{ height: "90%", marginTop: 20 }}>
              Belum ada rekap data
            </div>
          )}
          <div
            className="d-flex flex-column  justify-content-around"
            style={{ height: "95%", marginBottom: "auto" }}
          >
            <div style={{ marginTop: 33 }}>
              <Doughnut
                data={{
                  labels: Object.values(templateChart).map((chartData) => {
                    return chartData?.name;
                  }),
                  datasets: [
                    {
                      label: "# of Votes",
                      data: Object.values(templateChart).map((chartData) => {
                        return chartData?.amount;
                      }),
                      backgroundColor: [
                        "#039DCC",
                        "#57BABE",
                        "#3AEB65",
                        "#2CB34D",
                      ],
                      borderWidth: 0,
                      cutout: "80%",
                    },
                  ],
                }}
                legend={{
                  display: false,
                }}
              />
            </div>
            {templateChart.map((item, index) => {
              return (
                <div
                  className="d-flex align-items-center w-full justify-content-between"
                  style={{ marginTop: 18 }}
                >
                  <div className="d-flex align-items-center">
                    <div
                      className="profil-loyal d-flex align-items-center justify-content-center"
                      style={{
                        backgroundColor: "#57BABE",
                        width: 14,
                        height: 14,
                        borderRadius: 4,
                        marginRight: 8,
                      }}
                    />
                    <div className="name-loyal">{item.name}</div>
                  </div>
                  <div>
                    <div className="amount-loyal">
                      Rp {formatMoney(item.amount)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const RenderTableLaporan = ({ PageState }) => {
  const {
    dataOmzet,
    dataProfit,
    dataTransactionsCount,
    productsBestSellingExcludeToday,
    productsBestSellingToday,
    isLoadingSales,
    activeTab,
    setActiveTab,
  } = PageState;

  const [tab, setTab] = useState([
    { title: "Transaksi Terakhir" },
    { title: "Produk Terlaris" },
    { title: "Stok Paling Sedikit" },
    { title: "Stok Kosong" },
  ]);

  return (
    <div className="row">
      <div className="col-12" style={{ paddingTop: 18, paddingBottom: 18 }}>
        <div className="card penjualan-keuntungan">
          <div className="d-flex align-items-center justify-content-between w-full">
            <h6>Tabel Laporan</h6>
            <div style={{ cursor: "pointer" }}>
              <IconRightBtn />
            </div>
          </div>
          <div style={{ paddingTop: 18 }}>
            <div className="tab">
              {tab.length > 0 &&
                tab.map((tab_val, index) => {
                  if (index === activeTab)
                    return (
                      <div className="item-tab active" key={index}>
                        {tab_val.title}
                      </div>
                    );
                  return (
                    <div
                      className="item-tab"
                      onClick={() => {
                        setActiveTab(index);
                      }}
                      key={index}
                      style={{ cursor: "pointer" }}
                    >
                      {tab_val.title}
                    </div>
                  );
                })}
            </div>
            <div className="col-12" style={{ paddingTop: 18 }}>
              <RenderTables PageState={PageState} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RenderTables = observer(({ PageState }) => {
  const store  = {};
  const {
    isLoadingSales,
    activeTab,
    sales,
    productsBestSellingExcludeToday,
    productsBestSellingToday,
    zeroStock,
    warningStock,
  } = PageState;

  switch (activeTab) {
    case 0:
      return (
        <table
          className="table  table-borderless table-hover"
          style={{ width: "100%" }}
        >
          <thead className="customHeader">
            <tr>
              <th></th>
              <th>Tanggal Penjualan</th>
              <th>Jumlah Produk</th>
              <th>Nilai Transaksi</th>
            </tr>
          </thead>
          <tbody>
            {sales &&
              Object.entries(sales)
                .sort((a, b) => {
                  return a.created_at - b.created_at;
                })
                .reverse()
                .slice(0, 5)
                .map(([key, sale], indexArray) => {
                  if (indexArray > 5) {
                    return;
                  }
                  return (
                    <tr key={key} className="tr-hover customHeader">
                      <td>
                        <IconEyeBtn />
                      </td>
                      <td>
                        {getDate(sale.created_at)}
                        <div>{getTime(sale.created_at)}</div>
                      </td>
                      <td>{Object.keys(sale.products || {}).length} Barang</td>
                      <td>Rp {formatMoney(sale.price_total)}</td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      );
    case 1:
      return (
        <table
          className="table  table-borderless table-hover"
          style={{ width: "100%" }}
        >
          <thead className="customHeader">
            <tr>
              <th></th>
              <th>No.</th>
              <th>Nama Produk</th>
              <th>Terjual</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(
              getCombinedBestSelling(
                productsBestSellingExcludeToday,
                productsBestSellingToday
              )
            )
              .sort((a, b) => {
                return b[1] - a[1];
              })
              .map(([key, value], i) => {
                if (i > 10) {
                  return;
                }
                return (
                  <tr key={key} className="tr-hover customHeader">
                    <td>
                      <IconEyeBtn />
                    </td>
                    <td>{i + 1}</td>
                    <td>
                      {store.products && store.products[key]
                        ? store.products[key].name
                        : ""}
                    </td>
                    <td>
                      {value}
                      {store.products &&
                      store.products[key] &&
                      store.products[key].packaging_unit_basic &&
                      store.products[key].packaging_unit_basic.label
                        ? ` ${store.products[key].packaging_unit_basic.label}`
                        : null}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      );
    case 2:
      return (
        <table
          className="table  table-borderless table-hover"
          style={{ width: "100%" }}
        >
          <thead className="customHeader">
            <tr>
              <th></th>
              <th>Nama Produk</th>
              <th>Stok Minimal</th>
              <th>Stok Sekarang</th>
              <th>Satuan</th>
            </tr>
          </thead>
          <tbody>
            {warningStock &&
              Object.entries(warningStock)
                .sort(function (a, b) {
                  let [productKeyA, valueA] = a;
                  let [productKeyB, valueB] = b;

                  return valueA.quantity_total - valueB.quantity_total;
                })
                .map((product, index) => {
                  let [productKey, value] = product;
                  let productName =
                    (store.products &&
                      store.products[productKey] &&
                      store.products[productKey].name) ||
                    "";
                  let productUnit =
                    (store.products &&
                      store.products[productKey] &&
                      store.products[productKey].packaging_unit_basic &&
                      store.products[productKey].packaging_unit_basic.label) ||
                    "";
                  let productStockMin =
                    (store.products &&
                      store.products[productKey] &&
                      store.products[productKey].stock_minimal) ||
                    0;
                  let productQuantityTotal =
                    (warningStock &&
                      warningStock[productKey] &&
                      warningStock[productKey].quantity_total) ||
                    0;
                  return (
                    <tr key={index} className="tr-hover customHeader">
                      <td>
                        <IconEyeBtn />
                      </td>
                      <td>{productName}</td>
                      <td>{productStockMin}</td>
                      <td>{productQuantityTotal}</td>
                      <td>{productUnit}</td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      );
    case 3:
      return (
        <table
          className="table  table-borderless table-hover"
          style={{ width: "100%" }}
        >
          <thead className="customHeader">
            <tr>
              <th></th>
              <th>Nama Produk</th>
              <th>Stok Minimal</th>
              <th>Stok Sekarang</th>
              <th>Satuan</th>
            </tr>
          </thead>
          <tbody>
            {zeroStock &&
              Object.keys(zeroStock).map((productKey, key) => {
                return (
                  <tr key={key} className="tr-hover customHeader">
                    <td>
                      <IconEyeBtn />
                    </td>
                    <td>
                      {store.products &&
                        store.products[productKey] &&
                        store.products[productKey].name}
                    </td>
                    <td>
                      {store.products &&
                        store.products[productKey] &&
                        store.products[productKey].stock_minimal}
                    </td>
                    <td>
                      {zeroStock &&
                        zeroStock[productKey] &&
                        zeroStock[productKey].quantity_total}
                    </td>
                    <td>
                      {store.products &&
                        store.products[productKey] &&
                        store.products[productKey].packaging_unit_basic.label}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      );

    default:
      return <label>NOT FOOUND</label>;
  }
});

const getCombinedBestSelling = (firstProducts = {}, secondProducts = {}) => {
  let newObj = {};

  Object.entries(firstProducts).map(([pid, count]) => {
    newObj[pid] = newObj[pid] || 0;
    newObj[pid] += count;
  });

  Object.entries(secondProducts).map(([pid, count]) => {
    newObj[pid] = newObj[pid] || 0;
    newObj[pid] += count;
  });

  return newObj;
};

export default observer(Dashboard);
