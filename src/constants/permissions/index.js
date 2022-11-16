const pages = {
  dashboard: {
    label: "Dashboard",
    value: "dashboard",
    url: "/dashboard",
  },
  cashier: {
    label: "Kasir",
    value: "cashier",
    url: "/cashier",
  },
  promo_products: {
    label: "Diskon Produk",
    value: "promo_products",
    url: "/promo/products",
  },
  promo_wholesalers: {
    label: "Diskon Grosir",
    value: "promo_wholesalers",
    url: "/promo/wholesalers",
  },
  promo_bundles: {
    label: "Bundle Produk",
    value: "promo_bundles",
    url: "/promo/bundles",
  },
  promo_memberships: {
    label: "Membership",
    value: "promo_memberships",
    url: "/promo/memberships",
  },
  prescriptions_redemptions: {
    label: "Daftar Resep",
    value: "prescriptions_redemptions",
    url: "/prescriptions/redemptions",
  },
  prescriptions_input: {
    label: "Penerimaan",
    value: "prescriptions_input",
    url: "/prescriptions/input",
  },
  prescriptions_templates: {
    label: "Template",
    value: "prescriptions_templates",
    url: "/prescriptions/templates",
  },
  sales_all: {
    label: "Daftar Penjualan",
    value: "sales_all",
    url: "/sales/all",
  },
  sales_rejected: {
    label: "Penjualan Dibatalkan",
    value: "sales_rejected",
    url: "/sales/rejected",
  },
  sales_cancelled: {
    label: "Penjualan Tertolak",
    value: "sales_cancelled",
    url: "/sales/cancelled",
  },
  stock_products: {
    label: "Daftar Produk",
    value: "stock_products",
    url: "/stock/products",
  },
  stock_defecta: {
    label: "Defecta",
    value: "stock_defecta",
    url: "/stock/defecta",
  },
  stock_opname_create: {
    label: "Opname",
    value: "stock_opname_create",
    url: "/stock/opname/create",
  },
  stock_opname_history: {
    label: "Riwayat Opname",
    value: "stock_opname_history",
    url: "/stock/opname/history",
  },
  stock_moving: {
    label: "Mutasi",
    value: "stock_moving",
    url: "/stock/moving",
  },
  consignment_all: {
    label: "Daftar Konsinyasi",
    value: "consignment_all",
    url: "/consignment/all",
  },
  consignment_input: {
    label: "Pengadaan",
    value: "consignment_input",
    url: "/consignment/input",
  },
  procurement_purchase_order: {
    label: "Pesanan Pembelian",
    value: "procurement_purchase_order",
    url: "/procurement/purchase_order",
  },
  procurement_goods_receipt: {
    label: "Faktur Pembelian",
    value: "procurement_goods_receipt",
    url: "/procurement/goods_receipt",
  },
  procurement_goods_return: {
    label: "Retur Pembelian",
    value: "procurement_goods_return",
    url: "/procurement/goods_return",
  },
  market_product_catalog: {
    label: "Katalog Produk",
    value: "market_product_catalog",
    url: "/market/product_catalog",
  },
  market_cart: {
    label: "Keranjang",
    value: "market_cart",
    url: "/market/cart",
  },
  market_history: {
    label: "Riwayat",
    value: "market_history",
    url: "/market/history",
  },
  market_payment: {
    label: "Pembayaran",
    value: "market_payment",
    url: "market/payment",
  },
  market_detail: {
    label: "Detail Pesanan",
    value: "market_detail",
    url: "market/detail",
  },
  master_products: {
    label: "Produk",
    value: "master_products",
    url: "/master/products",
  },
  master_units: {
    label: "Satuan",
    value: "master_units",
    url: "/master/units",
  },
  master_racks: {
    label: "Rak",
    value: "master_racks",
    url: "/master/racks",
  },
  master_warehouses: {
    label: "Gudang",
    value: "master_warehouses",
    url: "/master/warehouses",
  },
  contacts_customers: {
    label: "Pelanggan",
    value: "contacts_customers",
    url: "/contacts/customers",
  },
  contacts_physicians: {
    label: "Dokter",
    value: "contacts_physicians",
    url: "/contacts/physicians",
  },
  contacts_suppliers: {
    label: "Supplier",
    value: "contacts_suppliers",
    url: "/contacts/suppliers",
  },
  contactsV2_customersV2: {
    label: "PelangganV2",
    value: "contactsV2_customersV2",
    url: "/contactsV2/customersV2",
  },
  accounting_ledger: {
    label: "Buku Besar",
    value: "accounting_ledger",
    url: "/accounting/ledger",
  },
  accounting_accounts: {
    label: "Kode Akun",
    value: "accounting_accounts",
    url: "/accounting/accounts",
  },
  accounting_activities: {
    label: "Aktivitas",
    value: "accounting_activities",
    url: "/accounting/activities",
  },
  reports_financial: {
    label: "Keuangan",
    value: "reports_financial",
    url: "/reports/financial",
  },
  reports_sales: {
    label: "Penjualan",
    value: "reports_sales",
    url: "/reports/sales",
  },
  reports_procurement: {
    label: "Pembelian",
    value: "reports_procurement",
    url: "/reports/procurement",
  },
  reports_stock: {
    label: "Persediaan",
    value: "reports_stock",
    url: "/reports/stock",
  },
  analysis_pareto: {
    label: "Pareto",
    value: "analysis_pareto",
    url: "/analysis/pareto",
  },
  analysis_purchasing: {
    label: "Pembelian",
    value: "analysis_purchasing",
    url: "/analysis/purchasing",
  },
  analysis_busyhours: {
    label: "Jam Sibuk",
    value: "analysis_busyhours",
    url: "/analysis/busyhours",
  },
  analysis_prices: {
    label: "Harga",
    value: "analysis_prices",
    url: "/analysis/prices",
  },
  users_all: {
    label: "Daftar Pengguna",
    value: "users_all",
    url: "/users/all",
  },
  users_roles: {
    label: "Akses & Peran",
    value: "users_roles",
    url: "/users/roles",
  },
  settings_store: {
    label: "Profil Apotek",
    value: "settings_store",
    url: "/settings/store",
  },
  settings_struk: {
    label: "Struk Apotek",
    value: "settings_struk",
    url: "/settings/struk",
  },
  // Page for Owners
  choose_apotek: {
    label: "Pilih Apotek",
    value: "choose_apotek",
    url: "/choose_apotek",
  },
  create_apotek: {
    label: "Profil Apotek",
    value: "create_apotek",
    url: "/create_apotek",
  },
  receipt: {
    label: "Struk",
    value: "receipt",
    url: "/receipt/:sales_id",
  },
};

