import React, {useContext, useState} from "react";
import {
  ScrollView,
  Text,
  KeyboardAvoidingView,
  Platform,
  Image,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { TextInput } from 'react-native-paper';
import { COLORS, icons, SIZES, FONTS } from "../constants";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "../context";
import { StyledInput } from "../components";
import { StatusBar } from "expo-status-bar";

const LoginScreen = ({ navigation }) => {
  const { signIn } = useContext(AuthContext);
  function renderLogo() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          height: 200,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={icons.logo}
          height="100"
          width="100"
          style={{
            marginTop: SIZES.padding * 2,
            resizeMode: "contain",
            height: 300,
            width: 300,
            borderRadius: 10,
          }}
        />
      </View>
    );
  }

  function renderForm() {
    const [email, onChangeEmail] = React.useState("");
    const [password, onChangePassword] = React.useState("");
    const [ secure, setSecure ]  = useState(true);
    return (
      <View
        style={{
          flex: 1,
          marginTop: SIZES.padding * 2,
          padding: SIZES.padding * 2,
          backgroundColor: COLORS.white,
          borderTopRightRadius: 25,
          borderTopLeftRadius: 25,
        }}
        accessibilityRole={Platform.OS === "web" ? "form" : "none"}
      >
        <Text
          style={{
            color: COLORS.primary,
            ...FONTS.h2,
            textAlign: 'center'
          }}
        >
          Login
        </Text>
        <StyledInput
          label="Email"
          placeholder= "Enter your email"
          autoCompleteType="email"
          autoCapitalize="none"
          textContentType="emailAddress"
          keyboardType="email-address"
          onChangeText={(text) => onChangeEmail(text)}
          value={email}
        />
        <StyledInput
          label="Password"
          placeholder= "Enter your password"
          autoCompleteType="password"
          textContentType="password"
          secureTextEntry={secure}
          right={<TextInput.Icon name="eye" onPress={() => setSecure(!secure)} forceTextInputFocus={true} color={COLORS.primary} />}
          onChangeText={(text) => onChangePassword(text)}
          value={password}
        />
        <View>
          <TouchableOpacity
            style={{
              marginVertical: SIZES.padding * 2,
              padding: SIZES.padding * 2,
              backgroundColor: COLORS.primary,
              borderRadius: SIZES.radius,
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            onPress={() => signIn({ email, password })}
          >
            <Text style={{ textAlign: "center", color: COLORS.white }}>Login</Text>
          </TouchableOpacity>
          <Text style={{ textAlign: "center", color: COLORS.blue }}> Or </Text>
          <Text
            style={{
              textAlign: "center",
              marginTop: SIZES.padding,
              fontWeight: "bold",
              color: COLORS.primary,
            }}
            onPress={() => navigation.navigate("Signup")}
          >
            {" "}
            Don't have an account?{" "}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={10}
    >
      <LinearGradient
        colors={[COLORS.primary, COLORS.blue]}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="always">
          {renderLogo()}
          {renderForm()}
        </ScrollView>
      </LinearGradient>
      <StatusBar style="light" backgroundColor={COLORS.primary} />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
