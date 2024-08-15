import React from "react";
import {
  View,
  Text,
  Image,
  Modal,
  TouchableOpacity,
  Button,
  TouchableWithoutFeedback,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { addToCart } from "../store/cartSlice";

const ProductModal = ({ visible, product, onClose }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const productInCart = cartItems.find(
    (cartItem) => cartItem.id === product.id
  );

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    onClose();
  };
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 justify-center items-center ">
          <View
            className="bg-white rounded-lg p-4 w-80 shadow-2xl "
            style={{ elevation: 5, borderWidth: 1, borderColor: "grey" }}
          >
            <Image
              source={{ uri: product.image }}
              className="h-40 w-full object-cover rounded-md"
              resizeMode="contain"
            />
            <Text className="text-lg font-bold mt-4">Description:</Text>
            <Text className="text-gray-700 mt-2">{product.description}</Text>

            <View className="flex-row justify-between mt-4">
              {!productInCart && (
                <TouchableOpacity
                  onPress={handleAddToCart}
                  className="bg-red-500 py-2 px-4 rounded-lg flex-row items-center"
                >
                  <AntDesign name="shoppingcart" size={24} color="white" />
                  <Text className="text-white ml-2">Add To Cart</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={onClose}
                className="bg-slate-500 py-2 px-4 rounded-lg flex-row items-center"
              >
                <Text className="text-white ml-2">Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ProductModal;
