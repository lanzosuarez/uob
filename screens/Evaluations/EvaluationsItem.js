import React from "react";

import { Text, View, Image, TouchableOpacity } from "react-native";
import { ListItem, Left, Right, Icon } from "native-base";

const blue = "#00246a";

const EvaluationsItem = props => {
<<<<<<< HEAD
  const { title, event_id, event_batch_id } = props.evaluation;
  return (
    <ListItem
      onPress={() => props.goToEvaluate(event_batch_id,event_id)}
=======
  const { title, event_batch_id, event_id } = props.evaluation;
  return (
    <ListItem
      onPress={() => props.goToEvaluate(event_batch_id, event_id)}
>>>>>>> db730317981e5f1ceeab42a2fbf78041e816accb
      style={{ borderBottomColor: blue }}
    >
      <Left>
        <Text style={{ fontFamily: "Roboto_light", color: blue }}>{title}</Text>
      </Left>
      <Right>
<<<<<<< HEAD
        <TouchableOpacity onPress={() => props.goToEvaluate(event_batch_id,event_id)}>
=======
        <TouchableOpacity
          onPress={() => props.goToEvaluate(event_batch_id, event_id)}
        >
>>>>>>> db730317981e5f1ceeab42a2fbf78041e816accb
          <Icon
            style={{ color: blue }}
            type="MaterialIcons"
            name="chevron-right"
          />
        </TouchableOpacity>
      </Right>
    </ListItem>
  );
};

export default EvaluationsItem;
