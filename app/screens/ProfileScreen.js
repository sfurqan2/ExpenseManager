import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Modal,
  RefreshControl,
} from "react-native";
import { TextInput } from "react-native-paper";
import { useState, useEffect, useContext } from "react";
import { COLORS, icons, SIZES, FONTS, images } from "../constants";
import Constants from "expo-constants";
import { ExpenseBox, StyledInput, Header } from "../components";
import { connect } from "react-redux";
import { loadExpenses, loadUser } from "../actions";
import Api from "../api";

const ProfileScreen = ({
  navigation,
  expenses,
  error,
  isLoading,
  loadExpenses,
  user,
  loadUser,
}) => {
  const [totalExpense, setTotalExpense] = useState(0);
  const [latestExpenses, setLatestExpenses] = useState(null);
  const [isModalOpen, setModalState] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordSecure, setPasswordSecure] = useState(true);
  const [newPasswordSecure, setNewPasswordSecure] = useState(true);
  const [confirmPasswordSecure, setConfirmPasswordSecure] = useState(true);

  useEffect(() => {
    userData();
  }, []);

  useEffect(() => {
    if (expenses.length > 0) {
      setTotalExpense(expenses.reduce((a, { amount }) => a + amount, 0));
    }
    getLatestExpenses();
  }, [expenses]);

  function userData() {
    loadUser();
    loadExpenses();
  }

  function changePassword() {
    if (confirmPassword.localeCompare(newPassword) === 0) {
      Api.fetchPost(Api.changePasswordApi, {
        password,
        new_password: newPassword,
      }).then((res) => {
        Alert.alert(res.header.message);
        setPassword("");
        setNewPassword("");
        setConfirmPassword("");
      });
    } else {
      Alert.alert(
        "Error",
        "Mismatch between new password and confirm password"
      );
    }
  }

  function getLatestExpenses() {
    if (expenses !== null) {
      let latestExp = [];
      for (let i = 0; i < 5; i++) {
        if (expenses[i] !== null && expenses[i] !== undefined)
          latestExp.push(expenses[i]);
      }
      setLatestExpenses(latestExp);
    }
  }

  function emptyComponent() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          padding: SIZES.padding * 2,
          marginHorizontal: SIZES.padding,
          marginTop: SIZES.padding * 2,
        }}
      >
        <Image
          resizeMode="contain"
          source={images.emptyImage}
          style={{ height: 300, width: "100%", borderRadius: 50 }}
        />
        <Text
          style={{
            ...FONTS.body4,
            textAlign: "center",
            fontWeight: "bold",
            color: COLORS.primary,
            marginTop: SIZES.padding * 2,
          }}
        >
          You haven't recorded any expenses yet!
        </Text>
      </View>
    );
  }

  function renderUserContainer() {
    return (
      <SafeAreaView
        style={{
          flex: 0,
          alignItems: "center",
          justifyContent: "center",
          padding: SIZES.padding * 2,
          backgroundColor: COLORS.primary,
        }}
      >
        {user === null ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <>
            <Image
              source={{ uri: user.profile_photo_url }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 999999,
                marginHorizontal: "auto",
              }}
            />
            <Text
              style={{
                ...FONTS.h1,
                marginTop: SIZES.padding * 2,
                color: COLORS.white,
                textAlign: "center",
              }}
            >
              {user.name}
            </Text>
            <Text
              style={{
                ...FONTS.h5,
                marginTop: SIZES.padding,
                color: COLORS.white,
                textAlign: "center",
              }}
            >
              {user.email}
            </Text>
          </>
        )}
      </SafeAreaView>
    );
  }

  function renderUserInfo() {
    if (user !== null)
      return (
        <View
          style={{
            flex: 0,
            flexDirection: "row",
            backgroundColor: COLORS.primary,
            padding: SIZES.padding * 2,
          }}
        >
          <View
            style={{
              width: "50%",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{ ...FONTS.h1, color: COLORS.orange, textAlign: "center" }}
            >
              {user.budget}
            </Text>
            <Text
              style={{ ...FONTS.h5, color: COLORS.orange, textAlign: "center" }}
            >
              Budget
            </Text>
          </View>
          <View
            style={{
              width: "50%",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{ ...FONTS.h1, color: COLORS.green, textAlign: "center" }}
            >
              {totalExpense}
            </Text>
            <Text
              style={{ ...FONTS.h5, color: COLORS.green, textAlign: "center" }}
            >
              Total Expenses
            </Text>
          </View>
        </View>
      );
  }

  function recentActivity() {
    if (expenses.length > 0) {
      return (
        <View
          style={{
            padding: SIZES.padding * 2,
            marginTop: SIZES.padding * 2,
            flex: 1,
          }}
        >
          <Text style={{ ...FONTS.h2 }}>Recent Activity</Text>
          {latestExpenses === null ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : (
            latestExpenses.map((exp) => {
              return (
                <View key={exp.id}>
                  <ExpenseBox
                    title={exp.title}
                    type={exp.type}
                    amount={exp.amount}
                    date={exp.date}
                  />
                </View>
              );
            })
          )}
        </View>
      );
    } else {
      return emptyComponent();
    }
  }

  function renderForm() {
    if (isModalOpen)
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Modal
            animationType="slide"
            transparent={true}
            visible={isModalOpen}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalState(!isModalOpen);
            }}
          >
            <TouchableWithoutFeedback
              onPress={() => setModalState(!isModalOpen)}
            >
              <View style={{ flex: 1, justifyContent: "center" }}>
                <TouchableWithoutFeedback>
                  <View
                    style={{
                      backgroundColor: COLORS.white,
                      borderRadius: 20,
                      margin: 20,
                      padding: 35,
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 4,
                      elevation: 5,
                    }}
                  >
                    <Text
                      style={{
                        ...FONTS.h2,
                        color: COLORS.primary,
                      }}
                    >
                      Change Password
                    </Text>
                    <StyledInput
                      text="Old password"
                      label="Old Password"
                      placeholder="Enter your old password"
                      autoCompleteType="password"
                      textContentType="password"
                      secureTextEntry={passwordSecure}
                      right={
                        <TextInput.Icon
                          name="eye"
                          onPress={() => setPasswordSecure(!passwordSecure)}
                          forceTextInputFocus={true}
                          color={COLORS.primary}
                        />
                      }
                      value={password}
                      onChangeText={setPassword}
                    />
                    <StyledInput
                      text="New Password"
                      label="New Password"
                      placeholder="Enter your new password"
                      autoCompleteType="password"
                      textContentType="password"
                      secureTextEntry={newPasswordSecure}
                      right={
                        <TextInput.Icon
                          name="eye"
                          onPress={() =>
                            setNewPasswordSecure(!newPasswordSecure)
                          }
                          forceTextInputFocus={true}
                          color={COLORS.primary}
                        />
                      }
                      value={newPassword}
                      onChangeText={setNewPassword}
                    />
                    <StyledInput
                      text="Confirm Password"
                      label= "Confirm Password"
                      placeholder="Confirm your new password"
                      autoCompleteType="password"
                      textContentType="password"
                      secureTextEntry={confirmPasswordSecure}
                      right={
                        <TextInput.Icon
                          name="eye"
                          onPress={() =>
                            setConfirmPasswordSecure(!confirmPasswordSecure)
                          }
                          forceTextInputFocus={true}
                          color={COLORS.primary}
                        />
                      }
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                    />
                    <TouchableOpacity
                      style={{
                        marginVertical: SIZES.padding * 2,
                        padding: SIZES.padding,
                        backgroundColor: COLORS.primary,
                        borderRadius: SIZES.radius,
                      }}
                      onPress={changePassword}
                    >
                      <Text
                        style={{ textAlign: "center", color: COLORS.white }}
                      >
                        Confirm
                      </Text>
                    </TouchableOpacity>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </View>
      );
    else return null;
  }

  return (
    <SafeAreaView style={{ flex: 1, marginTop: Constants.statusBarHeight }}>
      <Header title="Profile" navigation={navigation}>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={() => {
            setModalState(!isModalOpen);
          }}
        >
          <Image
            source={icons.settings}
            resizeMode="contain"
            style={{
              width: 20,
              height: 20,
              tintColor: COLORS.white,
            }}
          />
        </TouchableOpacity>
      </Header>
      <ScrollView
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={userData} />}
        keyboardShouldPersistTaps="always"
      >
        {renderUserContainer()}
        {renderUserInfo()}
        {recentActivity()}
        {renderForm()}
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = ({ expenses, error, isLoading, user }) => ({
  expenses,
  isLoading,
  error,
  user,
});

const mapDispatchToProps = (dispatch) => ({
  loadExpenses: () => dispatch(loadExpenses()),
  loadUser: () => dispatch(loadUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
