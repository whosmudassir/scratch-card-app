import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  LayoutChangeEvent,
  Pressable,
  Text as RNText,
} from "react-native";
import {
  Canvas,
  Path,
  Skia,
  useImage,
  Image,
  Mask,
  Group,
  Rect,
} from "@shopify/react-native-skia";
import LottieView from "lottie-react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { svgPathProperties } from "svg-path-properties";
import ClaimButton from "./ClaimButton";
import RewardCard from "./RewardCard";
import { styles } from "../../styles/scratchCard";
import { ScratchCardProps } from "../../types/transaction";

const ScratchPattern = ({
  width,
  height,
}: {
  width: number;
  height: number;
}) => {
  const patternImg = useImage(require("../../assets/images/gift-pattern.jpg"));
  return patternImg ? (
    <Image image={patternImg} fit="cover" width={width} height={height} />
  ) : null;
};

const ScratchCard: React.FC<ScratchCardProps> = ({
  onScratchComplete,
  onClaimComplete,
  selectedReward,
  claimedRewards,
  scratchedRewards,
}) => {
  const [canvasLayout, setCanvasLayout] = useState({ width: 0, height: 0 });
  const [paths, setPaths] = useState<Skia.SkPath[]>([]);
  const cardArea = useRef<number>(0);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  const isScratched = scratchedRewards.includes(selectedReward.rewardId);
  const isClaimed = claimedRewards.includes(selectedReward.rewardId);

  useEffect(() => {
    setPaths([]);
    cardArea.current = 0;
  }, [selectedReward]);

  const pan = Gesture.Pan()
    .runOnJS(true)
    .onStart(({ x, y }) => {
      setPaths((prev) => [...prev, Skia.Path.Make().moveTo(x, y)]);
    })
    .onUpdate(({ x, y }) => {
      setPaths((prev) => {
        if (prev.length === 0) return prev;
        const lastPath = prev[prev.length - 1];
        lastPath.lineTo(x, y);
        return [...prev];
      });
    })
    .onEnd(() => {
      if (paths.length === 0) return;
      const lastPath = paths[paths.length - 1];
      if (!lastPath) return;

      const pathProperty = new svgPathProperties(lastPath.toSVGString());
      const pathArea = pathProperty.getTotalLength() * 40;
      cardArea.current += pathArea;

      const { width, height } = canvasLayout;
      if ((cardArea.current / (width * height)) * 100 > 70) {
        setShowSuccessAnimation(true);
        onScratchComplete();
      }
    })
    .minDistance(1)
    .enabled(!isScratched);

  const handleCanvasLayout = useCallback((e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    setCanvasLayout({ width, height });
  }, []);

  return (
    <View style={styles.container}>
      <GestureDetector gesture={pan}>
        <Canvas onLayout={handleCanvasLayout} style={styles.canvas}>
          {paths.length !== 0 && (
            <RewardCard
              width={canvasLayout.width}
              height={canvasLayout.height}
              rewardDetails={selectedReward}
            />
          )}
          {!isScratched ? (
            <Mask
              clip
              mode="luminance"
              mask={
                <Group>
                  <Rect
                    x={0}
                    y={0}
                    width={canvasLayout.width}
                    height={canvasLayout.height}
                    color="white"
                  />
                  {paths.map((p, index) => (
                    <Path
                      key={index}
                      path={p}
                      strokeWidth={40}
                      style="stroke"
                      strokeJoin="round"
                      strokeCap="round"
                      antiAlias
                      color="black"
                    />
                  ))}
                </Group>
              }
            >
              <ScratchPattern
                width={canvasLayout.width}
                height={canvasLayout.height}
              />
            </Mask>
          ) : (
            <RewardCard
              width={canvasLayout.width}
              height={canvasLayout.height}
              rewardDetails={selectedReward}
            />
          )}
        </Canvas>
      </GestureDetector>

      {isScratched &&
        (isClaimed ? (
          <Pressable style={styles.alreadyClaimedContainer}>
            <RNText style={styles.alreadyClaimedText}>Claimed</RNText>
          </Pressable>
        ) : (
          <ClaimButton onPress={onClaimComplete} />
        ))}

      {showSuccessAnimation && (
        <LottieView
          source={require("../../assets/images/celebrate-animation.json")}
          autoPlay
          loop={false}
          style={styles.lottie}
        />
      )}
    </View>
  );
};

export default ScratchCard;
