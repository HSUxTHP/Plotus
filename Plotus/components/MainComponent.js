import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setBaseUrl } from '../shared/baseUrl';

import Home from './HomeComponent';
import Menu from './MenuComponent';
import ProductDetail from './ProductDetailComponent';
import Partner from './PartnerComponent';
import Cart from './CartComponent';
import Order from './OrderComponent';
import OrderDetail from './OrderDetailComponent';
import Settings from './SettingsComponent';

const MenuNavigator = createStackNavigator();

function MenuNavigatorScreen() {
    return (
        <MenuNavigator.Navigator
            initialRouteName='MenuScreen'
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#512DA8'
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    color: '#fff'
                }
            }}
        >
            <MenuNavigator.Screen
                name="MenuScreen"
                component={Menu}
                options={{ title: 'Products Management' }}
            />
            <MenuNavigator.Screen
                name="ProductDetail"
                component={ProductDetail}
                options={{ title: 'Product Detail' }}
            />
        </MenuNavigator.Navigator>
    );
}

const HomeNavigator = createStackNavigator();

function HomeNavigatorScreen() {
    return (
        <HomeNavigator.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#512DA8'
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    color: '#fff'
                }
            }}
        >
            <HomeNavigator.Screen
                name="HomeScreen"
                component={Home}
                options={{ title: 'Dashboard' }}
            />
        </HomeNavigator.Navigator>
    );
}

const PartnerNavigator = createStackNavigator();

function PartnerNavigatorScreen() {
    return (
        <PartnerNavigator.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#512DA8'
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    color: '#fff'
                }
            }}
        >
            <PartnerNavigator.Screen
                name="PartnerScreen"
                component={Partner}
                options={{ title: 'Partners' }}
            />
        </PartnerNavigator.Navigator>
    );
}

const CartNavigator = createStackNavigator();

function CartNavigatorScreen() {
    return (
        <CartNavigator.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#512DA8'
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    color: '#fff'
                }
            }}
        >
            <CartNavigator.Screen
                name="CartScreen"
                component={Cart}
                options={{ title: 'New Order' }}
            />
        </CartNavigator.Navigator>
    );
}

const OrderNavigator = createStackNavigator();

function OrderNavigatorScreen() {
    return (
        <OrderNavigator.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#512DA8'
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    color: '#fff'
                }
            }}
        >
            <OrderNavigator.Screen
                name="OrderScreen"
                component={Order}
                options={{ title: 'Orders' }}
            />
            <OrderNavigator.Screen
                name="OrderDetail"
                component={OrderDetail}
                options={{ title: 'Order Detail' }}
            />
        </OrderNavigator.Navigator>
    );
}

const SettingsNavigator = createStackNavigator();

function SettingsNavigatorScreen() {
    return (
        <SettingsNavigator.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#512DA8'
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    color: '#fff'
                }
            }}
        >
            <SettingsNavigator.Screen
                name="SettingsScreen"
                component={Settings}
                options={{ title: 'Settings' }}
            />
        </SettingsNavigator.Navigator>
    );
}

const MainNavigator = createDrawerNavigator();

function MainNavigatorScreen() {
    return (
        <MainNavigator.Navigator
            screenOptions={{
                drawerStyle: {
                    backgroundColor: '#D1C4E9'
                },
                headerShown: false
            }}
        >
            <MainNavigator.Screen
                name="Home"
                component={HomeNavigatorScreen}
                options={{ title: 'Dashboard', drawerLabel: 'Dashboard' }}
            />
            <MainNavigator.Screen
                name="Cart"
                component={CartNavigatorScreen}
                options={{ title: 'New Order', drawerLabel: 'New Order' }}
            />
            <MainNavigator.Screen
                name="Menu"
                component={MenuNavigatorScreen}
                options={{ title: 'Products Catalog', drawerLabel: 'Products Catalog' }}
            />
            <MainNavigator.Screen
                name="Order"
                component={OrderNavigatorScreen}
                options={{ title: 'Order History', drawerLabel: 'Order History' }}
            />
            <MainNavigator.Screen
                name="Partner"
                component={PartnerNavigatorScreen}
                options={{ title: 'Partners', drawerLabel: 'Partners' }}
            />
            <MainNavigator.Screen
                name="Settings"
                component={SettingsNavigatorScreen}
                options={{ title: 'Settings', drawerLabel: 'Settings' }}
            />
        </MainNavigator.Navigator>
    );
}

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isReady: false
        };
    }

    async componentDidMount() {
        try {
            const ip = await AsyncStorage.getItem('serverIp');
            if (ip) {
                setBaseUrl(ip);
            }
        } catch (error) {
            console.error('Failed to load IP', error);
        } finally {
            this.setState({ isReady: true });
        }
    }

    render() {
        if (!this.state.isReady) {
            return <View />;
        }
        return (
            <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : 0 }}>
                <NavigationContainer>
                    <MainNavigatorScreen />
                </NavigationContainer>
            </View>
        );
    }
}

export default Main;
