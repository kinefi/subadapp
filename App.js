import React from "react";
import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";
import "react-native-get-random-values";
import Toast from "react-native-toast-message";
import Player from "./src/components/player";
import { ContextProvider } from "./src/helpers/context";
import { NavigationService } from "./src/services/navigation";

export default function App() {
  return (
    <ContextProvider>
      <NavigationService />
      <Player />
      <StatusBar style="auto" />
      <Toast />
    </ContextProvider>
  );
}
