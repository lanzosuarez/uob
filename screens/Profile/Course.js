import React from "react";

import { Image, Text, Dimensions, TouchableOpacity, View } from "react-native";
import { withNavigation } from "react-navigation";
import { Card, CardItem } from "native-base";

const { width } = Dimensions.get("window");

const blue = "#00246a";

const Course = ({ course, goToCourseSchedules }) => (
  <TouchableOpacity onPress={() => goToCourseSchedules(course)}>
    <Card
      style={{
        height: 170,
        borderColor: "#f0f0f0",
        borderRadius: 8,
        borderBottomWidth: 2,
        width: width * 0.4,
        marginRight: width * 0.05
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
            source={{ uri: course.image }}
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
          alignItems: "flex-start"
        }}
      >
        <Text
          onPress={() => goToCourseSchedules(course)}
          style={{ color: blue, fontSize: 15, fontFamily: "Roboto_light" }}
        >
          {course.title.length > 16
            ? `${course.title.slice(0, 16)}...`
            : course.title}
        </Text>
        <Text
          onPress={() => goToCourseSchedules(course)}
          style={{ color: blue, fontSize: 13, fontFamily: "Roboto_light" }}
        >
          {course.credit} credits
        </Text>
      </CardItem>
    </Card>
  </TouchableOpacity>
);

export default withNavigation(Course);
