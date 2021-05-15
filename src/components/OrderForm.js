import React, { useContext, useState } from 'react';
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
	Alert,
} from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants';
import { CartContext } from '../contexts/CartContext';

export const OrderForm = ({ modalVisible, setModalVisible, products }) => {
	const [clientName, setClientName] = useState('');
	const [clientPhoneNumber, setClientPhoneNumber] = useState('');
	const { dispatch } = useContext(CartContext);

	const validateInputs = () => {
		if (!clientName.trim() || clientName.trim().length < 5) {
			Alert.alert('Aviso', 'Porfavor ingresa un nombre de al menos de 5 caracteres', [
				{ text: 'Aceptar', onPress: () => console.log('ok') },
			]);
			return false;
		}

		if (!clientPhoneNumber.trim() || clientPhoneNumber.trim().length < 10) {
			Alert.alert(
				'Aviso',
				'Porfavor ingresa un numero de celular de al menos de 10 digitos',
				[{ text: 'Aceptar', onPress: () => console.log('ok') }]
			);
			return false;
		}
		return true;
	};

	const orderComplete = () =>
		Alert.alert('Aviso', 'Orden Realizada. Pronto te llamaremos para confirmar su orden', [
			{ text: 'Aceptar', onPress: () => setModalVisible(!modalVisible) },
		]);

	const handleOrderSubmit = (endpoint) => {
		const url = `${SERVER_URL}/${endpoint}`;

		const obj = {
			clientName,
			clientPhoneNumber,
			products: products.map((product) => {
				return {
					productId: product._id,
					productName: product.name,
					qty: product.qty,
					total: product.total,
				};
			}),
			total: products.reduce((a, b) => a + (b.total || 0), 0).toFixed(2),
		};
		if (validateInputs()) {
			axios.post(url, obj).then(() => {
				orderComplete();
				dispatch({
					type: 'CLEAN_CART',
				});
			});
		}
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
