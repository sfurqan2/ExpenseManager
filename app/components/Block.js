import React from 'react';
import { View, Text } from 'react-native';
import { SIZES, FONTS, COLORS } from '../constants';
import { Avatar } from 'react-native-paper';

const Block = (props) => {
    return(
      <View style={{ flex:1, flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.1)', margin: SIZES.padding * 2, padding: SIZES.padding * 2, borderRadius: 10 }}>
        <Avatar.Icon color={COLORS.white} size={50} icon={props.icon} style={{backgroundColor: COLORS.primary}} />
        <View style={{ paddingHorizontal: SIZES.padding *2 }}>
          <Text style={{ ...FONTS.h4, color: COLORS.white }}>{ props.heading }</Text>
          <Text style={{ ...FONTS.body6, marginTop: SIZES.padding, color: COLORS.white }}>{ props.description }</Text>
        </View>
      </View>
    );
}

export default Block;