import { createDrawerNavigator } from "@react-navigation/drawer";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./store/store";
import { RefreshControl, ScrollView } from "react-native";
import { useState, useCallback } from "react";

import Navigation from "./components/Navigation/Navigation";

const Drawer = createDrawerNavigator();

export default function App() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigation Drawer={Drawer} />
      </PersistGate>
    </Provider>
  );
}
