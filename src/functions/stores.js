import React from "react";
import { MobXProviderContext } from "mobx-react";

function useStores() {
  return React.useContext(MobXProviderContext);
}

const Stores = MobXProviderContext;

export { useStores, Stores };
