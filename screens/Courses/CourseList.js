import React, { Component } from "react";

import {
  Header,
  Body,
  Icon,
  Left,
  Right,
  Container,
  Content,
  Button
} from "native-base";

import Toast from 'react-native-root-toast';
import { Text, View, RefreshControl ,Dimensions } from "react-native";
import { DrawerActions } from "react-navigation";
import ContentRepo from "../../services/ContentRepo";
import { CourseConnect } from "../../context/CourseProvider";

import Loading from "../Loading";
import CourseItem from "./CourseItem";
import { headerBGcolor, headerFontColor } from "../../global";

const blue = "#00246a";

const { width } = Dimensions.get("window");

class CourseList extends Component {
  constructor(props) {
    super(props);
  }

  state = { loading: false, courses: [], title: "Courses", refreshing: false };

  componentDidMount() {
    if (this.props.courses === null) {
      this.getCourses();
    } else {
      this.setState({ courses: this.props.courses });
    }
  }

  toggleRefresh = () => this.setState({ refreshing: !this.state.refreshing });
  onRefresh = () => {
    this.toggleRefresh();
    ContentRepo.getAllWorkshops()
      .then(r => {
        this.toggleRefresh();
        const { status, message, data } = r.data;
        if (status) {
          this.props.setCourses(data.items);
          this.setState({ courses: data.items, title: data.title });
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

  showToast = text => Toast.show(text, {
    duration: Toast.durations.SHORT,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0
  })

  toggleLoad = () => this.setState({ loading: !this.state.loading });

  goToCourseSchedules = course => {
    this.props.navigation.navigate("SpecificCourse", {
      id: course.id,
      from: "Courses"
    });
  };

  openDrawer = () => {
    this.props.navigation.dispatch(DrawerActions.openDrawer());
  };

  search = () => {
    this.props.navigation.navigate("SearchGenre");
  };

  getGenreCourses = genreId => {
    this.toggleLoad();
    ContentRepo.getAllWorkshopsByGenre(genreId)
      .then(r => {
        this.toggleLoad();
        const { status, message, data } = r.data;
        if (status) {
          this.setState({ courses: data.items, title: data.title });
          this.props.setCourses(data.items);
        } else {
          this.showToast(message);
          this.props.navigation.goBack();
        }
      })
      .catch(err => {
        this.toggleLoad();
        this.showToast(
          "Something went wrong. Try checking your internet connection"
        );
      });
  };

  getCourses = () => {
    this.toggleLoad();
    ContentRepo.getAllWorkshops()
      .then(r => {
        this.toggleLoad();
        const { status, message, data } = r.data;
        if (status) {
          this.props.setCourses(data.items);
          this.setState({ courses: data.items, title: data.title });
        } else {
          this.showToast(message);
          this.props.navigation.goBack();
        }
      })
      .catch(err => {
        this.toggleLoad();
        this.showToast(
          "Something went wrong. Try checking your internet connection"
        );
      });
  };

  render() {
    return (
      <Container>
        <Loading isVisible={this.state.loading} transparent={false} />
        <Header style={{ backgroundColor: headerBGcolor }}>
          <Left style={{ flex: 1 }}>
            <Button onPress={() => this.openDrawer()} transparent>
              <Icon type="MaterialIcons" style={{ color: headerFontColor }} name="menu" />
            </Button>
          </Left>
          <Body
            style={{
              flex: 2,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text
              style={{
                fontFamily: "AgendaBold",
                fontSize: 16,
                color: headerFontColor
              }}
            >
              {this.state.title}
            </Text>
          </Body>
          <Right style={{ flex: 1 }}>
            <Button onPress={() => this.search()} transparent>
              <Icon
                type="MaterialIcons"
                style={{ color: headerFontColor }}
                name="search"
              />
            </Button>
          </Right>
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
          <View
            style={{
              flex: 1,
              paddingTop: 20,
              // paddingRight: width * 0.05,
              paddingLeft: width * 0.05,
              flexWrap: "wrap",
              flexDirection: "row"
            }}
          >
            {this.state.courses.length === 0 ? (
              <Text
                style={{
                  color: blue,
                  fontFamily: "Roboto_light",
                  textAlign: "center",
                  marginTop: 20
                }}
              >
                No Course to show
              </Text>
            ) : (
              this.state.courses.map(course => (
                <CourseItem
                  key={course.id}
                  course={course}
                  goToCourseSchedules={this.goToCourseSchedules}
                />
              ))
            )}
          </View>
        </Content>
      </Container>
    );
  }
}

export default CourseConnect(["courses", "setCourses"])(CourseList);
