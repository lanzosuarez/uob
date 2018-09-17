import React, { Component } from "react";
import { Image, Dimensions, Text, View, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";

import Carousel from "react-native-snap-carousel";

import { Card, CardItem } from "native-base";

const { width } = Dimensions.get("window");

const blue = "#00246a";

class Course extends Component {
  constructor(props) {
    super(props);
  }

  navigateToSpecifiCourse = id =>
    this.props.navigation.navigate("SpecificCourse", {
      id,
      from: "Home"
    });

  navigateToGenreCourseList = genreId =>
    this.props.navigation.navigate("GenreCourses", {
      id: genreId,
      from: "Home"
    });

  renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => this.navigateToSpecifiCourse(item.id)}>
      <Card
        style={{
          borderColor: "#f0f0f0",
          borderRadius: 8,
          borderBottomWidth: 2
        }}
      >
        <CardItem
          button
          onPress={() => this.navigateToSpecifiCourse(item.id)}
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
              source={{ uri: item.image_url }}
            />
          </View>
        </CardItem>
        <CardItem
          onPress={() => this.navigateToSpecifiCourse(item.id)}
          style={{
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
            paddingLeft: 5,
            paddingTop: 5
          }}
        >
          <Text
            onPress={() => this.navigateToSpecifiCourse(item.id)}
            style={{ color: blue, fontSize: 15, fontFamily: "Roboto_light" }}
          >
            {item.title.length > 22
              ? `${item.title.slice(0, 22)}...`
              : item.title}
          </Text>
        </CardItem>
      </Card>
    </TouchableOpacity>
  );

  render() {
    const { genre } = this.props;
    return (
      <View style={{ height: 180, marginBottom: 15, paddingBottom: 10 }}>
        <View
          style={{
            paddingLeft: 15,
            paddingRight: 15,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end"
          }}
        >
          <Text
            style={{ fontSize: 18, color: blue, fontFamily: "Roboto_light" }}
          >
            {genre.title}
          </Text>
          <TouchableOpacity
            onPress={() => this.navigateToGenreCourseList(genre.id)}
          >
            <Text
              style={{
                color: blue,
                textDecorationLine: "underline",
                fontSize: 15,
                fontWeight: "100",
                fontFamily: "Roboto_light"
              }}
            >
              See all
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, paddingLeft: 15 }}>
          <Carousel
            style={{ marginBottom: 10 }}
            activeSlideAlignment="start"
            layoutCardOffset={4}
            data={genre.items}
            renderItem={this.renderItem}
            sliderWidth={width}
            itemWidth={200}
            inactiveSlideOpacity={1}
            inactiveSlideScale={1}
          />
        </View>
      </View>
    );
  }
}

export default withNavigation(Course);
