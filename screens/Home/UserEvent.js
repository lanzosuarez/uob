import React, { Component } from "react";
import { View, Text, ScrollView, Dimensions, StyleSheet } from "react-native";
import { Button } from "native-base";
import HTMLView from "react-native-htmlview";

const blue = "#00246a";

const { width } = Dimensions.get("window");

class UserEvent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { workshop: w, withdrawConfirm } = this.props;

    let ue = w ? w.user_event : null;
    console.log(ue);
    return (
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ backgroundColor: "white" }}
      >
        <View style={{ flex: 1 }}>
          <View
            style={{
              backgroundColor: "white",
              paddingLeft: 30,
              paddingRight: 30,
              paddingTop: 15,
              flex: 1,
              alignItems: "center"
            }}
          >
            <View
              style={{
                alignItems: "center",
                marginBottom: 10
              }}
            >
              <Text
                style={{
                  fontFamily: "AgendaBold",
                  fontSize: 20,
                  fontWeight: "bold",
                  color: blue,
                  textAlign: "center"
                }}
              >
                {w ? w.title : ""}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "100",
                  color: blue,
                  fontFamily: "Roboto_light"
                }}
              >
                ({ue ? ue.booking_status : ""})
              </Text>
            </View>
            <View
              style={{
                marginBottom: 10
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  marginBottom: 10
                }}
              >
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: "bold",
                    color: blue,
                    fontFamily: "AgendaBold"
                  }}
                >
                  {ue ? ue.date : ""}
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "100",
                    color: blue,
                    fontFamily: "Roboto_light"
                  }}
                >
                  Available seats: {ue ? ue.available_slot : ""} of{" "}
                  {ue ? ue.slot : ""}
                </Text>
              </View>
            </View>
            <View
              style={{
                marginBottom: 10
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 10
                }}
              >
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: "bold",
                    color: blue,
                    fontFamily: "AgendaBold"
                  }}
                >
                  Venue
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 15,
                    fontWeight: "100",
                    color: blue,
                    fontFamily: "Roboto_light"
                  }}
                >
                  {ue ? ue.venue : ""}
                </Text>
              </View>
            </View>
            {ue.class_dates && ue.class_dates.length > 1 && (
              <View
                style={{
                  alignItems: "center",
                  marginBottom: 10
                }}
              >
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 17,
                    fontWeight: "bold",
                    color: blue,
                    fontFamily: "AgendaBold"
                  }}
                >
                  Class Dates
                </Text>
                {ue.class_dates.map((d, i) => (
                  <Text
                    key={i}
                    style={{
                      marginBottom: (i + 1) % 2 === 0 ? 10 : 0,
                      fontWeight: "100",
                      fontSize: 15,
                      color: blue,
                      fontFamily: "Roboto_light"
                    }}
                  >
                    {d}
                  </Text>
                ))}
              </View>
            )}
            <View
              style={{
                marginBottom: 20,
                alignItems: "center"
              }}
            >
              <Button
                onPress={() => withdrawConfirm()}
                style={{
                  backgroundColor: "#00246a",
                  padding: 3,
                  height: 40,
                  width: 150,
                  borderRadius: 10,
                  justifyContent: "center",
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "900",
                    color: "white",
                    fontFamily: "AgendaBold"
                  }}
                >
                  Withdraw
                </Text>
              </Button>
            </View>

            <HTMLView
              paragraphBreak={false}
              value={w ? w.description : `<p>hello</p>`}
              stylesheet={styles}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  p: {
    fontSize: 16,
    fontWeight: "100",
    color: "#00246a",
    fontFamily: "Roboto_light",
    lineHeight: 20
  },
  ul: {
    fontSize: 16,
    fontWeight: "100",
    color: "#00246a",
    fontFamily: "Roboto_light"
  },
  li: {
    fontSize: 16,
    fontWeight: "100",
    color: "#00246a",
    fontFamily: "Roboto_light"
  },
  strong: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#00246a",
    fontFamily: "AgendaBold"
  },
  em: {
    fontStyle: "italic",
    fontFamily: "AgendaBold",
    fontSize: 16,
    fontWeight: "bold",
    color: "#00246a"
  }
});

export default UserEvent;
