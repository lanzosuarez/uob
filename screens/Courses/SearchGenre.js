import React, { Component } from "react";

import {
  Header,
  Body,
  Icon,
  Right,
  Container,
  Content,
  Button,
  Item,
  Input
} from "native-base";

import { Text, View,Dimensions } from "react-native";
import { DrawerActions } from "react-navigation";
import { CourseComsumer } from "../../context/CourseProvider";
import Toast from 'react-native-root-toast';
const { width } = Dimensions.get("window");
import { headerBGcolor, headerFontColor } from "../../global";


import Genre from "./Genre";

const blue = "#00246a";

class SearchGenre extends Component {
  constructor(props) {
    super(props);
  }

  state = { searchTitle: "", loading: false };

  showToast = text => Toast.show(text, {
    duration: Toast.durations.SHORT,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0
  })

  changeSearchTitle = searchTitle => this.setState({ searchTitle });

  openDrawer = () => {
    this.props.navigation.dispatch(DrawerActions.openDrawer());
  };

  toggleLoad = () => this.setState({ loading: !this.state.loading });

  back = () => this.props.navigation.goBack();

  goToWorkshop = course =>
    this.props.navigation.navigate("SpecificCourse", {
      id: course.id,
      from: "SearchGenre"
    });

  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: headerBGcolor }}>
          <Body
            style={{
              flex: 4,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Item
              style={{ borderColor: headerFontColor, height: 35, borderRadius: 8 }}
              rounded
            >
              <Icon 
                style={{ color: headerFontColor }}
                type="MaterialIcons" active name="search" />
              <Input
                onChangeText={e => this.changeSearchTitle(e)}
                style={{ fontFamily: "Roboto_light", color: headerFontColor }}
              />
            </Item>
          </Body>
          <Right style={{ flex: 1 }}>
            <Button onPress={() => this.back()} transparent>
              <Text style={{ color: headerFontColor, fontFamily: "Roboto_light" }}>
                Cancel
              </Text>
            </Button>
          </Right>
        </Header>
        <Content contentContainerStyle={{ backgroundColor: "white" }}>
          <View  style={{ 
              flex: 1,
              paddingTop: 20,
              // paddingRight: width * 0.05,
              paddingLeft: width * 0.05,
              flexWrap: "wrap",
              flexDirection: "row" }}>
            <CourseComsumer>
              {({ courses }) => {
                const searechedCourses = courses.filter(
                  course => course.title.indexOf(this.state.searchTitle) > -1
                );
                if (searechedCourses.length > 0) {
                  return searechedCourses.map(course => (
                    <Genre
                      key={course.id}
                      course={course}
                      goToWorkshop={this.goToWorkshop}
                    />
                  ));
                } else {
                  return (
                    <Text
                      style={{
                        color: blue,
                        fontFamily: "Roboto_light",
                        textAlign: "center",
                        marginTop: 20
                      }}
                    >
                      No search result
                    </Text>
                  );
                }
              }}
            </CourseComsumer>
          </View>
          {/* <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            {this.state.courses.length === 0 ? (
              <Text style={{ color: blue }}>No Course to show</Text>
            ) : (
              this.state.courses.map(course => (
                <CourseItem
                  key={course.id}
                  course={course}
                  goToCourseSchedules={this.goToCourseSchedules}
                />
              ))
            )}
          </View> */}
        </Content>
      </Container>
    );
  }
}

export default SearchGenre;
