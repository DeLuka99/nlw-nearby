import { Categories, CategoriesProps } from "@/components/categories";
import { api } from "@/services/api";
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function Home() {
  const [categories, setCategories] = useState<CategoriesProps>([]);
  const [category, setCategory] = useState("");

  async function fetchCategories() {
    try {
      const { data } = await api("/categories");
      setCategories(data);
      setCategory(data[0].id);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <View>
      sadsa
      <Categories data={categories} onPress={setCategory} selected={category} />
    </View>
  );
}
