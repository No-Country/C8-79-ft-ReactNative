import { Dimensions, Animated, Text } from "react-native";
import React, { useRef, useCallback } from "react";
import { Button, Icon } from "@rneui/themed";
import { useTheme, useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;

export default function AnimatedButton({ icon, title,press }) {
  const { colors } = useTheme();
  const opacity = useRef(new Animated.Value(0)).current;
  //const size = useState(new Animated.Value(0))[0];
  const scale = useRef(new Animated.Value(0)).current;
  const navigation=useNavigation()
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
        onPress={()=> navigation.navigate("Menu",title)}
        titleStyle={{ color: colors.text }}
        buttonStyle={{
          borderWidth:4,
          borderColor:colors.primary,
          flexDirection: "column",
          backgroundColor: colors.background,
          height: screenWidth / 2 - 40,
          width: screenWidth / 2 - 40,
          margin: 20,
          borderRadius: (screenWidth / 2 - 40) / 2,
        }}
      >
        <Icon color={colors.text} name={icon} type="ionicon" size={40} />
        <Text style={{color:colors.text}}>{title}</Text>
      </Button>
    </Animated.View>
  );
}
