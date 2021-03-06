import React, { Component } from "react";
import ExpoPixi from "expo-pixi";
import {
  Header,
  Title,
  Body,
  Icon,
  Left,
  Right,
  Container,
  Button
} from "native-base";

import {
  Text,
  View,
  Dimensions,
  ImageStore,
  ImageEditor,
  Image
} from "react-native";

import Profile from "../../services/Profile";
import Loading from "../Loading";
import Toast from "react-native-root-toast";
import { headerBGcolor, headerFontColor } from "../../global";

const blue = "#00246a";

const { height } = Dimensions.get("window");

class SignAttendance extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    loading: false,
    workshop: true,
    imagePath: "",
    event: null,
    refreshing: false
  };

  componentDidMount() {
    this.getEventBatch();
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
    Profile.getLastEventBatch()
      .then(r => {
        this.toggleRefresh();
        const { status, message, data } = r.data;
        if (status) {
          this.setState({ event: data });
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

  getEventBatch = () => {
    this.toggleLoad();
    Profile.getLastEventBatch()
      .then(r => {
        this.toggleLoad();
        const { status, message, data } = r.data;
        console.log("get event batch");
        console.log(data, status);
        if (status) {
          this.setState({ event: data });
        } else {
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

  signRq = signature => {
    const {
      id: user_event_id,
      event_id,
      event_batch_id,
      class_schedule_id
    } = this.state.event;
    const payload = {
      user_event_id,
      event_batch_id,
      event_id,
      class_schedule_id,
      signature
    };

    console.log(payload);
    this.signAttendance(payload);
  };

  sign = () => {
    const imageURL = this.state.imagePath;
    Image.getSize(
      imageURL,
      (width, height) => {
        let imageSize = {
          size: {
            width,
            height
          },
          offset: {
            x: 0,
            y: 0
          }
        };
        ImageEditor.cropImage(
          imageURL,
          imageSize,
          imageURI => {
            ImageStore.getBase64ForTag(
              imageURI,
              base64Data => {
                this.signRq(base64Data);
                ImageStore.removeImageForTag(base64Data);
              },
              reason => console.warn(reason)
            );
          },
          reason => console.warn(reason)
        );
      },
      reason => console.warn(reason)
    );
  };

  signAttendance = payload => {
    this.toggleLoad();
    Profile.signAttendance(payload)
      .then(r => {
        const { status, message, data } = r.data;
        this.toggleLoad();
        if (status) {
          this.setState({ event: null });
          // this.getEventBatch();
        } else {
          this.showToast(message);
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
    const event = this.state.event;
    const color = 0x000000;
    const width = 10;
    const alpha = 0;
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
              flex: 2,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Title
              style={{
                fontSize: 16,
                color: headerFontColor,
                fontFamily: "AgendaBold"
              }}
            >
              Sign Attendance
            </Title>
          </Body>
          <Right style={{ flex: 1 }} />
        </Header>
        <View style={{ flex: 1 }}>
          {event ? (
            <View
              stlye={{
                flex: 1,
                alignItems: "center"
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 30,
                  marginBottom: 30
                }}
              >
                <Text
                  style={{
                    fontFamily: "Roboto_light",
                    fontSize: 17,
                    color: blue
                  }}
                >
                  Sign digitally to confirm your attendance for:
                </Text>
              </View>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 30
                }}
              >
                <Text
                  style={{
                    fontFamily: "AgendaBold",
                    fontSize: 17,
                    color: blue,
                    marginBottom: 5,
                    textAlign: "center"
                  }}
                >
                  {event ? event.event_name : ""}
                </Text>
                <Text
                  style={{
                    fontFamily: "Roboto_light",
                    fontSize: 17,
                    color: blue,
                    textAlign: "center"
                  }}
                >
                  {event ? event.schedule : ""}
                </Text>
              </View>
              <ExpoPixi.Sketch
                height={height * 0.4}
                strokeColor={color}
                strokeWidth={width}
                strokeAlpha={alpha}
                ref={ref => (this.sketch = ref)}
                onChange={async ({ width, height }) => {
                  const options = {
                    format: "png", /// PNG because the view has a clear background
                    quality: 0.1, /// Low quality works because it's just a line
                    result: "file",
                    height,
                    width
                  };
                  /// Using 'Expo.takeSnapShotAsync', and our view 'this.sketch' we can get a uri of the image
                  const uri = await Expo.takeSnapshotAsync(
                    this.sketch,
                    options
                  );

                  this.setState({ imagePath: uri });
                }}
              />
              <View
                style={{
                  marginTop: 40,
                  paddingLeft: 20,
                  paddingRight: 20,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <Button
                  onPress={() => this.sketch.undo()}
                  style={{
                    width: "48%",
                    backgroundColor: blue,
                    borderRadius: 8,
                    height: 50,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 14,
                      fontFamily: "Roboto_light"
                    }}
                  >
                    Clear
                  </Text>
                </Button>
                <Button
                  disabled={this.state.imagePath.length === 0}
                  onPress={() => this.sign()}
                  style={{
                    width: "48%",
                    backgroundColor: blue,
                    borderRadius: 8,
                    height: 50,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 14,
                      fontFamily: "Roboto_light"
                    }}
                  >
                    Submit
                  </Text>
                </Button>
              </View>
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 40,
                paddingRight: 40
              }}
            >
              <Text
                style={{
                  fontFamily: "Roboto_light",
                  fontSize: 17,
                  color: blue,
                  textAlign: "center",
                  marginBottom: 10
                }}
              >
                Your currently do not have any active course requiring your
                signature
              </Text>
              <Text
                style={{
                  fontFamily: "Roboto_light",
                  fontSize: 17,
                  color: blue,
                  textAlign: "center"
                }}
              >
                Please revisit this page on the commencement of your next course
              </Text>
            </View>
          )}
        </View>
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

export default SignAttendance;
