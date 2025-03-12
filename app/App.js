import "react-native-gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./store/store";

import Navigation from "./components/Navigation/Navigation";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigation Drawer={Drawer} />
      </PersistGate>
    </Provider>
  );
}
