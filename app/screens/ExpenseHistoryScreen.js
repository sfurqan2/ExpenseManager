import * as React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  Text,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { icons, SIZES, COLORS, images, FONTS } from "../constants";
import Constants from "expo-constants";
import { ExpenseBox, Header } from "../components";
import { useEffect, useState } from "react";
import { Searchbar, Chip } from 'react-native-paper';
import { connect } from "react-redux";
import { loadExpenses } from "../actions";

const ExpenseHistoryScreen = ({
  navigation,
  error,
  expenses,
  isLoading,
  loadExpenses,
}) => {

  const [search, setSearch] = useState("");
  const [type, setType ] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [all, setAll] = useState(true);
  const [daily, setDaily] = useState(false);
  const [monthly, setMonthly] = useState(false);
  const [yearly, setYearly] = useState(false);

  useEffect(() => {
    loadExpenses();
  }, []);

  useEffect(() => {
    if(expenses){
      setType(expenses);
    }
  }, [expenses]);

  useEffect(() => {
    if(type){
      setFiltered(type.filter(({title}) => {
        return title.toLowerCase().startsWith(search.toLowerCase());
      }));
    }
  }, [type, search]);


  const renderExpense = ({ item }) => {
    return (
      <ExpenseBox
        title={item.title}
        type={item.type}
        amount={item.amount + 1000}
        date={item.date}
      />
    );
  };

  function emptyComponent() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          marginHorizontal: SIZES.padding,
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
            color: COLORS.white,
            marginTop: SIZES.padding * 2,
          }}
        >
          You haven't recorded any expenses yet!
        </Text>
      </View>
    );
  }

  function chipCheck(choice){

    if(expenses){
      if(choice === 'all'){
        setType(expenses);
      }
      else{
        setType(expenses.filter(({type}) => {
          return type.toLowerCase().startsWith(choice.toLowerCase());
        }));
      }
    }

    switch(choice){
      case 'all':
        setAll(true);
        setDaily(false);
        setMonthly(false);
        setYearly(false);
        break;
      case 'daily':
        setAll(false);
        setDaily(true);
        setMonthly(false);
        setYearly(false);
        break;
      case 'monthly':
        setAll(false);
        setDaily(false);
        setMonthly(true);
        setYearly(false);
        break;
      case 'yearly':
        setAll(false);
        setDaily(false);
        setMonthly(false);
        setYearly(true);
        break;
      default: 
        break;
    }
  }

  function listHeader() {
    return (
      <>
        <Searchbar
          autoCapitalize="none"
          onChangeText={setSearch}
          value={search}
          status="info"
          placeholder="Search"
          style={styles.search}
        />
        <View style={ styles.chipView }>
          <Chip selected = {all} onPress={() => chipCheck('all')} mode='outlined' style= {styles.chip} textStyle={{ color: COLORS.primary }}>All</Chip>
          <Chip selected = {daily} onPress={() => chipCheck('daily')} mode='outlined' style= {styles.chip} textStyle={{ color: COLORS.primary }}>Daily</Chip>
          <Chip selected = {monthly} onPress={() => chipCheck('monthly')} mode='outlined' style= {styles.chip} textStyle={{ color: COLORS.primary }}>Monthly</Chip>
          <Chip selected = {yearly} onPress={() => chipCheck('yearly')}  mode='outlined' style= {styles.chip} textStyle={{ color: COLORS.primary }}>Yearly</Chip>
        </View>
      </>
    );
  }

  function renderExpenses() {
    return (
      <View style={styles.view}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#ffffff" />
        ) : (
          <FlatList
            data={filtered}
            renderItem={renderExpense}
            keyExtractor={(item) => item.id.toString()}
            refreshControl={
              <RefreshControl
                colors={["#9Bd35A", "#689F38"]}
                refreshing={isLoading}
                onRefresh={loadExpenses}
              />
            }
            ListHeaderComponent={listHeader()}
            ListEmptyComponent={emptyComponent()}
            contentContainerStyle={{ flexGrow: 1 }}
          />
        )}
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Expense History" navigation={navigation}>
        <TouchableOpacity onPress={() => navigation.navigate("New Expense")}>
          <Image source={icons.add} style={styles.icon} />
        </TouchableOpacity>
      </Header>
      {renderExpenses()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    backgroundColor: COLORS.primary,
    flex: 1,
  },

  icon: {
    height: 25,
    width: 25,
    tintColor: COLORS.white,
  },
  view: {
    flex: 1,
    margin: SIZES.padding * 2,
  },
  search: {
    marginBottom: SIZES.padding * 2,
    marginHorizontal: SIZES.padding,
    borderColor: "#333",
    backgroundColor: "#fff",
  },
  chipView: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  chip: {
  }
});

const mapStateToProps = ({ isLoading, expenses, error }) => ({
  isLoading,
  expenses,
  error,
});

const mapDispatchToProps = (dispatch) => ({
  loadExpenses: () => dispatch(loadExpenses()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpenseHistoryScreen);
