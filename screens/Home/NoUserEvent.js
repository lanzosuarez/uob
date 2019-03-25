import React from "react";

import { Text, View, Dimensions, ScrollView, StyleSheet } from "react-native";

import HTMLView from "react-native-htmlview";

import Workshops from "./Workshops";

const blue = "#00246a";
const { width } = Dimensions.get("window");

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
    fontFamily: "AgendaItalic",
    fontSize: 16,
    fontWeight: "900",
    color: "#00246a"
  }
});

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
          <View style={{ paddingLeft: 20, paddingRight: 20, marginBottom: 15 }}>
            <Workshops
              workshopId={w ? w.id : ""}
              workshop_types={w ? w.workshop_types : []}
            />
          </View>
          <HTMLView
         
            value={w ? w.description : `<p>hello</p>`}
            // value={`<em>hello</em>`}
            stylesheet={styles}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default NoUserEvent;
