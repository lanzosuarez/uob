import React, { Component } from "react";
import { Text, Image, View, Dimensions, Linking } from "react-native";
import Toast from "react-native-root-toast";
import MessageDialog from "../MessageDialog";

import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Title,
  Icon,
  Button,
  Item,
  Input,
  Textarea,
  Content
} from "native-base";
import HelpDesk from "../../services/HelpDesk";
import { headerFontColor, headerBGcolor, WEB_URL } from "../../global";
import { DrawerActions } from "react-navigation";

const blue = "#00246a";

const { width, height } = Dimensions.get("window");

class Contact extends Component {
  state = {
    show: false,
    issue: "",
    contact_number: "",
    loading: false
  };

  gotoFqa = async () => {
    const link = `${WEB_URL}/faq`;
    Linking.openURL(link)
      .then(d => {
        this.showToast("Opening browser");
      })
      .catch(err => {
        this.showToast("Failed to open browser");
      });
  };

  checkFields = fields => fields.some(field => this.state[field].length === 0);
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
  toggleShow = () => this.setState({ show: !this.state.show });

  sendHelp = () => {
    if (this.checkFields(["issue", "contact_number"]) === false) {
      this.toggleLoad();
      const { issue: content, contact_number: contact_no } = this.state;
      const data = { content, contact_no };
      HelpDesk.sendHelp(data)
        .then(r => {
          this.toggleLoad();
          const { status, message } = r.data;
          console.log(status, message);
          if (status) {
            this.toggleShow();
            this.setState({ contact_number: "", issue: "" });
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
    } else {
      this.showToast("All fields are required");
    }
  };

  openDrawer = () => {
    this.props.navigation.dispatch(DrawerActions.openDrawer());
  };

  changeText = (key, val) => this.setState({ [key]: val });

  render() {
    return (
      <Container>
        <MessageDialog
          height={150}
          onOk={this.toggleShow}
          heading="Form Sent"
          message="Your inquiry has been sent successfully. Our representative will get back to you shortly."
          isVisible={this.state.show}
        />
        <Header style={{ backgroundColor: headerBGcolor }}>
          <Left style={{ flex: 1 }}>
            <Button onPress={() => this.openDrawer()} transparent>
              <Icon
                type="MaterialIcons"
                style={{ color: headerFontColor }}
                name="menu"
              />
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
                fontSize: 16,
                color: headerFontColor,
                fontFamily: "AgendaBold"
              }}
            >
              Contact Us
            </Title>
          </Body>
          <Right style={{ flex: 1 }} />
        </Header>
        <Content style={{ flex: 1 }}>
          <Image
            style={styles.imgBg}
            source={require("../../assets/adult.png")}
          />
          <View
            style={{
              height: height + 100,
              flex: 1,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              alignItems: "center",
              paddingTop: 70,
              paddingBottom: 60
            }}
          >
            <View
              style={{
                height: 490,
                width: width * 0.8,
                backgroundColor: "#f3f2f1",
                borderRadius: 6,
                padding: 40
              }}
            >
              <Text
                style={{
                  fontFamily: "AgendaBold",
                  fontSize: 20,
                  fontWeight: "600",
                  color: blue,
                  marginBottom: 15
                }}
              >
                Need Help?
              </Text>
              <Text
                style={{
                  marginBottom: 15
                }}
              >
                <Text
                  onPress={() => this.gotoFqa()}
                  style={{
                    fontFamily: "AgendaBold",
                    textDecorationLine: "underline",
                    fontWeight: "100",
                    color: "#00246a",
                    fontSize: 16
                  }}
                >
                  View our FAQ's{" "}
                </Text>
                <Text
                  style={{
                    fontFamily: "Roboto_light",
                    fontWeight: "100",
                    color: "#00246a",
                    fontSize: 16
                  }}
                >
                  or send us a message and we will get back to you as soon as
                  possible.
                </Text>
              </Text>
              <View style={{ marginBottom: 15 }}>
                <Text
                  style={{
                    fontFamily: "AgendaBold",
                    color: blue,
                    fontSize: 13,
                    marginBottom: 5,
                    marginLeft: 5
                  }}
                >
                  Contact Number
                </Text>
                <Item
                  style={{
                    borderRadius: 7,
                    borderWidth: 0,
                    borderColor: "transparent"
                  }}
                  rounded
                >
                  <Input
                    value={this.state.contact_number}
                    onChangeText={e => this.changeText("contact_number", e)}
                    style={styles.forgotInput}
                  />
                </Item>
              </View>
              <View style={{ marginBottom: 15 }}>
                <Text
                  style={{
                    fontFamily: "AgendaBold",
                    color: blue,
                    fontSize: 13,
                    marginBottom: 5,
                    marginLeft: 5
                  }}
                >
                  Summary of issue
                </Text>
                <Textarea
                  value={this.state.issue}
                  onChangeText={e => this.changeText("issue", e)}
                  rowSpan={5}
                  bordered
                  style={styles.tArea}
                />
              </View>
              <Button
                disabled={this.state.loading}
                onPress={() => this.sendHelp()}
                style={{
                  maxHeight: 70,
                  borderRadius: 8,
                  flex: 1,
                  backgroundColor: blue,
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  opacity: this.state.loading ? 0.5 : 1
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 15,
                    fontFamily: "AgendaBold"
                  }}
                >
                  {this.state.loading ? "Sending Inquiry..." : "Submit"}
                </Text>
              </Button>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = {
  imgBg: {
    resizeMode: "stretch",
    position: "absolute"
  },
  forgotInput: {
    height: 35,
    fontSize: 15,
    color: blue,
    backgroundColor: "#e0dcdb",
    paddingLeft: 20,
    borderRadius: 7,
    borderWidth: 0,
    borderColor: "transparent",
    fontFamily: "AgendaBold"
  },
  tArea: {
    paddingTop: 20,
    fontSize: 15,
    color: blue,
    backgroundColor: "#e0dcdb",
    paddingLeft: 20,
    borderRadius: 7,
    borderWidth: 0,
    borderColor: "transparent",
    fontFamily: "AgendaBold"
  }
};

export default Contact;
