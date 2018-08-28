import React from "react";

import { Image, Text, Dimensions } from "react-native";
import {CardItem, Card} from "native-base";

const { width } = Dimensions.get("window");
const blue = "#00246a";

const Genre = ({ course, goToWorkshop }) => (
  <Card
      style={{
        borderColor: "#f0f0f0",
        borderRadius: 8,
        borderBottomWidth: 2,
        width: width * 0.4,
        marginRight: width * 0.05
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
        <Image
          defaultSource={ require("../../assets/defaultimg.png" )}
          source={{ uri: course.image_url }}
          style={{
            flex: 1,
            height: 100,
            width: null,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8
          }}
        />
      </CardItem>
      <CardItem
        style={{
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
          paddingLeft: 5,
          paddingTop: 5,
          flexDirection:"column",
          alignItems: "flex-start"
        }}
      >
        <Text
          style={{ color: blue, fontSize: 15, fontFamily: "Roboto_light" }}
        >
         {course.title.length > 25 ? `${course.title.slice(0, 25)}...` : course.title}
        </Text>
        <Text
           style={{ color: blue, fontSize: 13, fontFamily: "Roboto_light" }}
          >{course.credit} credits</Text>
      </CardItem>
    </Card>
);

export default Genre;
