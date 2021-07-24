import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { BudgetScreen, DashboardScreen, ExpenseHistoryScreen, ProfileScreen } from '../screens';


const Drawer = createDrawerNavigator();

const MyDrawer = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Dashboard" component = {DashboardScreen}/>
            <Drawer.Screen name="Expense History" component = {ExpenseHistoryScreen}/>
            <Drawer.Screen name="Budget" component = {BudgetScreen}/>
            <Drawer.Screen name="Profile" component = {ProfileScreen}/>
        </Drawer.Navigator>
    )
}

export default MyDrawer;