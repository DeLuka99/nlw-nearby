import { Alert, View } from "react-native";
import { useEffect, useState } from "react";
import { api } from "@/services/api";

import { Categories, CategoriesProps } from "@/components/categories";
import { PlaceProps } from "@/components/place";
import { Places } from "@/components/places";

type MerketsProps = PlaceProps;
export default function Home() {
  const [categories, setCategories] = useState<CategoriesProps>([]);
  const [category, setCategory] = useState("");
  const [markets, setMarkets] = useState<MerketsProps[]>([]);

  async function fetchCategories() {
    try {
      const { data } = await api.get("/categories");
      setCategories(data);
      setCategory(data[0].id);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  async function fetchMarkets() {
    try {
      if (!category) return;

      const { data } = await api.get(`/markets/category/${category}`);
      setMarkets(data);
    } catch (error) {
      console.error("Error fetching markets:", error);
      Alert.alert("Locais", "Error fetching markets");
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchMarkets();
  }, [category]);

  return (
    <View style={{ flex: 1, backgroundColor: "red" }}>
      <Categories data={categories} onPress={setCategory} selected={category} />

      <Places data={markets} />
    </View>
  );
}
