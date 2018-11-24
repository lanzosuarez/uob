import React from "react";

import { Image, Text, Dimensions, TouchableOpacity, View } from "react-native";
import { withNavigation } from "react-navigation";
import { Card, CardItem } from "native-base";

const { width } = Dimensions.get("window");

const blue = "#00246a";

const Course = ({ course, goToCourseSchedules,courses }) => (
  <TouchableOpacity onPress={() => goToCourseSchedules(course)}>
    <Card
      style={{
        height: 220,
        borderColor: "#f0f0f0",
        borderRadius: 8,
        borderBottomWidth: 2,
        width: width * 0.45,
        alignSelf: "flex-start"
        // marginRight: width * 0.05
      }}
    >
      <CardItem
        button
        onPress={() => goToCourseSchedules(course)}
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
            source={{ uri: course.image_url }}
          />
        </View>
      </CardItem>
      <CardItem
        onPress={() => goToCourseSchedules(course)}
        style={{
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
          paddingLeft: 5,
          paddingTop: 5,
          flexDirection: "column",
          alignItems: "flex-start",
          flex: 1,
          justifyContent: "space-between"
        }}
      >
        <Text
          onPress={() => goToCourseSchedules(course)}
          style={{ color: blue, fontSize: 15, fontFamily: "Roboto_light" }}
        >
          {course.title}
        </Text>
        <Text
          onPress={() => goToCourseSchedules(course)}
          style={{ color: blue, fontSize: 13, fontFamily: "AgendaBold" }}
        >
          {course.credit} credits
        </Text>
      </CardItem>
    </Card>
  </TouchableOpacity>
);

export default withNavigation(Course);
