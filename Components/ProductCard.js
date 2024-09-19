import React from "react";
import { View, Text, Image, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { AntDesign } from "@expo/vector-icons"; // For icons
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  incrementQuantity,
  decrementQuantity,
} from "../store/cartSlice";

function ProductCard({ item, onPress }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const productInCart = cartItems.find((cartItem) => cartItem.id === item.id);

  const handleAddToCart = () => {
    dispatch(addToCart(item));
  };

  const handleIncrement = () => {
    dispatch(incrementQuantity(item.id));
  };

  const handleDecrement = () => {
    dispatch(decrementQuantity(item.id));
  };

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View className="border-[1px] border-gray-300 rounded-lg shadow-lg w-80 p-4 bg-white m-2">
        <Image
          source={{ uri: item.image }}
          className="h-32 w-full object-cover rounded-md"
          resizeMode="contain"
        />
        <Text className="text-lg font-bold mt-4">{item.title}</Text>
        <View className="flex-row items-center mt-2">
          <Text className="text-yellow-500">
            {"★".repeat(Math.round(item.rating.rate))}
            {"☆".repeat(5 - Math.round(item.rating.rate))}
          </Text>
          <Text className="ml-2 text-gray-500">{item.rating.count}</Text>
        </View>
        <Text className="text-xl font-bold mt-2">Rs. {item.price}</Text>
        <Text className="text-gray-500 mt-1">Category: {item.category}</Text>

        {productInCart ? (
          <View className="flex-row items-center justify-between mt-4">
            <TouchableOpacity
              onPress={handleDecrement}
              className="bg-gray-200 p-2 rounded-lg"
            >
              <AntDesign name="minus" size={16} color="black" />
            </TouchableOpacity>
            <Text className="mx-4 text-lg">{productInCart.quantity}</Text>
            <TouchableOpacity
              onPress={handleIncrement}
              className="bg-gray-200 p-2 rounded-lg"
            >
              <AntDesign name="plus" size={16} color="black" />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            onPress={handleAddToCart}
            className="bg-red-500 py-2 px-4 rounded-lg mt-4"
          >
            <Text className="text-white text-center">Add To Cart</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

export default ProductCard;
