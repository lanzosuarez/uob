import React, { Component, Fragment } from "react";
import { Text, RefreshControl } from "react-native";
import Toast from "react-native-root-toast";
import { DrawerActions } from "react-navigation";
import { WorkshopConnect } from "../../context/WorkshopProvider";
import {
  Icon,
  Container,
  Content,
  Header,
  Right,
  Left,
  Body,
  Button
} from "native-base";

import axios from "axios";
import ContentRepo from "../../services/ContentRepo";
import Loading from "../Loading";

import BannerCarousel from "./BannerCarousel";
import CourseItems from "./CourseItems";
import MessageDialog from "../MessageDialog";
import { UserConnect } from "../../context/UserProvider";
import UserResource from "../../services/UserResource";
import Profile from "../../services/Profile";
import { headerBGcolor } from "../../global";
import Notification from "../../services/Notification";
import { NotificationConnect } from "../../context/NotificationProvider";

const { CancelToken } = axios;

export class Courses extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    activeSlide: 0,
    loading: false,
    refreshing: false,
    error: false,
    showAuthMessage: false,
    getNotificationsInterval: null
  };

  cancelToken = CancelToken.source();

  showAuthMsg = async () => {
    this.setState({ showAuthMessage: true });
  };

  componentDidMount() {
    this.fireGetWorkshop();
    this.getNotifications();
    window.setInterval(async () => {
      const deviceUser = await UserResource.getUser();
      if (deviceUser) {
        Profile.getProfile().then(res => {
          if (res.data.data) {
            deviceUser.credits_available = res.data.data.credits_available;
            this.props.setUser(deviceUser);
          }
        });
      }
    }, 2000);

    const getNotificationsInterval = window.setInterval(async () => {
      this.getNotifications();
    }, 10000);

    this.setState({ getNotificationsInterval });
  }

  componentWillUnmount() {
    this.cancelToken.cancel();
    window.clearInterval(this.state.getNotificationsInterval);
  }

  showToast = text =>
    Toast.show(text, {
      duration: Toast.durations.SHORT,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0
    });

  toggleLoad = () => this.setState({ loading: !this.state.loading });
  toggleError = () => this.setState({ error: !this.state.error });
  changeActiveItem = index => this.setState({ activeSlide: index });

  fireGetWorkshop = () => {
    this.getWorkshopsRq();
  };

  navigateToSpecifiCourse = id =>
    this.props.navigation.navigate("SpecificCourse", {
      id,
      from: "Home"
    });

  getWorkshopsRq = () => {
    if (this.props.banners === null) {
      this.toggleLoad();
      ContentRepo.getContents()
        .then(r => {
          this.toggleLoad();
          if (r.data) {
            const { data } = r.data;

            if (!this.props.user.is_authorize) {
              this.showAuthMsg();
            }
            this.props.setBanners(data.banners);
            this.props.setGenres(data.genres);
          }
        })
        .catch(err => {
          console.log(err);
          if (err.response) {
            this.toggleLoad();
            this.showToast(
              "Something went wrong. Try checking your internet connection"
            );
          }
        });
    }
  };

  getNotifications = () => {
    Notification.getNotifications()
      .then(r => {
        // this.toggleLoad();
        const { status, message, data } = r.data;
        if (status) {
          this.props.setNotifications(data);
          this.setState({ notifications: data });
        } else {
          // this.showToast(message);
          // this.props.navigation.goBack();
        }
      })
      .catch(err => {
        // this.toggleLoad();
        // this.showToast(
        //   "Something went wrong. Try checking your internet connection"
        // );
      });
  };

  openDrawer = () => {
    this.props.navigation.dispatch(DrawerActions.openDrawer());
  };

  authorizeApp = async () => {
    const user = await UserResource.getUser();
    user.is_authorize = true;
    await UserResource.setUser(user);
    this.setState({ showAuthMessage: false });
    Profile.updateProfile({ is_authorize: true }, user.id).then(res => {
      console.log(res.data);
    });
  };

  onRefresh = () => {
    this.setState({ refreshing: true });
    ContentRepo.getContents()
      .then(r => {
        this.setState({ refreshing: false });
        const { data } = r.data;
        this.props.setBanners(data.banners);
        this.props.setGenres(data.genres);
      })
      .catch(err => {
        this.setState({ refreshing: false });
        this.showToast(
          "Something went wrong. Try checking your internet connection"
        );
      });
  };

  openDrawer = () => {
    this.props.navigation.dispatch(DrawerActions.openDrawer());
  };

  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: headerBGcolor }}>
          <Left style={{ flex: 1 }}>
            <Button onPress={() => this.openDrawer()} transparent>
              <Icon
                type="MaterialIcons"
                style={{ color: "white" }}
                name="menu"
              />
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
                color: "white"
              }}
            >
              Home
            </Text>
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
          contentContainerStyle={{
            backgroundColor: "white"
          }}
        >
          <MessageDialog
            onOk={this.authorizeApp}
            isVisible={this.state.showAuthMessage}
            okText="I agree"
            heading="Authorisation"
            message="I understand and agree that my personal data may be shared to third party partners for course registration purposes"
          />
          {this.state.loading ? (
            <Loading
              isVisible={true}
              transparent={false}
              tip="Fetching Courses"
            />
          ) : (
            <Fragment>
              <BannerCarousel
                genres={this.props.genres}
                banners={this.props.banners}
                navigateToSpecifiCourse={this.navigateToSpecifiCourse}
                changeActiveItem={this.changeActiveItem}
                activeSlide={this.state.activeSlide}
              />
              <CourseItems genres={this.props.genres} />
            </Fragment>
          )}
        </Content>
      </Container>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    paddingBottom: 20
  },
  imgBg: {
    flex: 1,
    resizeMode: "cover",
    position: "absolute",
    width: "100%",
    height: "100%"
  }
};

export default UserConnect(["user", "setUser"])(
  NotificationConnect(["setNotifications", "notifications"])(
    WorkshopConnect(["banners", "genres", "setBanners", "setGenres"])(Courses)
  )
);
