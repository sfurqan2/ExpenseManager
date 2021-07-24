import React, { useContext } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { SIZES, COLORS, icons, FONTS } from '../constants';
import { AuthContext } from '../context';

const Header = (props) => {

  const { signOut } = useContext(AuthContext);

  return (
    <View
      style={{
        backgroundColor: COLORS.primary,
        flex: 0,
        paddingHorizontal: SIZES.padding,
        paddingVertical: SIZES.padding * 2,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: SIZES.padding * 2,
        }}
        onPress={() => props.navigation.goBack()}
      >
        <Image
          source={icons.back}
          resizeMode="contain"
          style={{
            width: 20,
            height: 20,
            tintColor: COLORS.white,
          }}
        />
        <Text
          style={{
            marginLeft: SIZES.padding * 1.5,
            color: COLORS.white,
            ...FONTS.h4,
          }}
        >
          {props.title}
        </Text>
      </TouchableOpacity>
      <View style={{ flex:0, flexDirection:'row', alignItems:'center' }}>
        {props.children}
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: SIZES.padding * 2,
          }}
          onPress={signOut}
        >
          <Image
            source={icons.logout}
            resizeMode="contain"
            style={{
              width: 20,
              height: 20,
              tintColor: COLORS.white,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
