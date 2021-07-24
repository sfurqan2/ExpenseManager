import React, { useContext, useEffect, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { SIZES, COLORS } from "../constants";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import { Card, Header, Block } from "../components";
import Api from "../api";
import { AuthContext } from "../context";

const DashboardScreen = ({ navigation }) => {
  const { token } = useContext(AuthContext);
  const [expenses, setExpenses] = useState([]);
  const [expenseTypes, setExpenseTypes] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    handleRefresh();
  }, [token]);

  useEffect(() => {
    let daily, monthly, yearly;

    if (expenses) {
      monthly = expenses
        .filter(({ type }) => type.localeCompare("MONTHLY") === 0)
        .reduce((total, { amount }) => {
          return total + amount;
        }, 0);
      daily =
        1000 +
        expenses
          .filter(({ type }) => type.localeCompare("DAILY") === 0)
          .reduce((total, { amount }) => {
            return total + amount;
          }, 0);
      yearly = expenses
        .filter(({ type }) => type.localeCompare("YEARLY") === 0)
        .reduce((total, { amount }) => {
          return total + amount;
        }, 0);
    }

    setExpenseTypes({ daily, monthly, yearly });
  }, [expenses]);

  function handleRefresh() {
    setLoading(true);
    fetch(Api.expensesApi, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.header === null || json.header === undefined) return;
        if (!json.header.error) {
          setExpenses(json.body);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }

  function cards() {
    if (expenseTypes !== null)
      return (
        <View>
          <ScrollView
            horizontal
            snapToInterval={250}
            decelerationRate="fast"
            style={{ flex: 0 }}
            contentContainerStyle={styles.scroll}
          >
            <Card
              title="Daily Spending"
              number={expenseTypes.daily}
              color={COLORS.blue}
            ></Card>
            <Card
              title="Monthly Spending"
              number={expenseTypes.monthly}
              color={COLORS.green}
            ></Card>
            <Card
              title="Yearly Spending"
              number={expenseTypes.yearly}
              color={COLORS.orange}
            ></Card>
          </ScrollView>
        </View>
      );
  }

  function blocks() {
    return (
      <ScrollView>
        <TouchableOpacity
          onPress={() => navigation.navigate("Expense History")}
        >
          <Block
            heading="Expense History"
            description="History of all the expenses you have incurred over the past year."
            background={COLORS.green}
            icon="history"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Budget")}>
          <Block
            heading="Budget"
            description="The current budget of the year."
            background={COLORS.orange}
            icon="currency-usd"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Block
            heading="Profile"
            description="Your personal information and other details."
            background={COLORS.blue}
            icon="account"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("New Expense")}>
          <Block
            heading="New Expense"
            description="Add new expenses."
            background={COLORS.blue}
            icon="cash"
          />
        </TouchableOpacity>
      </ScrollView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Dashboard" navigation={navigation} />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
        }
      >
        {cards()}
        {blocks()}
      </ScrollView>
      <StatusBar style="light" backgroundColor={COLORS.primary} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    backgroundColor: COLORS.primary,
  },
  scroll: {
    padding: SIZES.padding * 2,
    flexDirection: "row",
  },
});

export default DashboardScreen;
