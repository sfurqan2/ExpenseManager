import React from 'react';
import { Image, } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DashboardScreen, ExpenseHistoryScreen, BudgetScreen, ProfileScreen } from '../screens';
import { COLORS, icons } from '../constants';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        <Tab.Navigator 
            tabBarOptions = {{ 
                showLabel: false,
                keyboardHidesTabBar: true,
                style: {
                    borderTopWidth: 0,
                    backgroundColor: COLORS.primary,
                    elevation: 5,
                    shadowColor: COLORS.black,
                    shadowOffset: { width: 0, height :2},
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                },
            }}
        >
            <Tab.Screen 
                name="Dashboard" 
                component={ DashboardScreen } 
                options={{ 
                    tabBarIcon: ({focused}) => (
                        <Image 
                            source = { icons.home }
                            resizeMode = "contain"
                            style = {{
                                width: 25,
                                height: 25,
                                tintColor: focused ? COLORS.orange : COLORS.secondary,
                            }}
                        />
                    )
                }} 
            />
            <Tab.Screen 
                name="Expense History" 
                component={ ExpenseHistoryScreen } 
                options={{ 
                    tabBarIcon: ({focused}) => (
                        <Image 
                            source = { icons.history }
                            resizeMode = "contain"
                            style = {{
                                width: 25,
                                height: 25,
                                tintColor: focused ? COLORS.orange : COLORS.secondary,
                            }}
                        />
                    )
                }} 
            />
            <Tab.Screen 
                name="Budget" 
                component={ BudgetScreen } 
                options={{ 
                    tabBarIcon: ({focused}) => (
                        <Image 
                            source = { icons.budget }
                            resizeMode = "contain"
                            style = {{
                                width: 25,
                                height: 25,
                                tintColor: focused ? COLORS.orange : COLORS.secondary,
                            }}
                        />
                    )
                }} 
            />
            <Tab.Screen 
                name="Profile" 
                component={ ProfileScreen } 
                options={{ 
                    tabBarIcon: ({focused}) => (
                        <Image 
                            source = { icons.profile }
                            resizeMode = "contain"
                            style = {{
                                width: 25,
                                height: 25,
                                tintColor: focused ? COLORS.orange : COLORS.secondary,
                            }}
                        />
                    )
                }} 
            />
        </Tab.Navigator>
    );
}

export default Tabs;