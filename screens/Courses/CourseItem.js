import React from "react";

import { View, TouchableOpacity, Image, Text, Dimensions } from "react-native";

import { Card, CardItem } from "native-base";

const { width } = Dimensions.get("window");

const blue = "#00246a";

const CourseItem = ({ course, goToCourseSchedules, index }) => {
  return (
    <TouchableOpacity onPress={() => goToCourseSchedules(course)}>
      <Card
        style={{
          height: 220,
          borderRadius: 8,
          borderBottomWidth: 2,
          width: width * 0.45,
         
          // marginRight: (index + 1) % 2 !== 0 ? width * 0.08 : 0
        }}
      >
        <CardItem
          button
          style={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
          onPress={() => goToCourseSchedules(course)}
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
          onPress={() => goToCourseSchedules(course)}
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
};

export default CourseItem;
