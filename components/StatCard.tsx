import Card from "@/components/Card";
import { Text, View } from "react-native-ui-lib";
import React from "react";

type Props = {
  name?: string | null;
  haveInTransitPickUps: boolean;
  tyresByType: any;
};

const StatsCard = ({ name, haveInTransitPickUps, tyresByType }: Props) => {
  return (
    <Card>
      <Text text30R>{name}</Text>
      {haveInTransitPickUps ? (
        <View>
          <Text>Current load:</Text>
          <Text>{Object.keys(tyresByType!).map((key) => `\n${[key]}: ${tyresByType[key]} `)}</Text>
        </View>
      ) : (
        <View>
          <Text> Empty truck</Text>
        </View>
      )}
      <View></View>
    </Card>
  );
};

export default StatsCard;
