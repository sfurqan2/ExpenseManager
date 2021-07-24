import React from "react";
import { useState, useEffect } from "react";
import { NavigationContainer  } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView, Image, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as SecureStore from "expo-secure-store";
import Tabs from "./app/navigation/tabs";
import { ExpenseHistoryScreen, BudgetScreen, ProfileScreen, NewExpenseScreen, LoginScreen, SignupScreen } from "./app/screens";
import { AuthContext } from "./app/context";
import { Provider as PaperProvider } from 'react-native-paper';
import { enableScreens } from "react-native-screens";
import Api from "./app/api";
import { icons, COLORS } from "./app/constants";
import { Provider } from "react-redux";
import configureStore from "./app/store";

enableScreens();

const Stack = createStackNavigator();
const store = configureStore();

function SplashScreen() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.primary,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={icons.logo}
        style={{ width: "80%", resizeMode: "contain" }}
      />
      
      <StatusBar style="light" backgroundColor={COLORS.primary} />
    </SafeAreaView>
  );
}

export default function App() {
  const [isVerified, setVerifiedState] = useState(false);
  const [authLoading, setLoadingState] = useState(true);
  const [token, setToken] = useState("");

  async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
  }

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await SecureStore.getItemAsync("userToken");
      } catch (e) {
        Alert.alert("Error: ", "Unable to retrieve token!");
      }
      dispatch({ type: "RESTORE_TOKEN", token: userToken });
      setToken(userToken);
    };

    bootstrapAsync();
  }, []);

  useEffect(() => {
    userCheck();
    setTimeout(() => {
      setLoadingState(false);
    }, 3000);
  }, [state.userToken]);

  const authContext = React.useMemo(
    () => ({
      token,
      signIn: async (data) => {
        let userToken = null;
        fetch(Api.loginApi, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Connection: "Keep-Alive",
          },
          body: JSON.stringify({
            email: data.email,
            password: data.password,
          }),
        })
          .then((response) => response.json())
          .then((json) => {
            if (json.header.error) {
              Alert.alert("Error:", json.header.message);
            } else {
              userToken = json.body.token;
              setToken(userToken);
              try {
                save("userToken", userToken);
              } catch (e) {
                Alert.alert("Error:", "Token cannot be saved");
              }
            }
          })
          .then(() => {
            dispatch({ type: "SIGN_IN", token: userToken });
          })
          .catch((error) => console.error(error));
      },
      signOut: async () => {
        fetch(Api.logoutApi, {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + state.userToken,
            Connection: "Keep-Alive",
          },
        })
          .then(() => {
            setVerifiedState(false);
            dispatch({ type: "SIGN_OUT" });
          })
          .catch((error) => console.error(error));
        await SecureStore.deleteItemAsync("userToken");
      },
      signUp: async (data) => {
        let token = null;
        fetch(Api.signupApi, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Connection: "Keep-Alive",
          },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            password: data.password,
          }),
        })
          .then((response) => response.json())
          .then((json) => {
            if (json.header.error) {
              Alert.alert("Error:", json.header.message);
            } else {
              token = json.body.token;
            }
          })
          .then(() => dispatch({ type: "SIGN_IN", token: usertoken }))
          .catch((e) => console.error(e));
      },
    }),
    [token]
  );

  const userCheck = async () => {
    if (state.userToken === null) {
      return;
    }
    return fetch(Api.profileApi, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + state.userToken,
        Connection: "Keep-Alive",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.header !== undefined) {
          if (json.header.error) {
          } else {
            setVerifiedState(true);
          }
        }
      })
      .catch((err) => {
        console.error("User authentication failed.", err);
      })
      .finally(() => {
        setLoadingState(false);
      });
  };

  return (
    <Provider store={store}>
      <PaperProvider>
        <AuthContext.Provider value={authContext}>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
              initialRouteName={"Dashboard"}
            >
              {authLoading ? (
                <Stack.Screen name="Splash" component={SplashScreen} />
              ) : isVerified ? (
                <>
                  <Stack.Screen name="Dashboard" component={Tabs} />
                  <Stack.Screen
                    name="Expense History"
                    component={ExpenseHistoryScreen}
                  />
                  <Stack.Screen name="Budget" component={BudgetScreen} />
                  <Stack.Screen name="Profile" component={ProfileScreen} />
                  <Stack.Screen name="New Expense" component={NewExpenseScreen} />
                </>
              ) : (
                <>
                  <Stack.Screen name="Signup" component={SignupScreen} />
                  <Stack.Screen name="Login" component={LoginScreen} />
                </>
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </AuthContext.Provider>
      </PaperProvider>
    </Provider>
  );
}
