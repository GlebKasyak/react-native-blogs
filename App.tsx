import React, { useState } from "react";
import { Provider } from "mobx-react"
import "mobx-react-lite/batchingForReactDom";
import { AppLoading } from "expo";

import AppNavigation from "./src/navigation/AppNavigation";
import bootstrap from "./src/shared/bootstrap";

import rootStore from "./src/store";

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
      <Provider rootStore={ rootStore } >
        <AppNavigation/>
      </Provider>
  );
}
