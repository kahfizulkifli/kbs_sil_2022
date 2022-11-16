import "./style.scss";
import React, { useState } from "react";
import { Link, useLocation, matchRoutes } from "react-router-dom";
import { observer } from "mobx-react";

import IconDashboard from "src/icons/sidebar/dashboard";
import IconKasir from "src/icons/sidebar/kasir";
import IconPenjualan from "src/icons/sidebar/penjualan";
import IconPersediaan from "src/icons/sidebar/persediaan";
import IconPembelian from "src/icons/sidebar/pembelian";
import IconLaporan from "src/icons/sidebar/laporan";
import IconKontak from "src/icons/sidebar/kontak";
import IconMasterdata from "src/icons/sidebar/masterdata";
import IconPengaturan from "src/icons/sidebar/pengaturan";

import IconAnalisis from "src/icons/sidebar/analisis";
import IconKeuangan from "src/icons/sidebar/keuangan";
import IconKonsinyasi from "src/icons/sidebar/konsinyasi";
import IconPromo from "src/icons/sidebar/promo";
import IconResep from "src/icons/sidebar/resep";
import IconUserManagement from "src/icons/sidebar/usermanagement";

import { use100vh } from "react-div-100vh";

import { useStores } from "src/functions/stores";
import { pages as pagesData } from "src/constants/permissions";

const urlImage =
  "https://firebasestorage.googleapis.com/v0/b/farmaklik-id.appspot.com/o/assets%2Fdashboard%2Ficon-apotek.png?alt=media&token=73f9c721-838a-430f-a8f9-fb531e42b1ce";

const getUrlRedirect = (objKeys) => {
  let urlRedirect = "/";
  const keys = Object.entries(objKeys).filter(([, permission]) => {
    return permission === true;
  });

  if (keys?.[0]?.[0]) {
    urlRedirect = pagesData[keys?.[0]?.[0]]?.url || "/";
  }

  return urlRedirect;
};

const SidebarItems = observer(() => {
  const { store_v2 } = useStores();

  const { pages } = store_v2.permissions || {};

  const {
    dashboard,
    cashier,
    promo_products,
    promo_wholesalers,
    promo_bundles,
    promo_memberships,
    prescriptions_redemptions,
    prescriptions_input,
    prescriptions_templates,
    sales_all,
    sales_rejected,
    sales_cancelled,
    stock_products,
    stock_defecta,
    stock_opname_create,
    stock_opname_history,
    stock_moving,
    consignment_all,
    consignment_input,
    procurement_purchase_order,
    procurement_goods_receipt,
    procurement_goods_return,
    master_products,
    master_units,
    master_racks,
    master_warehouses,
    contacts_customers,
    contacts_physicians,
    contacts_suppliers,
    accounting_ledger,
    accounting_accounts,
    accounting_activities,
    reports_financial,
    reports_sales,
    reports_procurement,
    reports_stock,
    analysis_pareto,
    analysis_purchasing,
    analysis_busyhours,
    analysis_prices,
    users_all,
    users_roles,
    settings_store,
    market_product_catalog,
    market_cart,
    market_history,
    market_payment,
    market_detail,
  } = pages || {};

  return (
    <>
      <h6 style={{ marginLeft: 10 }}>Menu POS</h6>
      {dashboard && (
        <SidebarComponent
          to="/dashboard"
          paths={["dashboard"]}
          icon={<IconDashboard />}
          title="Dashboard"
        />
      )}

      {cashier && (
        <SidebarComponent
          to="/cashier"
          paths={["cashier"]}
          icon={<IconKasir />}
          title="Kasir"
        />
      )}

      {(promo_products ||
        promo_wholesalers ||
        promo_bundles ||
        promo_memberships) && (
        <SidebarComponent
          to={getUrlRedirect({
            promo_products,
            promo_wholesalers,
            promo_bundles,
            promo_memberships,
          })}
          paths={["/promo/:type"]}
          icon={<IconPromo />}
          title="Promo"
        />
      )}

      {(prescriptions_redemptions ||
        prescriptions_input ||
        prescriptions_templates) && (
        <SidebarComponent
          to={getUrlRedirect({
            prescriptions_redemptions,
            prescriptions_input,
            prescriptions_templates,
          })}
          paths={["/prescriptions/:type"]}
          icon={<IconResep />}
          title="Resep"
        />
      )}

      {(sales_all || sales_rejected || sales_cancelled) && (
        <SidebarComponent
          to={getUrlRedirect({ sales_all, sales_rejected, sales_cancelled })}
          paths={["sales/:type"]}
          icon={<IconPenjualan />}
          title="Penjualan"
        />
      )}

      {(stock_products ||
        stock_defecta ||
        stock_opname_create ||
        stock_opname_history ||
        stock_moving) && (
        <SidebarComponent
          to={getUrlRedirect({
            stock_products,
            stock_defecta,
            stock_opname_create,
            stock_opname_history,
            stock_moving,
          })}
          paths={["stock/:type"]}
          icon={<IconPersediaan />}
          title="Persediaan"
        />
      )}

      {(consignment_all || consignment_input) && (
        <SidebarComponent
          to={getUrlRedirect({ consignment_all, consignment_input })}
          paths={["/consignment/:type"]}
          icon={<IconKonsinyasi />}
          title="Konsinyasi"
        />
      )}

      {(procurement_purchase_order ||
        procurement_goods_receipt ||
        procurement_goods_return) && (
        <SidebarComponent
          to={getUrlRedirect({
            procurement_purchase_order,
            procurement_goods_receipt,
            procurement_goods_return,
          })}
          paths={["procurement/:type"]}
          icon={<IconPembelian />}
          title="Pembelian"
        />
      )}

      {(market_product_catalog ||
        market_cart ||
        market_history ||
        market_payment ||
        market_detail) && (
        <SidebarComponent
          to={getUrlRedirect({
            market_product_catalog,
            market_cart,
            market_history,
            market_payment,
            market_detail,
          })}
          paths={["market/:type"]}
          icon={<IconPenjualan />}
          title="Farma Market"
        />
      )}

      {(master_products ||
        master_units ||
        master_racks ||
        master_warehouses ||
        contacts_customers ||
        contacts_physicians ||
        contacts_suppliers ||
        accounting_ledger ||
        accounting_accounts ||
        accounting_activities ||
        reports_financial ||
        reports_sales ||
        reports_procurement ||
        reports_stock ||
        analysis_pareto ||
        analysis_purchasing ||
        analysis_busyhours ||
        analysis_prices) && (
        <h6 style={{ marginLeft: 10, marginTop: 10 }}>Data & Laporan</h6>
      )}

      {(master_products ||
        master_units ||
        master_racks ||
        master_warehouses) && (
        <SidebarComponent
          to={getUrlRedirect({
            master_products,
            master_units,
            master_racks,
            master_warehouses,
          })}
          paths={["master/:type"]}
          icon={<IconMasterdata />}
          title="Master Data"
        />
      )}
      {(contacts_customers || contacts_physicians || contacts_suppliers) && (
        <SidebarComponent
          to={getUrlRedirect({
            contacts_customers,
            contacts_physicians,
            contacts_suppliers,
          })}
          paths={["contacts/:type"]}
          icon={<IconKontak />}
          title="Kontak"
        />
      )}


      {(accounting_ledger || accounting_accounts || accounting_activities) && (
        <SidebarComponent
          to={getUrlRedirect({
            accounting_ledger,
            accounting_accounts,
            accounting_activities,
          })}
          paths={["/accounting/:type"]}
          icon={<IconKeuangan />}
          title="Akuntansi"
        />
      )}

      {(reports_financial ||
        reports_sales ||
        reports_procurement ||
        reports_stock) && (
        <SidebarComponent
          to={getUrlRedirect({
            reports_financial,
            reports_sales,
            reports_procurement,
            reports_stock,
          })}
          paths={["reports/:type"]}
          icon={<IconLaporan />}
          title="Laporan"
        />
      )}

      {(analysis_pareto ||
        analysis_purchasing ||
        analysis_busyhours ||
        analysis_prices) && (
        <SidebarComponent
          to={getUrlRedirect({
            analysis_pareto,
            analysis_purchasing,
            analysis_busyhours,
            analysis_prices,
          })}
          paths={["/analysis/:type"]}
          icon={<IconAnalisis />}
          title="Analisis"
        />
      )}
      {(users_all || users_roles) && (
        <h6 style={{ marginLeft: 10, marginTop: 10 }}>Administrator</h6>
      )}

      {(users_all || users_roles) && (
        <SidebarComponent
          to={getUrlRedirect({ users_all, users_roles })}
          paths={["/users/:type"]}
          icon={<IconUserManagement />}
          title="Pengguna"
        />
      )}
      {settings_store && (
        <SidebarComponent
          to={getUrlRedirect({ settings_store })}
          paths={["settings/:type"]}
          icon={<IconPengaturan />}
          title="Pengaturan"
        />
      )}
    </>
  );
});

