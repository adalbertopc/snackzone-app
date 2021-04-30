import React, { useEffect, useContext } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import { COLORS, FONTS, icons, SIZES, GOOGLE_API_KEY } from '../constants';
import { CartContext } from '../src/contexts/CartContext';

export const Cart = () => {
	const { cartProducts, dispatch } = useContext(CartContext);
	useEffect(() => {
		console.log(cartProducts);
	}, [cartProducts]);
	return (
		<View style={{ flex: 1 }}>
			<Text style={{ ...FONTS.h1 }}>Carrito Screen</Text>
			<View style={{ flex: 1, flexDirection: 'column' }}>
				{cartProducts.map((product) => (
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
						}}
					>
						<Text style={{ fontSize: 20 }}>Producto: {product.menuId}</Text>
						<Text>Cantidad:{product.qty}</Text>
					</View>
				))}
			</View>
		</View>
	);
};
