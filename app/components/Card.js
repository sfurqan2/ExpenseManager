import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants";

const Card = (props) => {
  const styles = StyleSheet.create({
    card: {
      backgroundColor: 'rgba(255,255,255,0.1)',
      padding: SIZES.padding * 2,
      borderRadius: SIZES.radius,
      margin: 5,
      width: 250,
      height: 100,
    },
    title: {
      fontWeight: "bold",
      ...FONTS.boy5,
      color: COLORS.white,
    },
    number: {
      ...FONTS.h2,
      fontWeight: "bold",
      color: COLORS.white,
    },
  });

  return (
    <View style={styles.card}>
      <Text style={styles.number}>{props.number}</Text>
      <Text style={styles.title}>{props.title}</Text>
    </View>
  );
};

export default Card;
