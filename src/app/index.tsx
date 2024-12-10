import { View, Text } from "react-native";
import { IconMapPin, IconQrcode, IconTicket } from "@tabler/icons-react-native";

import Steps from "@/components/steps";
import Welcome from "@/components/welcome";

export default function Index() {
  return (
    <View style={{ flex: 1, padding: 40, gap: 40 }}>
      <Welcome />

      <Steps
        title="Veja como funciona:"
        steps={[
          {
            icon: IconMapPin,
            title: "Encontre estabelecimentos",
            description: "Veja locais perto de você que são parceiros Nearby",
          },
          {
            icon: IconQrcode,
            title: "Ative o cupom com QR Code",
            description:
              "Escaneie o código no estabelecimento para usar o benefício",
          },
          {
            icon: IconTicket,
            title: "Garanta vantagens perto de você",
            description:
              "Ative cupons onde estiver, em diferentes tipos de estabelecimento ",
          },
        ]}
      />
    </View>
  );
}
