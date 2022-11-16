import { makeAutoObservable, reaction, computed } from "mobx";

import store from "./AppState.js";

import { listenDatabase } from "src/functions/listener";

import { pages } from "src/constants/permissions";

const IS_LOCAL_FUNCTIONS = true;

class StoreV2 {
  current_apotek_id = "";

  roles = {};
  warehouses = {};
  apotekInfo = {};

  firebaseListeners = [];

  userFirebase = {};
  userClaims = {};
  userData = {};

  isPrintReceipt = true;

  constructor() {
    makeAutoObservable(this);
  }

  callFunctions(endpoint, payload) {
    const functionsForRegion = firebaseApp.functions("asia-southeast2");

    if (IS_LOCAL_FUNCTIONS) {
      functionsForRegion.useFunctionsEmulator("http://localhost:5001");
    }

    return functionsForRegion
      .httpsCallable(endpoint)({
        apotek_id: store.current_apotek_id,
        created_by: {
          uid: this.userFirebase?.uid,
          isCustomUser: this.userClaims?.isCustomUser,
          username: this.userClaims?.username,
          name: this.userData?.name,
        },
        ...payload,
      })
      .then(({ data }) => {
        const { code } = data;

        if (code === "success") {
          return Promise.resolve(data);
        }

        return Promise.reject(data);
      });
  }

  listenAllData(apotek_id = store.current_apotek_id) {
    if (apotek_id && apotek_id.length > 0) {
      this.listenUserData(this.userClaims);

      this.listenDatabaseToState(
        "roles",
        ApotekDatabaseRef.child("data")
          .child(apotek_id)
          .child("data")
          .child("users_roles")
      );

      this.listenDatabaseToState(
        "warehouses",
        ApotekDatabaseRef.child("data")
          .child(apotek_id)
          .child("data")
          .child("master_warehouses")
      );

      this.listenDatabaseToState(
        "apotekInfo",
        ApotekDatabaseRef.child("data").child(apotek_id).child("info"),
        null,
        true
      );
    }
  }

  listenUserData(userClaims) {
    const { user_id, isCustomUser, username, apotek_id } = userClaims || {};

    if (isCustomUser === true) {
      this.updateState("current_apotek_id", apotek_id);

      const customUserDataRef = ApotekDatabaseRef.child("data")
        .child(apotek_id)
        .child("users")
        .child("public")
        .child(username);

      customUserDataRef.on("value", (snapshot) => {
        const userData = snapshot.val();
        store.updateUserData({ ...userData, isCustomUser: true });
        store.chooseApotek(apotek_id);

        const newUserData = {
          uid: user_id,
          isCustomUser: true,
          ...userData,
        };

        this.updateState("userData", newUserData);
      });

      this.firebaseListeners.push(customUserDataRef);
    } else if (user_id) {
      this.listenDatabaseToState(
        "userData",
        MainDatabaseRef.child("users").child(user_id),
        (userData) => {
          store.updateUserData({ ...userData });
        },
        true
      );
    }
  }

  listenDatabaseToState(state_key, databaseRef, callback, isOnValue) {
    listenDatabase(databaseRef, isOnValue, (newData) => {
      this.updateState(state_key, newData);

      if (typeof callback === "function") callback(newData);
    });

    this.firebaseListeners.push(databaseRef);
  }

  updateState(state_key, value) {
    this[state_key] = value;
  }

  unlistenAllData() {
    this.firebaseListeners.forEach((listener) => {
      if (listener && listener.off) listener.off();
    });

    this.firebaseListeners = [];
  }

  checkAuth() {
    const unsubscribe = firebase.auth().onAuthStateChanged((userFirebase) => {
      this.updateState("userFirebase", userFirebase);

      unsubscribe();
    });
  }

  updateUserClaims() {
    if (firebase.auth().currentUser) {
      return firebase
        .auth()
        .currentUser.getIdTokenResult()
        .then(({ claims }) => {
          this.updateState("userClaims", claims);
        });
    }
    return Promise.reject();
  }

  updateUserFirebase(userFirebase) {
    this.userFirebase = userFirebase;
  }

  logout() {
    this.unlistenAllData();

    this.userFirebase = {};
    this.userClaims = {};
    this.userData = {};
    this.warehouses = {};
    this.roles = {};
    this.current_apotek_id = {};

    store.logout();
  }

  @computed get authenticated() {
    return this.userFirebase?.uid;
  }

  @computed get permissions() {
    const { role_id } = this.userData;
    const roleData = this.roles;

    if (this.userClaims.isCustomUser) {
      return {
        name: roleData?.[role_id]?.name,
        pages: roleData?.[role_id]?.pages,
        actions: roleData?.[role_id]?.actions,
      };
    }

    return {
      name: "Owner",
      pages: Object.keys(pages || {}).reduce(
        (acc, curr) => {
          return {
            ...acc,
            [curr]: true,
          };
        },
        {
          choose_apotek: true,
          create_apotek: true,
        }
      ),
      actions: {},
    };
  }

  @computed get apotekDataRef() {
    return ApotekDatabaseRef.child("data")
      .child(this.current_apotek_id)
      .child("data");
  }
}

const store_v2 = new StoreV2();

reaction(
  () => store_v2.current_apotek_id,
  (apotek_id) => {
    if (apotek_id) {
      store_v2.unlistenAllData();
      store_v2.listenAllData(apotek_id);
      store.chooseApotek(apotek_id);
    }
  }
);

reaction(
  () => store_v2.userFirebase,
  (userFirebase) => {
    store.updateUserFirebase(userFirebase);
    if (userFirebase && userFirebase.uid) {
      return store_v2.updateUserClaims();
    }
  }
);

reaction(
  () => store_v2.userClaims,
  (userClaims) => {
    if (userClaims && userClaims.user_id) {
      store_v2.listenUserData(userClaims);
    }
  }
);

export default store_v2;
