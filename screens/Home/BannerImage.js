import React from "react";

import { View, Image } from "react-native";

const BannerImage = ({ image_url }) => (
  <View style={{ height: 250 }}>
    <View
      style={{
        zIndex: 2,
        flex: 1,
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.4)"
      }}
    />
    <Image
      defaultSource={require("../../assets/defaultimg.png")}
      style={styles.imgBg}
      source={{ uri: image_url ? image_url : "" }}
    />
  </View>
);

const styles = {
  imgBg: {
    flex: 1,
    resizeMode: "cover",
    position: "absolute",
    width: "100%",
    height: "100%"
  }
};

export default BannerImage;
