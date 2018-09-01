import React from "react";

import { View, Text } from "react-native";
import { Button, CardItem, Card, Body } from "native-base";
import { withNavigation } from "react-navigation";

const blue = "#00246a";

const WorkshopItem = props => {
  const { type, credit, keyword } = props.workshopType;
  const workshopId = props.workshopId;

  console.log(workshopId, keyword);

  const viewSchedules = () => {
    props.navigation.navigate("ViewSchedule", {
      id: workshopId,
      keyword,
      credit
    });
  };

  return (
    <Card style={{ flex: 0, borderRadius: 8 }}>
      <CardItem
        style={{
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8
        }}
      >
        <Body>
          <View
            style={{
              height: 30,
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              paddingLeft: 0,
              paddingRight: 0
            }}
          >
            <View style={{ flex: 2 }}>
              <Text
                numberOfLines={3}
                style={{
                  fontSize: 18,
                  color: blue,
                  fontFamily: "Roboto_light"
                }}
              >
                {type}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  color: blue,
                  fontFamily: "Roboto_light"
                }}
              >
                {credit} credits
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "flex-end",
                flexDirection: "row"
              }}
            >
              <Button
                onPress={() => viewSchedules()}
                style={{
                  padding: 3,
                  height: 35,
                  flex: 1,
                  borderRadius: 10,
                  justifyContent: "center",
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: blue
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 12,
                    textAlign: "center",
                    fontFamily: "Roboto_light"
                  }}
                >
                  View Schedule
                </Text>
              </Button>
            </View>
          </View>
        </Body>
      </CardItem>
    </Card>
  );
};

export default withNavigation(WorkshopItem);
