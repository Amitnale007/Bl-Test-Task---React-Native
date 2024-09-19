import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StatusBar, ActivityIndicator, Button } from "react-native";
import axios from "axios";
import ProductCard from "../Components/ProductCard";
import ProductModal from "../Components/ProductModal";
import { useNavigation } from "@react-navigation/native"; // Navigation hook

function Home(props) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
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
    <View className="flex-1 justify-start items-center" 
    // style={{ paddingTop: StatusBar.currentHeight }}
    >
      {/* <View className="w-full h-[60px] bg-sky-400 items-center justify-center">
        <Text className="text-[20px] text-white">Shopping</Text>
      </View> */}

      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ProductCard item={item} onPress={() => openModal(item)} />
            )}
            showsVerticalScrollIndicator={false}
          />

          <View className="w-full items-center mt-4">
            <Button title="Go to Checkout" onPress={() => navigation.navigate("Checkout")} color="#1E90FF" />
          </View>
        </>
      )}

      {selectedProduct && (
        <ProductModal visible={modalVisible} product={selectedProduct} onClose={closeModal} />
      )}
    </View>
  );
}

export default Home;
