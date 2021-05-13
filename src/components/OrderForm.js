import React, { useState } from 'react';
import axios from 'axios';
import { SERVER_URL } from 'react-native-dotenv';
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	Modal,
	StyleSheet,
	Pressable,
	TextInput,
} from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants';

export const OrderForm = ({ modalVisible, setModalVisible, products }) => {
	const [clientName, setClientName] = useState('');
	const [clientPhoneNumber, setClientPhoneNumber] = useState('');

	const handleOrderSubmit = (endpoint) => {
		const url = `${SERVER_URL}/${endpoint}`;
		console.log({
			name: clientName,
			phone: clientPhoneNumber,
			products,
		});
		// axios.post(url, {
		// 	name: clientName,
		// 	phone: clientPhoneNumber,
		// });
	};
	return (
		<Modal
			animationType='slide'
			transparent={false}
			visible={modalVisible}
			onRequestClose={() => {
				setModalVisible(!modalVisible);
			}}
		>
			<View style={styles.centeredView}>
				<View style={styles.modalView}>
					<Text style={styles.modalText}>Datos de la orden: </Text>
					<TextInput
						placeholder='A nombre de'
						style={styles.inputText}
						value={clientName}
						onChangeText={(text) => setClientName(text)}
					/>
					<TextInput
						placeholder='Numero de celular'
						style={styles.inputText}
						value={clientPhoneNumber}
						onChangeText={(text) =>
							setClientPhoneNumber(text.replace(/[^0-9]/g, ''))
						}
						keyboardType='numeric'
					/>
					<View
						style={{
							padding: SIZES.padding,
							paddingBottom: SIZES.padding,
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<TouchableOpacity
							style={{
								width: SIZES.width * 0.4,
								padding: SIZES.padding * 0.7,
								backgroundColor: COLORS.primary,
								alignItems: 'center',
								borderRadius: SIZES.radius,
							}}
							onPress={() => {
								//console.log(...orderItems);
								handleOrderSubmit('orders');
							}}
						>
							<Text style={{ color: COLORS.white, ...FONTS.h3 }}>Ordenar</Text>
						</TouchableOpacity>
					</View>
					<Pressable onPress={() => setModalVisible(!modalVisible)}>
						<Text style={styles.textStyle}>Cancelar</Text>
					</Pressable>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	inputText: {
		width: 200,
		height: 40,
		borderRadius: 5,
		borderColor: '#ccc',
		borderWidth: 1,
		marginBottom: 15,
	},
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalView: {
		margin: 20,
		backgroundColor: 'white',
		borderRadius: 10,
		padding: 60,
		alignItems: 'center',
		elevation: 5,
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
	},
	buttonOpen: {
		backgroundColor: '#F194FF',
	},
	buttonClose: {
		backgroundColor: '#2196F3',
	},
	textStyle: {
		color: '#ccc',
		fontWeight: 'bold',
		textAlign: 'center',
	},
	modalText: {
		marginBottom: 15,
		textAlign: 'center',
	},
});
