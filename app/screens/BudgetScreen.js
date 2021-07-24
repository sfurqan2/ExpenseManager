import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useState, useEffect } from "react";
import { COLORS, SIZES, FONTS } from "../constants";
import { Header } from "../components";
import Constants from "expo-constants";
import { connect } from "react-redux";
import { loadUser, loadExpenses } from "../actions";
import Api from "../api";

const BudgetScreen = ({
  user,
  isLoading,
  error,
  loadUser,
  expenses,
  loadExpenses,
  navigation
}) => {
  const [budget, setBudget] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    userData();
  }, []);

  useEffect(() => {
    if (expenses.length > 0)
      setTotalExpense(expenses.reduce((a, { amount }) => a + amount, 0));
    if (user) {
      setBudget(user.budget);
    }
  }, [expenses, user]);

  function userData() {
    loadUser();
    loadExpenses();
  }

  function reallocateBudget() {
    Api.fetchPost(Api.newBudgetApi, { budget }).then((res) =>
      Alert.alert(res.header.message)
    );
  }

  function decreaseBudget() {
    if (budget - 500 < 0) {
      Alert.alert("Budget cannot be a negative value!");
    } else if (budget - 500 >= totalExpense) setBudget(budget - 500);
    else {
      Alert.alert("Budget cannot be less than the incurred expenses!");
    }
  }

  function renderForm() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ ...FONTS.h2, fontWeight: "bold", color: COLORS.black }}>
          Reallocate Budget
        </Text>
        <View
          style={[
            styles.centerContent,
            {
              flex: 0,
              flexDirection: "row",
              marginTop: SIZES.padding * 2,
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => decreaseBudget()}
            style={[
              styles.centerContent,
              styles.iconButtons,
              {
                flex: 0,
                backgroundColor: COLORS.red,
              },
            ]}
          >
            <Text
              style={{ ...FONTS.h1, fontWeight: "bold", color: COLORS.white }}
            >
              -
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              ...FONTS.h1,
              fontWeight: "bold",
              marginHorizontal: SIZES.padding * 2,
            }}
          >
            {budget}
          </Text>
          <TouchableOpacity
            onPress={() => setBudget(budget + 500)}
            style={[
              styles.centerContent,
              styles.iconButtons,
              {
                flex: 0,
                backgroundColor: COLORS.green,
              },
            ]}
          >
            <Text
              style={{ ...FONTS.h1, fontWeight: "bold", color: COLORS.white }}
            >
              +
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => reallocateBudget()}
          style={styles.button}
        >
          <Text
            style={{ ...FONTS.body4, fontWeight: "bold", color: COLORS.white }}
          >
            Confirm Budget
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  function renderBudgetContainer() {
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
        {isLoading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <>
            <Text style={[styles.text, styles.heading, styles.textWhite]}>
              {budget - totalExpense}
            </Text>
            <Text style={[styles.text, styles.normal, styles.textWhite]}>
              Remaining Budget
            </Text>
          </>
        )}
      </SafeAreaView>
    );
  }

  function renderUserInfo() {
    if (!isLoading)
      return (
        <View
          style={{
            flex: 0,
            flexDirection: "row",
            backgroundColor: COLORS.primary,
            padding: SIZES.padding * 2,
          }}
        >
          <View style={styles.view}>
            <Text style={[styles.text, styles.heading, styles.textBlue]}>
              {budget}
            </Text>
            <Text style={[styles.text, styles.normal, styles.textBlue]}>
              Budget
            </Text>
          </View>
          <View style={styles.view}>
            <Text style={[styles.text, styles.heading, styles.textGreen]}>
              {totalExpense}
            </Text>
            <Text style={[styles.text, styles.normal, styles.textGreen]}>
              Total Expenses
            </Text>
          </View>
        </View>
      );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Budget" navigation={ navigation } />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={userData} />
        }
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {renderBudgetContainer()}
        {renderUserInfo()}
        {renderForm()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },

  button: {
    marginTop: SIZES.padding * 2,
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding * 3,
    backgroundColor: COLORS.primary,
    borderRadius: 5000,
  },

  heading: {
    ...FONTS.h1,
  },

  normal: {
    ...FONTS.h5,
  },

  textGreen: {
    color: COLORS.green,
  },

  textWhite: {
    color: COLORS.secondary,
  },

  textBlue: {
    color: COLORS.orange,
  },

  text: {
    textAlign: "center",
  },

  view: {
    width: "50%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  centerContent: {
    justifyContent: "center",
    alignItems: "center",
  },

  iconButtons: {
    width: 50,
    height: 50,
    borderRadius: 5000,
  },
});

const mapStateToProps = ({ user, isLoading, error, expenses }) => ({
  user,
  isLoading,
  error,
  expenses,
});

const mapDispatchToProps = (dispatch) => ({
  loadUser: () => dispatch(loadUser()),
  loadExpenses: () => dispatch(loadExpenses()),
});

export default connect(mapStateToProps, mapDispatchToProps)(BudgetScreen);
