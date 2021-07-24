import * as React from "react";
import {
  ScrollView,
  Text,
  KeyboardAvoidingView,
  Platform,
  Image,
  View,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";
import { COLORS, icons, SIZES, FONTS } from "../constants";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "../context";
import { StyledInput } from "../components";
import {StatusBar} from 'expo-status-bar';
import { TextInput } from 'react-native-paper';
const SignupScreen = ({ navigation }) => {
  const { signUp } = React.useContext(AuthContext);
  
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
          width="200"
          style={{
            marginTop: SIZES.padding * 2,
            resizeMode: "contain",
            height: 100,
            width: 300,
            borderRadius: 10,
          }}
        />
      </View>
    );
  }

  function renderForm() {
    const [name, onChangeName] = React.useState("");
    const [email, onChangeEmail] = React.useState("");
    const [password, onChangePassword] = React.useState("");
    const [secure, setSecure] = React.useState(true);
    return (
      <View
        style={{
          marginTop: SIZES.padding * 2,
          flex:1,
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
          Signup
        </Text>
        <StyledInput
          label= "Name"
          placeholder = "Enter your name"
          autoCompleteType="name"
          autoCapitalize="words"
          value={name}
          onChangeText={(text) => onChangeName(text)}
        />
        <StyledInput
          label="Email"
          placeholder = "Enter your email"
          autoCompleteType="email"
          autoCapitalize="none"
          textContentType="emailAddress"
          keyboardType="email-address"
          onChangeText={(text) => onChangeEmail(text)}
          value={email}
        />
        <StyledInput
            label = "Password"
            placeholder = "Enter your password"
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
            }}
            onPress={() => signUp({ name, email, password })}
          >
            <Text style={{ textAlign: "center", color: COLORS.white }}>Sign up</Text>
          </TouchableOpacity>
          <Text style={{ textAlign: "center", color: COLORS.blue }}> Or </Text>
          <Text
            style={{
              textAlign: "center",
              marginTop: SIZES.padding,
              color: COLORS.primary,
              fontWeight: "bold",
            }}
            onPress={() => navigation.navigate("Login")}
          >
            Already have an account?{" "}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={100}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <LinearGradient
          colors={[COLORS.primary, COLORS.blue]}
          style={{ flex: 1 }}
        >
          <View style={{ flex:1 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="always">
              {renderLogo()}
              {renderForm()}
            </ScrollView>
          </View>
          <StatusBar style="light" backgroundColor={COLORS.primary} />
        </LinearGradient>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;
