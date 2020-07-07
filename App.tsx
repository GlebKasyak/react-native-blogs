import React, { useState } from "react";
import { Text, View } from "react-native";
import { AppLoading } from "expo";

import bootstrap from "./src/shared/bootstrap";

export default function App() {
  const [isReady, setIsReady] = useState(false);

  if(!isReady) {
    return <AppLoading
        startAsync={ bootstrap }
        onError={ (err) => console.log(err) }
        onFinish={ () => setIsReady(true) }
    />
  }

  return (
    <View >
      <Text>Text</Text>
    </View>
  );
}