const pagePermissions = [
  {
    label: "Dashboard",
    content: [pages.dashboard],
  },
  {
    label: "Kasir",
    content: [pages.cashier],
  },
  {
    label: "Promo",
    content: [
      pages.promo_products,
      pages.promo_wholesalers,
      pages.promo_bundles,
      pages.promo_memberships,
    ],
  },
  {
    label: "Resep",
    content: [
      pages.prescriptions_redemptions,
      pages.prescriptions_input,
      pages.prescriptions_templates,
    ],
  },
  {
    label: "Penjualan",
    content: [pages.sales_all, pages.sales_rejected, pages.sales_cancelled],
  },
  {
    label: "Persediaan",
    content: [
      pages.stock_products,
      pages.stock_defecta,
      pages.stock_opname_create,
      pages.stock_opname_history,
      pages.stock_moving,
    ],
  },
  {
    label: "Konsinyasi",
    content: [pages.consignment_all, pages.consignment_input],
  },
  {
    label: "Pembelian",
    content: [
      pages.procurement_purchase_order,
      pages.procurement_goods_receipt,
      pages.procurement_goods_return,
    ],
  },
  {
    label: "Market",
    content: [
      pages.product_catalog,
      pages.shopping_cart,
      pages.shopping_history,
      pages.shopping_payment,
    ],
  },
  {
    label: "Master Data",
    content: [
      pages.master_products,
      pages.master_units,
      pages.master_racks,
      pages.master_warehouses,
    ],
  },
  {
    label: "Kontak",
    content: [
      pages.contacts_customers,
      pages.contacts_physicians,
      pages.contacts_suppliers,
    ],
  },
  {
    label: "KontakV2",
    content: [pages.contactsV2_customersV2],
  },
  {
    label: "Akuntansi",
    content: [
      pages.accounting_ledger,
      pages.accounting_accounts,
      pages.accounting_activities,
    ],
  },
  {
    label: "Laporan",
    content: [
      pages.reports_financial,
      pages.reports_sales,
      pages.reports_procurement,
      pages.reports_stock,
    ],
  },
  {
    label: "Analisis",
    content: [
      pages.analysis_pareto,
      pages.analysis_purchasing,
      pages.analysis_busyhours,
      pages.analysis_prices,
    ],
  },
  {
    label: "Manajemen Pengguna",
    content: [pages.users_all, pages.users_roles],
  },
  {
    label: "Pengaturan",
    content: [pages.settings_store],
  },
];

export { pages, pagePermissions };
