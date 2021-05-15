import React, { useContext, useState, useEffect } from 'react';
import {
	StyleSheet,
	SafeAreaView,
	View,
	Text,
	TouchableOpacity,
	Image,
	Animated,
} from 'react-native';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { CartContext } from '../src/contexts/CartContext';

import { icons, COLORS, SIZES, FONTS } from '../constants';

const Restaurant = ({ route, navigation }) => {
	const [item, setItem] = useState(route.params.item);
	const [orderItems, setOrderItems] = React.useState([]);
	const { state, dispatch } = useContext(CartContext);

	function editOrder(action, _id, price, image, name) {
		let orderList = orderItems.slice();
		let item = orderList.filter((a) => a._id == _id);

		if (action == '+') {
			if (item.length > 0) {
				let newQty = item[0].qty + 1;
				item[0].qty = newQty;
				item[0].total = item[0].qty * price;
			} else {
				const newItem = {
					_id: _id,
					qty: 1,
					price: price,
					total: price,
					image: image,
					name: name,
				};
				orderList.push(newItem);
			}
			setOrderItems(orderList);
		} else {
			if (item.length > 0) {
				if (item[0]?.qty > 0) {
					let newQty = item[0].qty - 1;
					item[0].qty = newQty;
					item[0].total = newQty * price;
				}
			}

			setOrderItems(orderList);
		}
	}

	function getOrderQty(_id) {
		let orderItem = orderItems.filter((a) => a._id == _id);

		if (orderItem.length > 0) {
			return orderItem[0].qty;
		}

		return 0;
	}

	function getBasketItemCount() {
		let itemCount = orderItems.reduce((a, b) => a + (b.qty || 0), 0);

		return itemCount;
	}

	function sumOrder() {
		let total = orderItems.reduce((a, b) => a + (b.total || 0), 0);

		return total.toFixed(2);
	}

	function renderHeader() {
		return (
			<View style={{ flexDirection: 'row' }}>
				<TouchableOpacity
					style={{
						width: 50,
						paddingLeft: SIZES.padding * 2,
						justifyContent: 'center',
					}}
					onPress={() => navigation.goBack()}
				>
					<Image
						source={icons.back}
						resizeMode='contain'
						style={{
							width: 30,
							height: 30,
						}}
					/>
				</TouchableOpacity>

				{/* Restaurant Name Section */}
				<View
					style={{
						flex: 1,
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<View
						style={{
							height: 50,
							alignItems: 'center',
							justifyContent: 'center',
							paddingHorizontal: SIZES.padding * 3,
						}}
					>
						{/* <Text style={{ ...FONTS.h3 }}>{restaurant?.name}</Text> */}
					</View>
				</View>

				<TouchableOpacity
					style={{
						width: 50,
						paddingRight: SIZES.padding * 2,
						justifyContent: 'center',
					}}
				>
					<Image
						source={icons.list}
						resizeMode='contain'
						style={{
							width: 30,
							height: 30,
						}}
					/>
				</TouchableOpacity>
			</View>
		);
	}

	function renderFoodInfo() {
		return (
			<View style={{ alignItems: 'center' }}>
				<View style={{ height: SIZES.height * 0.35 }}>
					{/* Food Image */}
					<Image
						source={{ uri: item.image }}
						resizeMode='cover'
						style={{
							width: SIZES.width,
							height: '100%',
						}}
					/>

					{/* Quantity */}
					<View
						style={{
							position: 'absolute',
							bottom: -20,
							width: SIZES.width,
							height: 50,
							justifyContent: 'center',
							flexDirection: 'row',
						}}
					>
						<TouchableOpacity
							style={{
								width: 50,
								backgroundColor: COLORS.white,
								alignItems: 'center',
								justifyContent: 'center',
								borderTopLeftRadius: SIZES.radius,
								borderBottomLeftRadius: SIZES.radius,
							}}
							onPress={() =>
								editOrder('-', item._id, item.price, item.image, item.name)
							}
						>
							<Text style={{ ...FONTS.body1 }}>-</Text>
						</TouchableOpacity>

						<View
							style={{
								width: 50,
								backgroundColor: COLORS.white,
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<Text style={{ ...FONTS.h2 }}>{getOrderQty(item._id)}</Text>
						</View>

						<TouchableOpacity
							style={{
								width: 50,
								backgroundColor: COLORS.white,
								alignItems: 'center',
								justifyContent: 'center',
								borderTopRightRadius: SIZES.radius,
								borderBottomRightRadius: SIZES.radius,
							}}
							onPress={() =>
								editOrder('+', item._id, item.price, item.image, item.name)
							}
						>
							<Text style={{ ...FONTS.body1 }}>+</Text>
						</TouchableOpacity>
					</View>
				</View>

				{/* Name & Description */}
				<View
					style={{
						width: SIZES.width,
						alignItems: 'center',
						marginTop: 15,
						paddingHorizontal: SIZES.padding * 2,
					}}
				>
					<Text
						style={{
							marginVertical: 10,
							textAlign: 'center',
							...FONTS.h2,
						}}
					>
						{item.name} - {item.price.toFixed(2)}
					</Text>
					<Text style={{ ...FONTS.body3 }}>{item.description}</Text>
				</View>
			</View>
		);
	}

	function renderOrder() {
		return (
			<View style={{ position: 'absolute', bottom: 0 }}>
				<View
					style={{
						backgroundColor: COLORS.white,
						borderTopLeftRadius: SIZES.radius,
						borderTopRightRadius: SIZES.radius,
					}}
				>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							paddingVertical: SIZES.padding * 2,
							paddingHorizontal: SIZES.padding * 3,
							borderBottomColor: COLORS.lightGray2,
							borderBottomWidth: 1,
						}}
					>
						<Text style={{ ...FONTS.h3 }}>Agregar {getBasketItemCount()}</Text>
						<Text style={{ ...FONTS.h3 }}>${sumOrder()}</Text>
					</View>

					{/* Order Button */}
					<View
						style={{
							padding: SIZES.padding * 2,
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<TouchableOpacity
							style={{
								width: SIZES.width * 0.9,
								padding: SIZES.padding,
								backgroundColor: COLORS.primary,
								alignItems: 'center',
								borderRadius: SIZES.radius,
							}}
							onPress={() => {
								//console.log(...orderItems);
								dispatch({
									type: 'ADD_TO_CART',
									payload: {
										products: [...orderItems],
									},
								});
							}}
						>
							<Text style={{ color: COLORS.white, ...FONTS.h2 }}>
								Agregar al carrito
							</Text>
						</TouchableOpacity>
					</View>
				</View>

				{isIphoneX() && (
					<View
						style={{
							position: 'absolute',
							bottom: -34,
							left: 0,
							right: 0,
							height: 34,
							backgroundColor: COLORS.white,
						}}
					></View>
				)}
			</View>
		);
	}

	return (
		<SafeAreaView style={styles.container}>
			{renderHeader()}
			{renderFoodInfo()}
			{renderOrder()}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.lightGray2,
	},
});

export default Restaurant;
