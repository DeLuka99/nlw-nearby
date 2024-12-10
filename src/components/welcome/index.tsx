import { View, Image, Text } from "react-native";

import { s } from "./styles";

export default function Welcome() {
  return (
    <View style={s.container}>
      <Image source={require("@/assets/logo.png")} style={s.logo} />

      <View style={s.titles}>
        <Text style={s.title}>Boas vindas ao Nearby!</Text>
        <Text style={s.subtitle}>
          Tenha cupons de vantagem para usar em seus estabelecimentos favoritos.
        </Text>
      </View>
    </View>
  );
}
