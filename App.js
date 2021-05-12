import React, { useReducer } from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { Restaurant, OrderDelivery, User, Map, Cart } from './screens';
import Tabs from './navigation/tabs';
import { ProductsContext } from './src/contexts/ProductsContext';
import { CartContext } from './src/contexts/CartContext';
import { useFetch } from './hooks/useFetch';
import CartReducer from './src/contexts/cartReducer';

const Stack = createStackNavigator();

const App = () => {
	const initialState = [];
	const { data, isLoading } = useFetch('products');
	const [cartProducts, dispatch] = useReducer(CartReducer, initialState);
	return (
		<ProductsContext.Provider value={{ data, isLoading }}>
			<CartContext.Provider value={{ cartProducts, dispatch }}>
				<NavigationContainer>
					<Stack.Navigator
						screenOptions={{
							headerShown: false,
						}}
						initialRouteName={'Home'}
					>
						<Stack.Screen key='Home' name='Home' component={Tabs} />
						<Stack.Screen
							key='Restaurant'
							name='Restaurant'
							component={Restaurant}
						/>
						<Stack.Screen
							key='OrderDelivery'
							name='OrderDelivery'
							component={OrderDelivery}
						/>
						<Stack.Screen key='User' name='User' component={User} />
						<Stack.Screen key='Map' name='Map' component={Map} />
						<Stack.Screen key='Cart' name='Cart' component={Cart} />
					</Stack.Navigator>
				</NavigationContainer>
			</CartContext.Provider>
		</ProductsContext.Provider>
	);
};

export default App;
