import { Camera } from "expo-camera";
import React, { useState, useEffect, useRef } from "react";
import * as ImageManipulator from "expo-image-manipulator";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const CameraScreen = () => {
  const camRef = useRef(null);
  const [permission, setPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setPermission(status === "granted");
    })();
  }, []);

  // TAKE A PÏCTURE FUNCTION ↓↓
  const takePicture = async () => {
    const data = await camRef.current.takePictureAsync(null);
    console.log("DATA : ", data);
    console.log(
      await ImageManipulator.manipulateAsync(data.uri, [
        { resize: { width: 800 } },
      ])
    );
  };

  // PERMISSIONS CONDITIONS ↓↓
  if (permission === null) {
    return <View />;
  }
  if (permission === false) {
    return <Text>Pas d'accès à l'appareil photo</Text>;
  }

  return (
    <>
      <Camera style={styles.camera} ref={camRef} />
      <TouchableOpacity onPress={() => takePicture()}>
        <View style={styles.button}>
          <Text style={styles.text}>Prendre une photo</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  button: {
    bottom: 20,
    padding: 20,
    zIndex: 10000,
    borderRadius: 20,
    alignSelf: "center",
    position: "absolute",
    backgroundColor: "#8093f1",
  },
  text: {
    fontSize: 20,
    color: "#fff",
  },
});

export default CameraScreen;
