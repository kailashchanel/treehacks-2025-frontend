import React, { useState, useEffect } from "react";
import { Button, View, Image, Text, StyleSheet, Dimensions, SafeAreaView } from "react-native";
import { GestureHandlerRootView, GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";

import imagesApi from "../../api/images";
import useApi from "../../hooks/useApi";

import ActivityIndicator from "../../components/ActivityIndicator";
import CustomModal from "@/components/Modal";

const { width, height } = Dimensions.get("window");

const baseUrl = "http://10.32.86.217:8000"
const baseUrlTwo = "http://127.0.0.1:8000"

interface ImageResponse {
  img: string;
  starchart: string;
}

const StarfieldOverlay = () => {
  const [coordinates, setCoordinates] = useState<{ x: number; y: number } | null>(null);
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const [loading, setLoading] = useState(true);
  const [imageData, setImageData] = useState<ImageResponse>();
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchImage = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/images");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data: ImageResponse = await response.json();
      setImageData(data);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  useEffect(() => {
    fetchImage();
    setLoading(false);
  }, [])

  // const starfield_url = "https://apps.aavso.org/vsp/chart/X39846OC.png"

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
      { rotate: `${rotation.value}rad` },
    ],
  }));

  const handleTap = (event: any) => {
    const { locationX, locationY } = event.nativeEvent;
    setCoordinates({ x: locationX, y: locationY });
    setModalVisible(true);
  };

  const panGesture = Gesture.Pan()
  .onUpdate((e) => {
    translateX.value = e.translationX;
    translateY.value = e.translationY;
  })
  .onEnd(() => {
    translateX.value = withSpring(0, { damping: 5 });
    translateY.value = withSpring(0, { damping: 5 });
  });
  
  const rotateGesture = Gesture.Rotation()
  .onUpdate((event) => {
    rotation.value = event.rotation;
  })
  .onEnd(() => {
    rotation.value = withSpring(0, { damping: 5 });
  });

  const pinchGesture = Gesture.Pinch()
  .onUpdate((e) => {
    scale.value = e.scale;
  })
  .onEnd(() => {
    scale.value = withSpring(1, { damping: 5 });
  });

  return (
    <>
    <ActivityIndicator visible={loading}/>
      <SafeAreaView>
        {!loading && <GestureHandlerRootView>
          {/* Reference Starfield (Guide) */}
          <Image source={{ uri: imageData?.starchart }} style={styles.overlay} resizeMode="contain" />
          
          {/* Interactive Telescope Image */}
          <GestureDetector gesture={Gesture.Race(panGesture, rotateGesture, pinchGesture)}>
            <Animated.View style={[styles.imageContainer, animatedStyle]}>
              <Image
                source={{ uri: encodeURI(`${baseUrlTwo}${imageData?.img}`) }}
                style={styles.image}
                resizeMode="contain"
                onStartShouldSetResponder={() => true}
                onResponderRelease={handleTap}
              />
              {coordinates && (
                <View style={[styles.coordinates, { top: coordinates.y, left: coordinates.x }]}> 
                  <Text style={styles.text}>x: {coordinates.x.toFixed(2)}</Text>
                  <Text style={styles.text}>y: {coordinates.y.toFixed(2)}</Text>
                </View>
              )}
            </Animated.View>
          </GestureDetector>
        </GestureHandlerRootView>}
      </SafeAreaView>
      <CustomModal visible={modalVisible} onClose={() => {setModalVisible(false);setLoading(true);fetchImage();setLoading(false);}} title="You clicked!">
        <View style={{ alignItems: "center" }}>
          <Text>Your selected coordinates are:</Text>
          <Text>({parseFloat((coordinates?.x)?.toFixed(2))}, {parseFloat((coordinates?.y)?.toFixed(2))})</Text>
        </View>
      </CustomModal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    // position: "absolute",
    width: width,
    height: height/2,
    // flex: 1,
    // opacity: 0.5,
  },
  imageContainer: {
    // flex: 1,
    width: width,
    height: height/2,
    // backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 150
  },
  image: {
    width: "100%",
    height: "100%",
    opacity: 0.7
  },
  coordinates: {
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 5,
    borderRadius: 5,
  },
  text: {
    color: "white",
    fontSize: 14,
  },
});

export default StarfieldOverlay;
