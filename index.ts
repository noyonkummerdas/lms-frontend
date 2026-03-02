import "@expo/metro-runtime";
import { registerRootComponent } from "expo";
import React from "react";
import { ExpoRoot } from "expo-router";
import { Provider } from "react-redux";
import { store } from "./store/store";

// Expo Router needs this context to discover app directory routes (fixes "No filename found")
const ctx = require.context("./app");

function App() {
  return React.createElement(
    Provider,
    {
      store,
      children: React.createElement(ExpoRoot, { context: ctx }),
    }
  );
}

registerRootComponent(App);
