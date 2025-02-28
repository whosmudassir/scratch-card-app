import { RewardCardProps } from "@/types/transaction";
import { Group, Rect, useFont, Fill, Text } from "@shopify/react-native-skia";
import React from "react";

const RewardCard = ({ width, height, rewardDetails }: RewardCardProps) => {
  const getFont = (fontSize: number) => {
    return useFont(
      require("../../assets/fonts/SpaceMono-Regular.ttf"),
      fontSize
    );
  };

  return (
    <Group>
      <Fill color="white" />

      <Group>
        <Rect x={0} y={0} width={width} height={height} color="#FFF" />

        <Text
          x={width / 3 - 10}
          y={height / 3 - 20}
          text={`You won!`}
          color="black"
          font={getFont(24)}
        />
        <Text
          x={width / 3 - 30}
          y={height / 3 + 50}
          text={`₹${rewardDetails.amount}`}
          color="#28a745"
          font={getFont(60)}
        />
        <Text
          x={width / 3 + 10}
          y={height / 3 + 80}
          text={rewardDetails.type}
          color="black"
          font={getFont(18)}
        />
        <Text
          x={width / 3 - 50}
          y={height / 3 + 120}
          text={`Expires on ${rewardDetails.expiryDate}`}
          color="black"
          font={getFont(16)}
        />
      </Group>
    </Group>
  );
};

export default React.memo(RewardCard);
