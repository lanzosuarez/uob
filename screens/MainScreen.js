import React, { Component, Fragment } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Platform
} from "react-native";
import Expo from "expo";
import {
  createDrawerNavigator,
  DrawerItems,
  createStackNavigator
} from "react-navigation";

import ContactScreen from "./Contact/ContactScreen";
import ProfileScreen from "./Profile/ProfileScreen";
import NotificationsScreen from "./Notifications/NotificationsScreen";
import EvaluationsScreen from "./Evaluations/EvaluationsScreen";

import Courses from "./Home/Courses";
import SpecificCourse from "./Home/SpecificCourse";
import ViewSchedule from "./Home/ViewSchedule";
import CourseList from "./Courses/CourseList";
import GenreCourses from "./Courses/GenreCourses";
import SearchGenre from "./Courses/SearchGenre";
import ChangePassword from "./Profile/ChangePassword";
import EditProfile from "./Profile/EditProfile";
import UpcomingCourses from "./Profile/UpcomingCourses";
import PastCourses from "./Profile/PastCourses";
import SignAttendance from "./Profile/SignAttendance";
import CourseBookings from "./Profile/CourseBookings";
import NotifBody from "./Notifications/NotifBody";

import { UserComsumer } from "../context/UserProvider";
import NotifBadge from "./Notifications/NotifBadge";
import ProfileCourse from "./Profile/ProfileCourse";
import CoursesCourse from "./Courses/CoursesCourse";

const blue = "#00246a";

const { width } = Dimensions.get("window");

const CustomDrawerComponent = props => (
  <SafeAreaView
    style={{
      flex: 1,
      backgroundColor: blue,
      marginTop: Expo.Constants.statusBarHeight
    }}
  >
    <View
      style={{
        justifyContent: "center",
        paddingLeft: 40,
        paddingTop: 40,
        paddingBottom: 35
      }}
    >
      <UserComsumer>
        {({ user }) => (
          <Fragment>
            <Text
              style={{
                color: "white",
                fontSize: 22,
                marginBottom: 5,
                fontFamily: "AgendaBold"
              }}
            >
              {user ? user.name : ""}
            </Text>
            <Text
              style={{
                color: "white",
                fontSize: 17,
                fontWeight: "100",
                fontFamily: "Roboto_light"
              }}
            >
              Remaining credits:{" "}
              {user ? Number(user.credits_available).toFixed(0) : 0}
            </Text>
          </Fragment>
        )}
      </UserComsumer>
    </View>
    <ScrollView>
      <DrawerItems
        activeTintColor="white"
        labelStyle={{ color: "#ffffff", marginLeft: 40 }}
        activeBackgroundColor="rgba(0, 0, 0, 0.04)"
        {...props}
      />
    </ScrollView>
  </SafeAreaView>
);

const MainDrawerNavigator = createDrawerNavigator(
  {
    Home: {
      navigationOptions: {
        drawerLabel: "Home "
      },
      screen: createStackNavigator(
        {
          HomeCourses: { screen: Courses },
          SpecificCourse: { screen: SpecificCourse },
          ViewSchedule: { screen: ViewSchedule },
          CourseList: { screen: CourseList },
          SearchGenre: { screen: SearchGenre }
        },
        {
          initialRouteName: "HomeCourses",
          headerMode: "none"
        }
      )
    },
    Courses: {
      navigationOptions: {
        drawerLabel: "Courses "
      },
      screen: createStackNavigator(
        {
          CourseList: { screen: CourseList },
          GenreCourses: { screen: GenreCourses },
          SearchGenre: { screen: SearchGenre },
          ViewSchedule: { screen: ViewSchedule },
          SpecificCourse: { screen: CoursesCourse }
        },
        {
          initialRouteName: "CourseList",
          headerMode: "none"
        }
      )
    },
    Evaluations: {
      navigationOptions: {
        drawerLabel: "Evaluations   "
      },
      screen: createStackNavigator(
        {
          Evaluations: { screen: EvaluationsScreen }
        },
        {
          initialRouteName: "Evaluations",
          headerMode: "none"
        }
      )
    },
    Notifications: {
      navigationOptions: {
        drawerLabel: NotifBadge
      },
      screen: createStackNavigator(
        {
          Notifications: { screen: NotificationsScreen },
          NotifBody: { screen: NotifBody }
        },
        {
          initialRouteName: "Notifications",
          headerMode: "none"
        }
      )
    },
    Profile: {
      navigationOptions: {
        drawerLabel: "Profile "
      },
      screen: createStackNavigator(
        {
          Profile: { screen: ProfileScreen },
          ChangePassword: { screen: ChangePassword },
          EditProfile: { screen: EditProfile },
          UpcomingCourses: { screen: UpcomingCourses },
          PastCourses: { screen: PastCourses },
          // CourseBookings: { screen: CourseBookings },
          SignAttendance: { screen: SignAttendance },
          ProfileCourse: { screen: ProfileCourse }
        },
        {
          initialRouteName: "Profile",
          headerMode: "none"
        }
      )
    },
    CourseBookings: {
      navigationOptions: {
        drawerLabel: "Supervisor Approval "
      },
      screen: CourseBookings
    },
    Contact: {
      navigationOptions: {
        drawerLabel: "Contact Us "
      },
      screen: ContactScreen
    }
  },
  {
    contentComponent: CustomDrawerComponent,
    drawerWidth: width * 0.7,
    drawerOpenRoute: "DrawerOpen",
    drawerCloseRoute: "DrawerClose",
    drawerToggleRoute: "DrawerToggle"
  }
);

export default MainDrawerNavigator;
