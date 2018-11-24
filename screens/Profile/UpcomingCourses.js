import React, { Component } from "react";

import {
  Header,
  Title,
  Body,
  Icon,
  Left,
  Right,
  Container,
  Button,
  Content
} from "native-base";

import {
  Text,
  View,
  RefreshControl,
  Dimensions,
  ScrollView
} from "react-native";

const { width } = Dimensions.get("window");

import { headerBGcolor, headerFontColor } from "../../global";
import Course from "./Course";

import { ProfileConnect } from "../../context/ProfileProvider";
import Toast from "react-native-root-toast";

import Profile from "../../services/Profile";
import Loading from "../Loading";

const blue = "#00246a";

class UpcomingCourses extends Component {
  constructor(props) {
    super(props);
  }

  state = { loading: false, refreshing: false };

  componentDidMount() {
    // if (this.props.upcomingCourses === null) {
    this.getCourses();
    // }
  }

  toggleLoad = () => this.setState({ loading: !this.state.loading });

  showToast = text =>
    Toast.show(text, {
      duration: Toast.durations.SHORT,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0
    });

  toggleRefresh = () => this.setState({ refreshing: !this.state.refreshing });
  onRefresh = () => {
    this.toggleRefresh();
    Profile.getCourses("upcoming")
      .then(r => {
        this.toggleRefresh();
        const { status, message, data } = r.data;
        if (status) {
          this.props.setUpcomingCourses(data);
        } else {
          this.showToast(message);
        }
      })
      .catch(err => {
        this.toggleRefresh();
        this.showToast(
          "Something went wrong. Try checking your internet connection"
        );
      });
  };

  goToCourseSchedules = course => {
    console.log(course.id);
    this.props.navigation.navigate("SpecificCourse", {
      id: course.id,
      from: "UpcomingCourses"
    });
  };

  getCourses = () => {
    this.toggleLoad();
    Profile.getCourses("upcoming")
      .then(r => {
        this.toggleLoad();
        const { status, message, data } = r.data;
        console.log(data);
        if (status) {
          this.props.setUpcomingCourses(data);
        } else {
          this.props.navigation.goBack();
          this.showToast(message);
        }
      })
      .catch(err => {
        this.toggleLoad();
        this.props.navigation.goBack();
        this.showToast(
          "Something went wrong. Try checking your internet connection"
        );
      });
  };

  render() {
    const courses = this.props.upcomingCourses || [];
    return (
      <Container>
        <Loading isVisible={this.state.loading} transparent={false} />
        <Header style={{ backgroundColor: headerBGcolor }}>
          <Left style={{ flex: 1 }}>
            <Button onPress={() => this.props.navigation.goBack()} transparent>
              <Icon
                type="MaterialIcons"
                style={{ color: headerFontColor }}
                name="chevron-left"
              />
              <Text
                style={{
                  color: headerFontColor,
                  fontFamily: "Roboto_light",
                  fontSize: 17
                }}
              >
                Back
              </Text>
            </Button>
          </Left>
          <Body
            style={{
              flex: 5,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Title
              style={{
                fontSize: 14,
                color: headerFontColor,
                fontFamily: "AgendaBold"
              }}
            >
              Upcoming Courses
            </Title>
          </Body>
          <Right style={{ flex: 1 }} />
        </Header>
        <Content
          refreshControl={
            <RefreshControl
              tintColor="#00246a"
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
        >
          <ScrollView
            style={{
              display: "flex",
              flex: 1,
              paddingTop: 20
              // paddingRight: width * 0.05,
            }}
          >
            {courses.length === 0 ? (
              <Text
                style={{
                  fontSize: 15,
                  color: blue,
                  fontFamily: "Roboto_light",
                  textAlign: "center",
                  marginTop: 20
                }}
              >
                You have no upcoming courses
              </Text>
            ) : (
              <View
                style={{
                  paddingLeft: width * 0.04,
                  flex: 1,
                  paddingTop: 15,
                  display: "flex",
                  flexWrap: "wrap",
                  flexDirection: "row"
                }}
              >
                {courses.map(c => (
                  <Course
                    courses={courses}
                    key={c.id}
                    course={c}
                    goToCourseSchedules={this.goToCourseSchedules}
                  />
                ))}
              </View>
            )}
          </ScrollView>
        </Content>
      </Container>
    );
  }
}

const styles = {
  f: {
    flex: 1
  },
  bold: {
    fontFamily: "AgendaBold"
  },
  medium: {
    fontFamily: "Roboto_light"
  },
  light: {
    fontFamily: "Roboto_light"
  },
  txt: {
    color: blue,
    fontSize: 14
  }
};

export default ProfileConnect(["upcomingCourses", "setUpcomingCourses"])(
  UpcomingCourses
);
