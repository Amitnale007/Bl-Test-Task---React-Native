import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StatusBar,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import axios from "axios";
import ProductCard from "../Components/ProductCard";
import ProductModal from "../Components/ProductModal";

function Home(props) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); // New loading state
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setData(response.data);
        setLoading(false); // Data is loaded, stop loading
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false); // Stop loading on error
      });
  }, []);

  const openModal = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedProduct(null);
  };

  return (
    <View
      className="flex-1 justify-start items-center"
      style={{ paddingTop: StatusBar.currentHeight }}
    >
      <View className="w-full h-[60px] bg-sky-400 items-center justify-center">
        <Text className="text-[20px] text-white">Shopping</Text>
      </View>

      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ProductCard item={item} onPress={() => openModal(item)} />
          )}
          showsVerticalScrollIndicator={false}
        />
      )}

      {selectedProduct && (
        <ProductModal
          visible={modalVisible}
          product={selectedProduct}
          onClose={closeModal}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default Home;
