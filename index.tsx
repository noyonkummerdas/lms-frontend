import { registerRootComponent } from "expo";
import { ExpoRoot } from "expo-router";
import { Provider } from "react-redux";
import { store } from "./store/store";

// Expo Router needs this context to discover app directory routes (fixes "No filename found")
const ctx = require.context("./app");

function App() {
  return (
    <Provider store={store}>
      <ExpoRoot context={ctx} />
    </Provider>
  );
}

registerRootComponent(App);
