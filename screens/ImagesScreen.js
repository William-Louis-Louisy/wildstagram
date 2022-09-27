import * as FileSystem from "expo-file-system";
import React, { useEffect, useState } from "react";
import singleFileUploader from "single-file-uploader";
import Constants from "expo-constants";
import {
  ScrollView,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Button,
} from "react-native";

const ImagesScreen = () => {
  const [pictures, setPictures] = useState([]);

  useEffect(() => {
    (async () => {
      const images = await FileSystem.readDirectoryAsync(
        FileSystem.cacheDirectory + "ImageManipulator"
      );
      setPictures(images);
    })();
  }, []);

  console.log("EHEHEHE : ", Constants.manifest.extra.token);
  return (
    <ScrollView>
      <Text>ImagesScreen</Text>
      {pictures.length > 0 && (
        <FlatList
          data={pictures}
          keyExtractor={(pictures) => pictures}
          renderItem={(itemData) => {
            return (
              <>
                <Image
                  style={styles.image}
                  source={{
                    uri:
                      FileSystem.cacheDirectory +
                      "ImageManipulator/" +
                      itemData.item,
                  }}
                />
                <Button
                  title="upload"
                  onPress={async () => {
                    try {
                      await singleFileUploader({
                        distantUrl:
                          "https://wildstagram.nausicaa.wilders.dev/upload",
                        expectedStatusCode: 201,
                        filename: itemData.item,
                        filetype: "image/jpeg",
                        formDataName: "fileData",
                        localUri:
                          FileSystem.cacheDirectory +
                          "ImageManipulator/" +
                          itemData.item,
                        token: Constants.manifest.extra.token,
                      });
                      alert("Uploaded");
                    } catch (err) {
                      alert("Error");
                    }
                  }}
                />
              </>
            );
          }}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    height: 500,
    marginTop: 12,
  },
});

export default ImagesScreen;
