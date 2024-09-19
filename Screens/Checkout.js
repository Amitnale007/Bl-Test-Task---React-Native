import React, { useState, useRef, useEffect } from "react";
import { View, Text, FlatList, Pressable, Alert, Animated, Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../store/cartSlice";

function Checkout({ navigation }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items); 
  const [orderCompleted, setOrderCompleted] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current; 

  const handleOrderCompletion = () => {
    dispatch(clearCart());
    setOrderCompleted(true);

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Alert.alert("Order Completed", "Your order has been placed successfully!", [
    //   { text: "OK", onPress: () => navigation.navigate("Home") },
    // ]);
  };

  useEffect(() => {
    if (orderCompleted) {
      setTimeout(() => setOrderCompleted(false), 2000);
    }
  }, [orderCompleted]);

  const { width, height } = Dimensions.get('window'); 

  return (
    <View className="flex-1 p-6 bg-white">
      <Text className="text-3xl font-bold mb-6 text-center text-blue-600">Checkout</Text>

      {/* Display Cart Items */}
      {cartItems.length > 0 ? (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View className="border border-gray-300 p-4 mb-4 rounded-lg shadow-sm">
              <Text className="text-lg font-semibold">{item.title}</Text>
              <Text className="text-gray-600">Quantity: {item.quantity}</Text>
              <Text className="text-gray-600">Price: Rs {item.price}</Text>
              <Text className="text-gray-700 font-bold mt-2">Total: Rs {item.price * item.quantity}</Text>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 80 }} // Ensure space for button
        />
      ) : (
        <Text className="text-center text-lg text-gray-600">Your cart is empty.</Text>
      )}

   
      {cartItems.length > 0 && (
        <Pressable 
          className="bg-blue-500 p-4 rounded-lg absolute bottom-10 left-0 right-0 mx-4"
          onPress={handleOrderCompletion}
        >
          <Text className="text-white text-center text-lg font-semibold">Complete Order</Text>
        </Pressable>
      )}

   
      {orderCompleted && (
        <Animated.View
          style={{
            opacity: fadeAnim,
            position: 'absolute',
            top: height / 2 - 50, 
            left: width / 2 - 100, 
            width: 200,
            height: 100,
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
        >
          <Text className="text-green-500 text-2xl font-bold">✔️ Order Completed!</Text>
        </Animated.View>
      )}
    </View>
  );
}

export default Checkout;
