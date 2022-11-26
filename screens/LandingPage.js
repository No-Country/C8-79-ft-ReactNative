import {
    Dimensions,
    FlatList,
    Image,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from "react-native";
  import React, { useRef, useState } from "react";
  import { slider } from "../helpers/dataCarrousel";
  import Slide from "../components/Slide";
  import { Icon } from "@rneui/base";
  
  const LandingPage = ({navigation}) => {
    const { width, height } = Dimensions.get("window");
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const ref = useRef(null);
  
    const Footer = () => {
      return (
        <View
          style={{
            height: height * 0.25,
            justifyContent: "space-between",
            paddingHorizontal: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 20,
            }}
          >
            {slider.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicador,
                  currentSlideIndex == index && {
                    backgroundColor: "#ffff",
                    width: 25,
                  },
                ]}
              />
            ))}
          </View>
          <View style={{ marginBottom: 20 }}>
            {currentSlideIndex == Slide.length + 1 ? (
              <View style={{ height: 50 }}>
                <TouchableOpacity
                onPress={()=>navigation.navigate("Login")}
                  style={[
                    styles.btn,
                    { width: width * 0.75, alignSelf: "center" },
                  ]}
                >
                  <Text
                    style={{
                      color: "#ffff",
                      fontSize: 20,
                      fontWeight: "bold",
                    }}
                  >
                    GET STARTED
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity onPress={skipSlide} style={styles.btn}>
                  <Text
                    style={{ color: "#ffff", fontSize: 20, fontWeight: "bold" }}
                  >
                    SKIP
                  </Text>
                </TouchableOpacity>
                <View style={{ width: 15 }} />
                <TouchableOpacity onPress={goNextSlide} style={styles.btn}>
                  <Icon
                    size={40}
                    color={"#ffff"}
                    name="arrow-forward-sharp"
                    type="ionicon"
                  ></Icon>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      );
    };
    const updateCurrentSliderIndex = (e) => {
      const contentOffsetX = e.nativeEvent.contentOffset.x;
      const currentIndex = Math.round(contentOffsetX / width);
      setCurrentSlideIndex(currentIndex);
    };
  
    const goNextSlide = () => {
      const nextSlideIndex = currentSlideIndex + 1;
      if (nextSlideIndex != slider.length) {
        const offset = nextSlideIndex * width;
        ref?.current?.scrollToOffset({ offset });
        setCurrentSlideIndex(nextSlideIndex);
      }
    };
  
    const skipSlide = () => {
      const lastSlideIndex = Slide.length + 1;
      const offset = lastSlideIndex * width;
      ref?.current?.scrollToOffset({ offset });
      setCurrentSlideIndex(lastSlideIndex);
    };
  
    const RedirigirAlLogin = () => {
      /* Nosecomo */
    }
    return (
      <View style={{ flex: 1, backgroundColor: "#9b9c9e" }}>
        <FlatList
          ref={ref}
          data={slider}
          onMomentumScrollEnd={updateCurrentSliderIndex}
          contentContainerStyle={{ height: height * 0.75 }}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <Slide items={item} />}
        />
        <Footer />
      </View>
    );
  };
  
  export default LandingPage;
  
  const styles = StyleSheet.create({
    indicador: {
      height: 2.5,
      width: 10,
      backgroundColor: "grey",
      marginHorizontal: 3,
      borderRadius: 2,
    },
    btn: {
      flex: 1,
      height: 50,
      width: 50,
      borderRadius: 60,
      backgroundColor: "transparent",
      borderColor: "#ffff",
      borderWidth: 2,
      alignItems: "center",
      justifyContent: "center",
    },
  });
  