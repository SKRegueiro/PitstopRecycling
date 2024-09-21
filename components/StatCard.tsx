import Card from "@/components/Card";
import { Text, View } from "react-native-ui-lib";
import React from "react";

type Props = {
  name?: string | null;
  haveInTransitPickUps: boolean;
  //TODO: better type
  tyresByType: any;
  isLoading: boolean;
};

const StatsCard = ({ name, haveInTransitPickUps, tyresByType, isLoading }: Props) => {
  return (
    <Card>
      <Text text30R>{name}</Text>
      {/*  TODO: too complex, think of something better*/}
      {!isLoading ? (
        <View style={{ paddingTop: 8 }}>
          {haveInTransitPickUps ? (
            <View>
              <Text>Current load:</Text>
              <Text>{Object.keys(tyresByType!).map((key) => `\n${[key]}: ${tyresByType[key]} `)}</Text>
            </View>
          ) : (
            <Text>Empty</Text>
          )}
        </View>
      ) : (
        <View>
          <Text> Loading ...</Text>
        </View>
      )}
      <View></View>
    </Card>
  );
};

export default StatsCard;
