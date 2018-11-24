import React from "react";

import { Image, Text, Dimensions, TouchableOpacity, View } from "react-native";
import { CardItem, Card } from "native-base";

const { width } = Dimensions.get("window");
const blue = "#00246a";

const Genre = ({ course, goToWorkshop, index, courses }) => (
  <TouchableOpacity onPress={() => goToWorkshop(course)}>
    <Card
      style={{
        height: 220,
        borderColor: "#f0f0f0",
        borderRadius: 8,
        borderBottomWidth: 2,
        width: width * 0.45,
        // marginRight: (index + 1) % 2 !== 0 ? width * 0.08 : 0
      }}
    >
      <CardItem
        button
        onPress={() => goToWorkshop(course)}
        style={{
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8
        }}
        cardBody
      >
        <View
          style={{
            flex: 1,
            height: 100,
            width: null,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            overflow: "hidden"
          }}
        >
          <Image
            style={{
              overflow: "hidden",
              flex: 1,
              height: 100
            }}
            resizeMode={"cover"}
            defaultSource={require("../../assets/defaultimg.png")}
            source={{ uri: course.image_url ? course.image_url : "" }}
          />
        </View>
      </CardItem>
      <CardItem
        onPress={() => goToWorkshop(course)}
        style={{
          flex: 1,
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
          paddingLeft: 5,
          paddingTop: 5,
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "flex-start"
        }}
      >
        <Text
          onPress={() => goToWorkshop(course)}
          style={{ color: blue, fontSize: 15, fontFamily: "Roboto_light" }}
        >
          {course.title}
        </Text>
        <Text
          onPress={() => goToWorkshop(course)}
          style={{ color: blue, fontSize: 13, fontFamily: "AgendaBold" }}
        >
          {course.credit} credits
        </Text>
      </CardItem>
    </Card>
  </TouchableOpacity>
);

export default Genre;
