import React from "react";

import { Text, View, Dimensions, ScrollView } from "react-native";

import HTML from "react-native-render-html";

import Workshops from "./Workshops";

const blue = "#00246a";
const { width } = Dimensions.get("window");

const NoUserEvent = props => {
  const { workshop: w } = props;
  console.log(w);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            paddingLeft: 30,
            paddingRight: 30,
            paddingTop: 15
          }}
        >
          <View style={{ width: "100%" }}>
            <Text
              style={{
                fontSize: 22,
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
          <View style={{ paddingLeft: 20, paddingRight: 20 }}>
            <Workshops
              workshopId={w ? w.id : ""}
              workshop_types={w ? w.workshop_types : []}
            />
          </View>

          <HTML
            listsPrefixesRenderers={{
              ul: (htmlAttribs, children, convertedCSSStyles, passProps) => {
                return (
                  <Text style={{ color: blue, marginRight: 10 }}> &#8226;</Text>
                );
              }
            }}
            baseFontStyle={{
              flex: 1,
              fontSize: 16,
              fontWeight: "100",
              color: blue,
              fontFamily: "Roboto_light",
              lineHeight: 20,
              textAlign: "left",
              paddingTop: 10,
              paddingBottom: 30
            }}
            html={w ? w.description : ""}
            imagesMaxWidth={width}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default NoUserEvent;
