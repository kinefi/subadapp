import React from "react";
import { Image, TouchableOpacity, Text, View } from "react-native";
import { SwipeableRow } from "./swipeable";
import { styles, songStyle, songText } from "../helpers/styles";

export const Song = ({ song, openUrl }) => (
  <TouchableOpacity style={styles.songStyle} onPress={() => openUrl(song.page)}>
    <Image style={styles.songImage} source={{ uri: song.image }} />
    <Text>
      {song.no} - {song.name}
    </Text>
  </TouchableOpacity>
);

export const SongItem = ({
  song,
  selected,
  onLeftOpen,
  onRightOpen,
  image = true,
  onPress = false,
}) => (
  <SwipeableRow {...{ onLeftOpen, onRightOpen, onPress }}>
    <View style={songStyle(selected)}>
      {image && (
        <Image style={styles.playlistImage} source={{ uri: song.image }} />
      )}
      <Text style={songText(selected)}>{song.name}</Text>
    </View>
  </SwipeableRow>
);

export const SongDetail = ({ song, openUrl }) => {
  return (
    <>
      {song && (
        <TouchableOpacity
          style={styles.songStyle}
          onPress={() => openUrl(song.page)}
        >
          <Image style={styles.albumImage} source={{ uri: song.image }} />
          <Text style={{ fontSize: 32 }}>{song.name}</Text>
        </TouchableOpacity>
      )}
    </>
  );
};
