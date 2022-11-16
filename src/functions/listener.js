import { useState, useEffect, useMemo } from "react";

const useListenDatabase = (
  databaseRef,
  isOnValue = false,
  onDataChange = () => {}
) => {
  const [data, setData] = useState();

  let listenerValue;
  let listenerChildAdded;
  let listenerChildChanged;
  let listenerChildRemoved;

  useEffect(() => {
    let hasLoad = false;

    if (isOnValue) {
      listenerValue = databaseRef.on("value", (snapshot) => {
        if (!hasLoad) {
          return;
        }
        const newData = snapshot.val();
        setData(newData);
        if (typeof onDataChange === "function") onDataChange(newData);
      });
    } else {
      listenerChildAdded = databaseRef.on("child_added", (snapshot) => {
        if (!hasLoad) {
          return;
        }
        setData((currData) => {
          const newChildData = snapshot.val();
          const newChildKey = snapshot.key;

          const newData = { ...currData, [newChildKey]: newChildData };
          if (typeof onDataChange === "function") onDataChange(newData);
          return newData;
        });
      });

      listenerChildChanged = databaseRef.on("child_changed", (snapshot) => {
        if (!hasLoad) {
          return;
        }
        setData((currData) => {
          const newChildData = snapshot.val();
          const newChildKey = snapshot.key;

          const newData = { ...currData, [newChildKey]: newChildData };

          if (typeof onDataChange === "function") onDataChange(newData);
          return newData;
        });
      });

      listenerChildRemoved = databaseRef.on("child_removed", (snapshot) => {
        if (!hasLoad) {
          return;
        }
        setData((currData) => {
          const newData = { ...currData };
          const newKeyChild = snapshot.key;
          delete newData[newKeyChild];

          if (typeof onDataChange === "function") onDataChange(newData);
          return newData;
        });
      });
    }

    databaseRef.once("value").then((snapshot) => {
      hasLoad = true;
      const newData = { ...snapshot.val() };
      setData(newData);
      onDataChange(newData);
    });

    return () => {
      if (listenerValue) {
        databaseRef.off("value", listenerValue);
      }
      if (listenerChildAdded) {
        databaseRef.off("child_added", listenerChildAdded);
      }
      if (listenerChildChanged) {
        databaseRef.off("child_changed", listenerChildChanged);
      }
      if (listenerChildRemoved) {
        databaseRef.off("child_removed", listenerChildRemoved);
      }
    };
  }, []);

  return [data, databaseRef];
};

const useFilteredData = (
  items,
  searchText,
  filterFunction,
  // onlySearchTextExists = true
  selectedFilter
) => {
  return useMemo(() => {
    let finalData = {};

    Object.entries(items || {})
      .filter(([, item]) => {
        const isFiltering = searchText?.length > 0;

        if (isFiltering || selectedFilter) {
          return filterFunction(item);
        } else {
          return true;
        }
      })
      .forEach(([key, value]) => {
        finalData[key] = value;
      });

    return finalData;
  }, [items, searchText, selectedFilter]);
};

const listenDatabase = (
  databaseRef,
  isOnValue = false,
  onDataChange = () => {}
) => {
  let hasLoad = false;
  let data;

  if (isOnValue) {
    databaseRef.on("value", (snapshot) => {
      const newData = snapshot.val();
      data = newData;
      if (typeof onDataChange === "function") onDataChange(newData);
    });
  } else {
    databaseRef.on("child_added", (snapshot) => {
      if (!hasLoad) {
        return;
      }
      const newChildData = snapshot.val();
      const newChildKey = snapshot.key;

      const newData = { ...data, [newChildKey]: newChildData };
      data = newData;
      if (typeof onDataChange === "function") onDataChange(newData);
    });

    databaseRef.on("child_changed", (snapshot) => {
      if (!hasLoad) {
        return;
      }
      const newChildData = snapshot.val();
      const newChildKey = snapshot.key;

      const newData = { ...data, [newChildKey]: newChildData };

      data = newData;
      if (typeof onDataChange === "function") onDataChange(newData);
    });

    databaseRef.on("child_removed", (snapshot) => {
      if (!hasLoad) {
        return;
      }
      const newData = { ...data };
      const newKeyChild = snapshot.key;
      delete newData[newKeyChild];

      data = newData;
      if (typeof onDataChange === "function") onDataChange(newData);
    });
  }

  databaseRef.once("value").then((snapshot) => {
    hasLoad = true;
    const newData = { ...snapshot.val() };
    data = newData;
    if (typeof onDataChange === "function") onDataChange(newData);
  });

  return () => {
    databaseRef.off();
  };
};

export { useListenDatabase, useFilteredData, listenDatabase };
