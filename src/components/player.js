import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Audio } from "expo-av";
import { styles } from "../helpers/styles";
import PlayerControls from "./controls";
import SeekBar from "./seekbar";

const Player = ({ song, previousTrack, nextTrack, randomTrack }) => {
  // https://github.com/expo/playlist-example/blob/master/App.js
  const [status, setStatus] = useState({});
  const [player, setPlayer] = useState(new Audio.Sound());
  const [random, setRandom] = useState(true);

  useEffect(() => {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
      playThroughEarpieceAndroid: false,
    }),
      [];
  });

  useEffect(() => {
    playSong();
  }, [song]);

  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setStatus(status);
    }
    if (status.didJustFinish && !status.isLooping) {
      onForward();
    }
  };

  const onForward = () => {
    if (random) {
      randomTrack();
    } else {
      nextTrack();
    }
  };

  const onBackward = () => {
    if (random) {
      randomTrack();
    } else {
      previousTrack();
    }
  };

  const onSeek = async (positionMillis) => {
    const result = await player.getStatusAsync();
    result.isLoaded && player.setPositionAsync(positionMillis);
  };

  const onPlay = async () => {
    const result = await player.getStatusAsync();
    if (result.isLoaded) {
      if (result.isPlaying) {
        player.pauseAsync();
      } else {
        player.playAsync();
      }
    } else {
      if (random) {
        randomTrack();
      } else {
        playSong();
      }
    }
  };

  const playSong = async () => {
    try {
      //unload previous song
      await player.unloadAsync();
      if (song) {
        await player.loadAsync(
          { uri: song.url },
          {
            shouldPlay: true,
            rate: status.rate,
            shouldCorrectPitch: status.shouldCorrectPitch,
            volume: status.volume,
            isMuted: status.muted,
            isLooping: status.isLooping,
            progressUpdateIntervalMillis: 1000,
          }
        );
        player.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const onStop = async () => {
    try {
      const result = await player.getStatusAsync();
      if (result.isLoaded) {
        await player.stopAsync();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.bottomView}>
      <SeekBar
        isPlaying={status.isLoaded}
        onSeek={onSeek}
        trackLength={status.positionMillis ? status.durationMillis : 1}
        currentPosition={status.positionMillis ? status.positionMillis : 0}
      />
      <PlayerControls
        isPlaying={song && status.isPlaying}
        isLooping={status.isLooping}
        isRandom={random}
        onLoop={() => player.setIsLoopingAsync(!status.isLooping)}
        onRandom={() => setRandom(!random)}
        {...{
          onBackward,
          onForward,
          onPlay,
          onStop,
        }}
      />
    </View>
  );
};

export default Player;
