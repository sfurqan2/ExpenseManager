import React, { useContext, useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { FONTS, SIZES, COLORS } from "../constants";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import { Header } from "../components";
import Api from "../api";
import { AuthContext } from "../context";

const NewExpenseScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("DAILY");
  const { token } = useContext(AuthContext);

  function handleSubmit() {
    if (amount > 0) {
      fetch(Api.newExpenseApi, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          title: name,
          amount,
          type,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.header.error == 0) {
            Alert.alert("Success", json.header.message);
          } else {
            Alert.alert("Error", json.header.message);
          }
        })
        .catch((err) => console.error(err))
        .finally(() => {
          setName("");
          setAmount("");
          setType("DAILY");
        });
    } else {
      Alert.alert("Error", "Expense cannot be zero!");
    }
  }
  function renderForm() {
    return (
      <View
        style={{
          flex: 0,
          backgroundColor: COLORS.white,
          margin: SIZES.padding * 3,
          padding: SIZES.padding * 2,
          borderRadius: SIZES.padding,
        }}
      >
        <Text
          style={{
            color: COLORS.primary,
            ...FONTS.h2,
            textAlign: "center",
            marginBottom: SIZES.padding * 2,
          }}
        >
          Create new expense
        </Text>
        <TextInput
          placeholder="Name"
          autoCompleteType="name"
          autoCapitalize="words"
          value={name}
          onChangeText={(text) => setName(text)}
          style={{
            borderWidth: 1,
            borderColor: COLORS.darkgray,
            padding: SIZES.padding,
            borderRadius: 5,
            marginBottom: SIZES.padding * 2,
          }}
        />
        <View
          style={{
            width: "100%",
            flex: 0,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderColor: "#999",
            borderWidth: 1,
            paddingHorizontal: SIZES.padding,
            marginBottom: SIZES.padding * 2,
            borderRadius: 5,
          }}
        >
          <Text style={{ ...FONTS.body4, color: COLORS.darkgray }}>Type</Text>
          <Picker
            selectedValue={type}
            mode="dropdown"
            style={{ flex: 1, marginLeft: SIZES.padding }}
            onValueChange={(itemValue, itemIndex) => setType(itemValue)}
          >
            <Picker.Item label="Daily" value="DAILY" />
            <Picker.Item label="Monthly" value="MONTHLY" />
            <Picker.Item label="Yearly" value="YEARLY" />
          </Picker>
        </View>
        <View style={{ flex: 0 }}>
          <TextInput
            placeholder="Amount"
            value={String(amount)}
            keyboardType="numeric"
            onChangeText={(text) => setAmount(text)}
            style={{
              borderWidth: 1,
              borderColor: COLORS.darkgray,
              padding: SIZES.padding,
              borderRadius: 5,
              marginBottom: SIZES.padding,
            }}
          />
        </View>
        <TouchableOpacity
          onPress={() => handleSubmit()}
          style={{
            flex: 0,
            padding: SIZES.padding2,
            marginTop: SIZES.padding * 2,
            backgroundColor: COLORS.primary,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 50,
          }}
        >
          <Text
            style={{ color: COLORS.white, ...FONTS.body4, fontWeight: "bold" }}
          >
            Add Expense
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        marginTop: Constants.statusBarHeight,
        backgroundColor: COLORS.primary,
      }}
    >
      <Header title="New Expense" navigation={navigation} />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {renderForm()}
      </View>
      <StatusBar style="light" backgroundColor={COLORS.primary} />
    </SafeAreaView>
  );
};

export default NewExpenseScreen;
