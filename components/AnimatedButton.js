import { Dimensions, Animated, Text } from "react-native";
import React, { useRef, useCallback } from "react";
import { Button, Icon } from "@rneui/themed";
import { useTheme, useFocusEffect } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;

export default function AnimatedButton({ icon, title }) {
  const { colors } = useTheme();
  const opacity = useRef(new Animated.Value(0)).current;
  //const size = useState(new Animated.Value(0))[0];
  const scale = useRef(new Animated.Value(0)).current;

  useFocusEffect(
    useCallback(() => {
      bounce();
      return () => {
        scale.setValue(0);
        opacity.setValue(0);
      };
    }, [])
  );

  // Animated.spring(size, {
  //   toValue: 50,
  //   duration: 2000,
  //   friction:1,
  //   tension:20,
  //   useNativeDriver:false
  // }).start();

  const bounce = () => {
    Animated.stagger(100, [
      Animated.spring(scale, {
        toValue: 1,
        bounciness: 24,
        speed: 5,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <Animated.View
      style={{
        opacity: opacity,
        transform: [{ scale: scale }],
      }}
    >
      <Button
        onPress={() => {}}
        titleStyle={{ color: colors.text }}
        buttonStyle={{
          flexDirection: "column",
          backgroundColor: colors.primary,
          height: screenWidth / 2 - 30,
          width: screenWidth / 2 - 30,
          margin: 15,
          borderRadius: (screenWidth / 2 - 30) / 2,
        }}
      >
        <Icon color={colors.text} name={icon} type="ionicon" size={40} />
        <Text style={{color:colors.text}}>{title}</Text>
      </Button>
    </Animated.View>
  );
}
