import { View, Text } from "react-native";

import { s } from "./styles";
import { Step, TypeStep } from "@/components/step";

type TypeSteps = {
  title: string;
  steps: TypeStep[];
};
export default function Steps({ title, steps }: TypeSteps) {
  return (
    <View style={s.container}>
      <Text style={s.title}>{title}</Text>

      {steps.map((step, index) => (
        <Step key={index} {...step} />
      ))}
    </View>
  );
}