const SidebarComponent = ({ icon, title, to, paths = [] }) => {
  const location = useLocation();

  const isMatched = matchRoutes(
    paths.map((path) => {
      return { path };
    }),
    location
  );

  return (
    <li className={`nav-item${isMatched ? " active" : ""}`}>
      <Link
        className={
          isMatched ? "active sidebar-link single" : "sidebar-link single"
        }
        to={to}
      >
        <span className="icon-holder">{icon}</span>
        <span className="title">{title}</span>
      </Link>
    </li>
  );
};

const StoreInfo = observer(() => {
  const { store } = useStores();

  return (
    <>
      <Link
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          padding: 10,
          alignItems: "center",
        }}
        to="/settings/store"
      >
        <img
          src={store?.apotekInfo?.photoURL || urlImage}
          width={40}
          height={40}
          style={{
            borderRadius: "50%",
            backgroundSize: "cover",
            width: 40,
            height: 40,
          }}
        />

        <div
          style={{
            textAlign: "left",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            flexDirection: "column",
            height: 40,
            marginLeft: 10,
          }}
        >
          <div
            style={{
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
              maxWidth: 120,
              marginBottom: 4,
            }}
          >
            <strong>{store?.apotekInfo?.name}</strong>
          </div>
          <div
            style={{
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
              maxWidth: 120,
              fontSize: 14,
            }}
          >
            id: {store?.current_apotek_id}
          </div>
        </div>
      </Link>
    </>
  );
});

const SidebarFooter = () => {
  return (
    <div
      style={{
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: "#fff",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: 10,
          display: "inline-block",
          fontStyle: "italic",
          color: "#333",
        }}
      >
        Powered By
      </div>
      <img
        height={30}
        style={{ marginLeft: 10 }}
        src="src/components/images/Logo_itb.png"
      />
    </div>
  );
};

const Sidebar = ({ showSidebar }) => {
  const height = use100vh();

  return (
    <div className={`sidebar${showSidebar ? " show" : ""}`}>
      <div className="sidebar-inner" style={{ height }}>
        <StoreInfo />

        <ul className="sidebar-menu scrollable pos-r custom-scrollbar">
          <SidebarItems />
        </ul>
        <SidebarFooter />
      </div>
    </div>
  );
};

export default Sidebar;
