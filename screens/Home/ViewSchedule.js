import React, { Component, Fragment } from "react";

import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  Content
} from "native-base";

import { Text, View, RefreshControl, Dimensions } from "react-native";

import ContentRepo from "../../services/ContentRepo";
import Loading from "../Loading";
import ConfirmDialog from "../ConfirmDialog";
import Schedule from "./Schedule";
import { UserConnect } from "../../context/UserProvider";
import Toast from "react-native-root-toast";
import { headerBGcolor, headerFontColor } from "../../global";
import UserResource from "../../services/UserResource";

const blue = "#00246a";

const { height } = Dimensions.get("window");

class ViewSchedule extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    loading: false,
    schedules: [],
    showConfirm: false,
    selectedSchedule: null,
    refreshing: false
  };

  componentDidMount() {
    this.getSchedules();
  }

  toggleLoad = () => this.setState({ loading: !this.state.loading });
  toggleConfirm = () => this.setState({ showConfirm: !this.state.showConfirm });

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
    const { navigation } = this.props;
    const workshopId = navigation.getParam("id", "1"),
      key = navigation.getParam("keyword", "");

    this.toggleRefresh();
    ContentRepo.getWorkShopSchedules({ event_id: workshopId, key })
      .then(r => {
        this.toggleRefresh();
        const { status, message, data } = r.data;
        if (status) {
          this.setState({ schedules: data });
        } else {
          this.showToast(message);
        }
      })
      .catch(err => {
        this.toggleRefresh();
        this.showToast("Something went wrong");
      });
  };

  getSchedules = () => {
    const { navigation } = this.props;
    const workshopId = navigation.getParam("id", "1"),
      key = navigation.getParam("keyword", "");

    console.log(workshopId, key);
    this.toggleLoad();
    ContentRepo.getWorkShopSchedules({ event_id: workshopId, key })
      .then(r => {
        this.toggleLoad();
        const { status, message, data } = r.data;
        if (status) {
          this.setState({ schedules: data });
        } else {
          this.showToast(message);
          this.props.navigation.goBack();
        }
      })
      .catch(err => {
        console.log(err);
        this.toggleLoad();
        this.showToast("Something went wrong");
        this.props.navigation.goBack();
      });
  };

  bookNow = () => {
    const { event_batch_id, credit_group_number } = this.state.selectedSchedule;
    let payload = credit_group_number
      ? { event_batch_id, credit_group_number }
      : { event_batch_id };
    this.toggleConfirm();
    this.fireBookRq(payload).then(r => {
      if (r) {
        const user = { ...this.props.user },
          creditToSubtract = this.props.navigation.getParam("credit", 0);
        user.credits_available = user.credits_available - creditToSubtract;
        this.props.setUser(user);
        UserResource.setUser(user);
      }
    });
  };

  fireBookRq = payload => {
    this.toggleLoad();
    return ContentRepo.bookWorkshop(payload)
      .then(r => {
        this.toggleLoad();
        const { status, message } = r.data;
        if (status) {
          console.log(this.state.selectedSchedule);
          this.props.navigation.replace("SpecificCourse", {
            id: this.state.selectedSchedule.event_id
          });
          return true;
        } else {
          this.showToast(message);
          return false;
        }
      })
      .catch(err => {
        console.log(err);
        this.toggleLoad();
        this.showToast("Something went wrong");
      });
  };

  selectSchedule = selectedSchedule => {
    this.setState({ selectedSchedule });
    this.toggleConfirm();
  };

  cancel = () => {
    this.setState({ selectedSchedule: null });
    this.toggleConfirm();
  };

  render() {
    const { schedules, loading, showConfirm } = this.state;
    return (
      <Container>
        {this.state.loading ? (
          <Loading isVisible={loading} transparent={false} />
        ) : (
          <Fragment>
            <ConfirmDialog
              height={height * 0.4}
              isVisible={showConfirm}
              okText="Confirm"
              heading="Booking Confirmation"
              message="By proceeding, you acknowledge that you have sought for your supervisor's approval to attend this workshop. Your supervisor will be notified with regards to your booking."
              onCancel={this.cancel}
              onOk={this.bookNow}
            />
            <Header style={{ backgroundColor: headerBGcolor }}>
              <Left style={{ flex: 1 }}>
                <Button
                  onPress={() => this.props.navigation.goBack()}
                  transparent
                >
                  <Icon
                    type="MaterialIcons"
                    style={{ color: headerFontColor }}
                    name="chevron-left"
                  />
                  <Text
                    style={{
                      color: headerFontColor,
                      fontFamily: "Roboto_light"
                    }}
                  >
                    Back
                  </Text>
                </Button>
              </Left>
              <Body
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Title
                  style={{
                    fontFamily: "AgendaBold",
                    fontSize: 16,
                    color: headerFontColor
                  }}
                >
                  Select Class
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
              contentContainerStyle={{ backgroundColor: "white" }}
            >
              <View style={{ flex: 1, padding: 30, backgroundColor: "white" }}>
                {schedules.map(sched => (
                  <Schedule
                    key={sched.event_batch_id}
                    selectSchedule={this.selectSchedule}
                    sched={sched}
                  />
                ))}
              </View>
            </Content>
          </Fragment>
        )}
      </Container>
    );
  }
}

export default UserConnect(["user", "setUser"])(ViewSchedule);
