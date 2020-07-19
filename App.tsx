import React, { useState } from "react";
import { Provider } from "react-redux";
import { AppLoading } from "expo";

import AppNavigation from "./src/navigation/AppNavigation";
import bootstrap from "./src/shared/bootstrap";

import store from "./src/store";

export default function App() {
  const [isReady, setIsReady] = useState(false);

  if (!isReady) {
    return <AppLoading
        startAsync={ bootstrap }
        onError={ (err) => console.log(err) }
        onFinish={ () => setIsReady(true) }
    />
  }

  return (
      <Provider store={ store } >
        <AppNavigation/>
      </Provider>
  );
}
