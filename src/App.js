import React, { Suspense, lazy } from "react";
import { Provider } from "mobx-react";
import store from "src/stores/AppState";
import store_v2 from "src/stores/StoreV2";

import {
  unstable_HistoryRouter as HistoryRouter,
  Routes as Switch,
  Route,
  Navigate,
} from "react-router-dom";
import { createBrowserHistory } from "history";
const history = createBrowserHistory({ window });

import { pages } from "src/constants/permissions";

// Layouts
const NavbarLayout = lazy(() => import("src/layouts/NavbarLayout"));
const SidebarLayout = lazy(() => import("src/layouts/SidebarLayout"));
const TopbarLayout = lazy(() => import("src/layouts/TopbarLayout"));
const TabsLayout = lazy(() => import("src/layouts/TabsLayout"));

const Dashboard = lazy(() => import("src/screens/Authenticated/Dashboard"));
const Dummy = lazy(() => import("src/screens/Dummy"));

import Spinner from "src/components-v2/Spinner";

const App = () => {
  return (
    <Provider store={store} store_v2={store_v2} history={history}>
      <HistoryRouter history={history}>
        <Suspense fallback={<Spinner />}>
          <Switch>
            <Route element={<NavbarLayout />}>
              {/* <Route path="/" element={<Home />} /> */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
            </Route>
            <Route>
              <Route>
                <Route>
                  <Route element={<SidebarLayout />}>
                    <Route element={<TopbarLayout />}>
                      <Route
                        element={
                          <TabsLayout
                            title={"Analisis"}
                            tabs={[
                              {
                                permission: pages.analysis_pareto,
                                path: "/analysis/pareto",
                                title: "Pareto",
                              },
                              {
                                permission: pages.analysis_purchasing,
                                path: "/analysis/purchasing",
                                title: "Pembelian",
                              },
                              {
                                permission: pages.analysis_busyhours,
                                path: "/analysis/busyhours",
                                title: "Jam Sibuk",
                              },
                              {
                                permission: pages.analysis_prices,
                                path: "/analysis/prices",
                                title: "Harga",
                              },
                            ]}
                          />
                        }
                      >
                        <Route path="/analysis/pareto" element={<Dummy />} />
                        <Route
                          path="/analysis/purchasing"
                          element={<Dummy />}
                        />
                        <Route path="/analysis/busyhours" element={<Dummy />} />
                        <Route path="/analysis/prices" element={<Dummy />} />
                      </Route>

                      <Route
                        element={
                          <TabsLayout
                            title={"Akuntansi"}
                            tabs={[
                              {
                                permission: pages.accounting_ledger,
                                path: "/accounting/ledger",
                                title: "Buku Besar",
                              },
                              {
                                permission: pages.accounting_accounts,
                                path: "/accounting/accounts",
                                title: "Kode Akun",
                              },
                              {
                                permission: pages.accounting_activities,
                                path: "/accounting/activities",
                                title: "Aktivitas",
                              },
                            ]}
                          />
                        }
                      >
                        <Route
                          path="/accounting/accounts"
                          element={<Dummy />}
                        />
                        <Route path="/accounting/ledger" element={<Dummy />} />
                        <Route
                          path="/accounting/activities"
                          element={<Dummy />}
                        />
                      </Route>

                      <Route
                        element={
                          <TabsLayout
                            title={"Konsinyasi"}
                            tabs={[
                              {
                                permission: pages.consignment_all,
                                path: "/consignment/all",
                                title: "Semua",
                              },
                              {
                                permission: pages.consignment_input,
                                path: "/consignment/input",
                                title: "Pengadaan",
                              },
                            ]}
                          />
                        }
                      >
                        <Route path="/consignment/all" element={<Dummy />} />
                        <Route path="/consignment/input" element={<Dummy />} />
                      </Route>

                      <Route
                        element={
                          <TabsLayout
                            title={"Promo"}
                            tabs={[
                              {
                                permission: pages.promo_products,
                                path: "/promo/products",
                                title: "Diskon Produk",
                              },
                              {
                                permission: pages.promo_wholesalers,
                                path: "/promo/wholesalers",
                                title: "Diskon Grosir",
                              },
                              {
                                permission: pages.promo_bundles,
                                path: "/promo/bundles",
                                title: "Bundle Produk",
                              },
                              {
                                permission: pages.promo_memberships,
                                path: "/promo/memberships",
                                title: "Membership",
                              },
                            ]}
                          />
                        }
                      >
                        <Route path="/promo/products" element={<Dummy />} />
                        <Route path="/promo/wholesalers" element={<Dummy />} />
                        <Route path="/promo/bundles" element={<Dummy />} />
                        <Route path="/promo/memberships" element={<Dummy />} />
                      </Route>

                      <Route
                        element={
                          <TabsLayout
                            title={"Resep"}
                            tabs={[
                              {
                                permission: pages.prescriptions_redemptions,
                                path: "/prescriptions/redemptions",
                                title: "Semua Resep",
                              },
                              {
                                permission: pages.prescriptions_input,
                                path: "/prescriptions/input",
                                title: "Penerimaan",
                              },
                              {
                                permission: pages.prescriptions_templates,
                                path: "/prescriptions/templates",
                                title: "Template",
                              },
                            ]}
                          />
                        }
                      >
                        <Route
                          path="/prescriptions/redemptions"
                          element={<Dummy />}
                        />
                        <Route
                          path="/prescriptions/input"
                          element={<Dummy />}
                        />
                        <Route
                          path="/prescriptions/templates"
                          element={<Dummy />}
                        />
                      </Route>

                      <Route path="/profile" element={<Dummy />} />

                      <Route
                        path="/dashboard"
                        element={<Dashboard title="Dashboard" />}
                      />
                      <Route path="/cashier" element={<Dummy />} />

                      <Route
                        element={
                          <TabsLayout
                            title={"Farma Market"}
                            tabs={[
                              {
                                permission: pages.product_catalog,
                                path: "/market/product_catalog",
                                title: "Katalog Produk",
                              },
                              {
                                permission: pages.shopping_cart,
                                path: "/market/cart",
                                title: "Keranjang",
                              },
                              {
                                permission: pages.shopping_history,
                                path: "/market/history",
                                title: "Riwayat Pesanan",
                              },
                              {
                                permission: pages.shopping_payment,
                                path: "/market/payment",
                                title: "Pembayaran",
                              },
                            ]}
                          />
                        }
                      >
                        <Route
                          path="/market/product_catalog"
                          element={<Dummy />}
                        />
                        <Route path="/market/cart" element={<Dummy />} />
                        <Route path="/market/history" element={<Dummy />} />
                        <Route path="/market/payment" element={<Dummy />} />
                        <Route path="/market/detail" element={<Dummy />} />
                      </Route>

                      <Route
                        element={
                          <TabsLayout
                            title={"Penjualan"}
                            tabs={[
                              {
                                permission: pages.sales_all,
                                path: "/sales/all",
                                title: "Semua Penjualan",
                              },
                              {
                                permission: pages.sales_cancelled,
                                path: "/sales/cancelled",
                                title: "Penjualan Dibatalkan",
                              },
                              {
                                permission: pages.sales_rejected,
                                path: "/sales/rejected",
                                title: "Penjualan Tertolak",
                              },
                            ]}
                          />
                        }
                      >
                        <Route path="/sales/all" element={<Dummy />} />
                        <Route path="/sales/rejected" element={<Dummy />} />
                        <Route path="/sales/cancelled" element={<Dummy />} />
                      </Route>

                      <Route
                        element={
                          <TabsLayout
                            title={"Persediaan"}
                            tabs={[
                              {
                                permission: pages.stock_products,
                                path: "/stock/products",
                                title: "Daftar Produk",
                              },
                              {
                                permission: pages.stock_defecta,
                                path: "/stock/defecta",
                                title: "Defecta",
                              },
                              {
                                permission: pages.stock_opname_create,
                                path: "/stock/opname/create",
                                title: "Opname",
                              },
                              {
                                permission: pages.stock_opname_history,
                                path: "/stock/opname/history",
                                title: "Riwayat Opname",
                              },
                              {
                                permission: pages.stock_moving,
                                path: "/stock/moving",
                                title: "Mutasi",
                              },
                            ]}
                          />
                        }
                      >
                        <Route path="/stock/products" element={<Dummy />} />
                        <Route path="/stock/defecta" element={<Dummy />} />
                        <Route
                          path="/stock/opname/create"
                          element={<Dummy />}
                        />
                        <Route
                          path="/stock/opname/history"
                          element={<Dummy />}
                        />
                        <Route path="/stock/moving" element={<Dummy />} />
                      </Route>

                      <Route path="/reports" element={<Dummy />} />

                      <Route
                        element={
                          <TabsLayout
                            title={"Laporan"}
                            tabs={[
                              {
                                permission: pages.reports_financial,
                                path: "/reports/financial",
                                title: "Keuangan",
                              },
                              {
                                permission: pages.reports_sales,
                                path: "/reports/sales",
                                title: "Penjualan",
                              },
                              {
                                permission: pages.reports_procurement,
                                path: "/reports/procurement",
                                title: "Pembelian",
                              },
                              {
                                permission: pages.reports_stock,
                                path: "/reports/stock",
                                title: "Persediaan",
                              },
                            ]}
                          />
                        }
                      >
                        <Route path="/reports/financial" element={<Dummy />} />
                        <Route path="/reports/sales" element={<Dummy />} />
                        <Route
                          path="/reports/procurement"
                          element={<Dummy />}
                        />
                        <Route path="/reports/stock" element={<Dummy />} />
                      </Route>

                      <Route
                        element={
                          <TabsLayout
                            title={"Pembelian"}
                            tabs={[
                              {
                                permission: pages.procurement_purchase_order,
                                path: "/procurement/purchase_order",
                                title: "Pesanan Pembelian",
                              },
                              {
                                permission: pages.procurement_goods_receipt,
                                path: "/procurement/goods_receipt",
                                title: "Faktur Pembelian",
                              },
                              {
                                permission: pages.procurement_goods_return,
                                path: "/procurement/goods_return",
                                title: "Retur Pembelian",
                              },
                            ]}
                          />
                        }
                      >
                        <Route
                          path="/procurement/purchase_order"
                          element={<Dummy />}
                        />
                        <Route
                          path="/procurement/goods_receipt"
                          element={<Dummy />}
                        />
                        <Route
                          path="/procurement/goods_return"
                          element={<Dummy />}
                        />
                      </Route>

                      <Route
                        element={
                          <TabsLayout
                            title="Kontak"
                            tabs={[
                              {
                                permission: pages.contacts_customers,
                                path: "/contacts/customers",
                                title: "Pelanggan",
                              },
                              {
                                permission: pages.contacts_physicians,
                                path: "/contacts/physicians",
                                title: "Dokter",
                              },
                              {
                                permission: pages.contacts_suppliers,
                                path: "/contacts/suppliers",
                                title: "Supplier",
                              },
                            ]}
                          />
                        }
                      >
                        <Route path="/contacts/customers" element={<Dummy />} />
                        <Route
                          path="/contacts/physicians"
                          element={<Dummy />}
                        />
                        <Route path="/contacts/suppliers" element={<Dummy />} />
                      </Route>

                      <Route
                        element={
                          <TabsLayout
                            title="KontakV2"
                            tabs={[
                              {
                                permission: pages.contactsV2_customersV2,
                                path: "/contactsV2/customersV2",
                                title: "PelangganV2",
                              },
                            ]}
                          />
                        }
                      >
                        <Route
                          path="/contactsV2/customersV2"
                          element={<Dummy />}
                        />
                      </Route>

                      <Route
                        element={
                          <TabsLayout
                            title={"Master Data"}
                            tabs={[
                              {
                                permission: pages.master_products,
                                path: "/master/products",
                                title: "Produk",
                              },
                              {
                                permission: pages.master_units,
                                path: "/master/units",
                                title: "Satuan",
                              },
                              {
                                permission: pages.master_racks,
                                path: "/master/racks",
                                title: "Rak",
                              },
                              {
                                permission: pages.master_warehouses,
                                path: "/master/warehouses",
                                title: "Gudang",
                              },
                            ]}
                          />
                        }
                      >
                        <Route path="/master/products" element={<Dummy />} />
                        <Route path="/master/racks" element={<Dummy />} />
                        <Route path="/master/units" element={<Dummy />} />
                        <Route path="/master/warehouses" element={<Dummy />} />
                      </Route>

                      <Route
                        element={
                          <TabsLayout
                            title={"Manajemen Pengguna"}
                            tabs={[
                              {
                                permission: pages.users_all,
                                path: "/users/all",
                                title: "Semua Pengguna",
                              },
                              {
                                permission: pages.users_roles,
                                path: "/users/roles",
                                title: "Akses & Peran",
                              },
                            ]}
                          />
                        }
                      >
                        <Route path="/users/all" element={<Dummy />} />
                        <Route path="/users/roles" element={<Dummy />} />
                      </Route>

                      <Route
                        element={
                          <TabsLayout
                            title={"Pengaturan"}
                            tabs={[
                              {
                                permission: pages.settings_store,
                                path: "/settings/store",
                                title: "Info Apotek",
                              },
                              // {
                              //   permission: pages.settings_struk,
                              //   path: "/settings/struk",
                              //   title: "Struk Kasir",
                              // },
                            ]}
                          />
                        }
                      >
                        <Route path="/settings/store" element={<Dummy />} />
                        <Route path="/settings/struk" element={<Dummy />} />
                      </Route>
                    </Route>
                  </Route>
                </Route>
              </Route>
            </Route>

            <Route path="/404" element={<Dummy />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Switch>
        </Suspense>
      </HistoryRouter>
    </Provider>
  );
};

export default App;
