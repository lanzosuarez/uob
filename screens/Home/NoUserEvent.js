import React from "react";

import { Text, View, Dimensions } from "react-native";

import { Container, Content } from "native-base";

import Workshops from "./Workshops";

const blue = "#00246a";
const { height } = Dimensions.get("window");

const NoUserEvent = props => {
  const { workshop: w } = props;

  return (
    <Container>
      <Content
        contentContainerStyle={{
          backgroundColor: "white",
          paddingLeft: 30,
          paddingRight: 30,
          paddingTop: 15,
          flex: 1,
          alignItems: "center",
          minHeight: height
        }}
      >
        <View style={{ flex: 1 }}>
          <View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginBottom: 30,
                color: blue,
                textAlign: "center",
                fontFamily: "AgendaBold"
              }}
            >
              {w ? w.title : ""}
            </Text>
          </View>
          <Workshops
            workshopId={w ? w.id : ""}
            workshop_types={w ? w.workshop_types : []}
          />
          <View>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "100",
                color: blue,
                lineHeight: 20,
                marginTop: 20,
                fontFamily: "AgendaMedium"
              }}
            >
              {w ? w.description : ""}
            </Text>
          </View>
        </View>
      </Content>
    </Container>
  );
};

export default NoUserEvent;