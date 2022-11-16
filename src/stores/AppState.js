import { makeAutoObservable } from "mobx";
// import axios from 'axios'


import store_v2 from "./StoreV2";

class AppState {
  authenticated = false;
  authenticating = false;

  isProductsLoaded = false;

  userData = {
    name:'Muhammad Rizal Muhaimin',
    email:'makeAutoObservable@gmail.com',
    username:'Mu'
  };

  current_apotek_id = "RizalApotek";

  // buat modal global
  isShowModalPremiumDescription = false;
  isShowModalChangeSubscriptionPlan = false;

  usersManagement = {};
  products = {};
  warehouses = {};

  current_product_version = 0;

  userFirebase = {};

  cashierProducts = [];

  programs = {};
  invoices = {};
  invoiceData = {};

  serverTimeOffset = 0;

  apotekInfo = {
    name:'ApotekRizal'
  };

  packageCurrent = {};
  apotekPackage = {};

  listenerFirebase = [];

  constructor() {
    makeAutoObservable(this);
  }


  chooseApotek(apotek_id = this.current_apotek_id) {
    const old_apotek_id = this.current_apotek_id;

    if (old_apotek_id) {
      this.unlistenProductVersion(old_apotek_id);
      this.unlistenWarehouses(old_apotek_id);
      this.unlistenApotekInfo(old_apotek_id);
    }

    // let apotek_id = Object.keys(userData.apotek_ids || {})[0] || ""
    // console.log(key);

    this.current_apotek_id = apotek_id;
    store_v2.current_apotek_id = apotek_id;
    this.current_product_version = 0;
    this.products = {};
    this.isProductsLoaded = false;

    this.checkApotekPackage(apotek_id);
    this.loadAndListenWarehouses(apotek_id);
    this.loadAndListenProductVersion(apotek_id);
    this.loadAndListenApotekInfo(apotek_id);
  }

}

export default new AppState();
