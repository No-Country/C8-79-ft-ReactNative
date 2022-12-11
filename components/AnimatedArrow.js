import { Animated } from "react-native";
import React, {  useRef } from "react";
import { Icon } from "@rneui/themed";
import { useTheme } from "@react-navigation/native";
import { useEffect } from "react";

const ArrowAnimated = () => {
  const scale = useRef(new Animated.Value(0)).current;
  const move = useRef(new Animated.Value(0)).current;
  const { colors } = useTheme();

  useEffect(() => {
    action();
    //   return () => {
    //     console.log("salio");
    //   };
  }, []);

  const action = () => {
    Animated.stagger(700, [
      Animated.timing(scale, {
        toValue: 1.5,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(move, {
        toValue: 999,
        duration: 1500,
        useNativeDriver: true,
      }),
    ]).start();
  };
  return (
    <Animated.View
      style={{
        position: "absolute",
        left: 30,
        top: 300,
        zIndex: 100,
        transform: [{ scale: scale }, { translateX: move }],
      }}
    >
      <Icon
        size={100}
        color={colors.arrow}
        name="arrow-long-right"
        type="entypo"
      />
    </Animated.View>
  );
};

export default ArrowAnimated;
