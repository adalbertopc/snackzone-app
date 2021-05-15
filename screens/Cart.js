import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, StyleSheet, Pressable } from 'react-native';
import { isIphoneX } from 'react-native-iphone-x-helper';

import { COLORS, FONTS, icons, SIZES } from '../constants';
import { OrderForm } from '../src/components/OrderForm';
import { CartContext } from '../src/contexts/CartContext';

export const Cart = () => {
	const { cartProducts, dispatch } = useContext(CartContext);
	const [modalVisible, setModalVisible] = useState(false);
	const [haveProducts, setHaveProducts] = useState(false);
	useEffect(() => {
		setHaveProducts(cartProducts.length === 0 ? false : true);
	}, [cartProducts]);
	return (
		<View style={{ flex: 1 }}>
			{haveProducts ? (
				<>
					<OrderForm
						modalVisible={modalVisible}
						setModalVisible={setModalVisible}
						products={cartProducts}
					/>
					<Text style={{ ...FONTS.h1 }}>Carrito</Text>
					<View style={{ flex: 1, flexDirection: 'column' }}>
						{/* Header  */}
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center',
							}}
						>
							<View
								style={{
									display: 'flex',
									flexDirection: 'row',
									alignItems: 'center',
									flex: 1.5,
								}}
							>
								<Text style={{ fontSize: 20, marginLeft: 10 }}>
									Producto
								</Text>
							</View>
							<View
								style={{
									display: 'flex',
									flex: 1,
									flexDirection: 'row',
									alignItems: 'center',
									justifyContent: 'space-between',
								}}
							>
								<Text style={{ textAlign: 'center' }}>Cantidad</Text>
								<Text style={{ textAlign: 'center', paddingRight: 10 }}>
									Total
								</Text>
							</View>
						</View>
						{cartProducts.map((product) => (
							<View
								key={product._id}
								style={{
									flexDirection: 'row',
									justifyContent: 'space-between',
									alignItems: 'center',
									padding: 10,
								}}
							>
								<View
									style={{
										display: 'flex',
										flex: 2,
										flexDirection: 'row',
										alignItems: 'center',
									}}
								>
									<Image
										source={{ uri: product.image }}
										style={{ width: 50, height: 50, borderRadius: 5 }}
									/>
									<Text style={{ fontSize: 20, marginLeft: 10 }}>
										{product.name}
									</Text>
								</View>
								<View
									style={{
										display: 'flex',
										flex: 1,
										flexDirection: 'row',
										alignItems: 'center',
										justifyContent: 'space-between',
									}}
								>
									<Text>{product.qty}</Text>
									<Text>{product.total}</Text>
								</View>
							</View>
						))}
						{/* Buy */}
						{cartProducts.length > 0 && (
							<View style={{ position: 'absolute', bottom: 15 }}>
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
										<Text style={{ ...FONTS.h3 }}>
											{cartProducts.reduce(
												(a, b) => a + (b.qty || 0),
												0
											)}{' '}
											productos en el carrito
										</Text>
										<Text style={{ ...FONTS.h3 }}>
											$
											{cartProducts
												.reduce((a, b) => a + (b.total || 0), 0)
												.toFixed(2)}
										</Text>
									</View>

									{/* Order Button */}
									<View
										style={{
											padding: SIZES.padding * 2,
											paddingBottom: SIZES.padding * 6,
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
												setModalVisible(true);
											}}
										>
											<Text
												style={{
													color: COLORS.white,
													...FONTS.h2,
												}}
											>
												Ordenar
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
						)}
					</View>
				</>
			) : (
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<Image
						source={icons.basket}
						resizeMode='contain'
						style={{
							width: 100,
							height: 100,
							tintColor: '#ccc',
							top: -20,
						}}
					/>
					<Text style={{ color: '#ccc' }}>El carrito esta vacio</Text>
				</View>
			)}
		</View>
	);
};
