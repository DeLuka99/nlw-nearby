import { useEffect, useRef, useState } from "react";
import { Alert, Modal, Text, View, ScrollView, StatusBar } from "react-native";
import { router, useLocalSearchParams, Redirect } from "expo-router";
import { useCameraPermissions, CameraView } from "expo-camera";

import { api } from "@/services/api";
import { Loading } from "@/components/loading";
import { Cover } from "@/components/market/cover";
import { Details, PropsDetails } from "@/components/market/details";
import { Coupon } from "@/components/market/coupon";
import { Button } from "@/components/button";

type DataProps = PropsDetails & {
  cover: string;
};
export default function DetailMarket() {
  const [data, setData] = useState<DataProps>();
  const [coupon, setCoupon] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [couponIsFetching, setCouponIsFetching] = useState(false);
  const [isVisibleCameraModal, setIsVisibleCameraModal] = useState(false);

  const params = useLocalSearchParams<{ id: string }>();
  const [_, requestPermission] = useCameraPermissions();
  const qrLock = useRef(false);

  async function fetchMarket() {
    try {
      const { data } = await api.get(`/markets/${params.id}`);
      setData(data);
      setIsLoading(false);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os dados", [
        { text: "Voltar", onPress: () => router.back() },
      ]);
    }
  }

  async function handleOpenCamera() {
    try {
      const { granted } = await requestPermission();
      if (!granted) {
        return Alert.alert(
          "Permissão de câmera negada",
          "Para usar a câmera, permita essa permissão"
        );
      }

      qrLock.current = false;
      setIsVisibleCameraModal(true);
    } catch (error) {
      console.log(error);
    }
  }

  async function getCoupon(id: string) {
    try {
      setCouponIsFetching(true);

      const { data } = await api.patch(`/coupons/${id}`);
      Alert.alert("Cupom", data.coupon);
      setCoupon(data.coupon);
    } catch (error) {
      console.log(error);
    } finally {
      setCouponIsFetching(false);
    }
  }

  function handleUseCoupon(code: string) {
    setIsVisibleCameraModal(false);

    Alert.alert(
      "Cupom",
      "Não é possivel utilizar um cupom resgatado. Deseja realmente resgatar o cupom?",
      [
        { text: "Não", style: "cancel" },
        { text: "Sim!", onPress: () => getCoupon(code) },
      ]
    );
  }

  useEffect(() => {
    fetchMarket();
  }, [params.id, coupon]);

  if (isLoading) return <Loading />;

  if (!data) return <Redirect href="/home" />;

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" hidden={isVisibleCameraModal} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Cover uri={data.cover} />
        <Details data={data} />
        {coupon && <Coupon code={coupon} />}
      </ScrollView>

      <View style={{ padding: 32 }}>
        <Button onPress={handleOpenCamera}>
          <Button.Title>Ler QR Code</Button.Title>
        </Button>
      </View>

      <Modal style={{ flex: 1 }} visible={isVisibleCameraModal}>
        <CameraView
          style={{ flex: 1 }}
          facing="back"
          onBarcodeScanned={({ data }) => {
            if (data && !qrLock.current) {
              qrLock.current = true;
              setTimeout(() => handleUseCoupon(data), 500);
            }
          }}
        />

        <View style={{ position: "absolute", bottom: 32, left: 32, right: 32 }}>
          <Button
            onPress={() => setIsVisibleCameraModal(false)}
            isLoading={couponIsFetching}
          >
            <Button.Title>Voltar</Button.Title>
          </Button>
        </View>
      </Modal>
    </View>
  );
}
