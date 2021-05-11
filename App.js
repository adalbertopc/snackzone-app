import React, { useReducer } from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { Restaurant, OrderDelivery, User, Map, Cart } from './screens';
import Tabs from './navigation/tabs';
import { CartContext } from './src/contexts/CartContext';
// import CartReducer from './src/contexts/cartReducer';

const Stack = createStackNavigator();
const cartReducer = (state = [], action) => {
	//console.log(state, action);
	switch (action.type) {
		case 'ADD_TO_CART':
			return [...state, ...action.payload.products];
		case 'REMOVE_FROM_CART':
			return state.filter((product) => product.menuId !== action.menuId);

		default:
			throw new Error();
	}
};

const App = () => {
	const initialState = [];
	const [cartProducts, dispatch] = useReducer(cartReducer, initialState);
	return (
		<CartContext.Provider value={{ cartProducts, dispatch }}>
			<NavigationContainer>
				<Stack.Navigator
					screenOptions={{
						headerShown: false,
					}}
					initialRouteName={'Home'}
				>
					<Stack.Screen name='Home' component={Tabs} />
					<Stack.Screen name='Restaurant' component={Restaurant} />
					<Stack.Screen name='OrderDelivery' component={OrderDelivery} />
					<Stack.Screen name='User' component={User} />
					<Stack.Screen name='Map' component={Map} />
					<Stack.Screen name='Cart' component={Cart} />
				</Stack.Navigator>
			</NavigationContainer>
		</CartContext.Provider>
	);
};

export default App;
