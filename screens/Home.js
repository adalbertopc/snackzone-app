import React from 'react';
import {
	SafeAreaView,
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Image,
	FlatList,
} from 'react-native';

import { icons, SIZES, COLORS, FONTS, categoryData, restaurantData } from '../constants';

const Home = ({ navigation }) => {
	// Dummy Datas

	const initialCurrentLocation = {
		streetName: 'Adal',
		gps: {
			latitude: 1.5496614931250685,
			longitude: 110.36381866919922,
		},
	};

	const [restaurants, setRestaurants] = React.useState(restaurantData);
	const [currentLocation, setCurrentLocation] = React.useState(initialCurrentLocation);

	function renderHeader() {
		return (
			<View style={{ flexDirection: 'row', height: 50 }}>
				<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
					<View
						style={{
							width: '100%',
							height: '100%',
							alignItems: 'flex-start',
							justifyContent: 'center',
							paddingHorizontal: 20,
						}}
					>
						<Text style={{ ...FONTS.h3 }}>SnackZone</Text>
					</View>
				</View>
			</View>
		);
	}

	function renderRestaurantList() {
		const renderItem = ({ item }) => (
			<TouchableOpacity
				style={{ marginBottom: SIZES.padding * 2 }}
				onPress={() =>
					navigation.navigate('Restaurant', {
						item,
						currentLocation,
					})
				}
			>
				{/* Image */}
				<View
					style={{
						marginBottom: SIZES.padding,
					}}
				>
					<Image
						source={item.photo}
						resizeMode='cover'
						style={{
							width: '100%',
							height: 200,
							borderRadius: SIZES.radius,
						}}
					/>

					<View
						style={{
							position: 'absolute',
							bottom: 0,
							height: 50,
							width: SIZES.width * 0.3,
							backgroundColor: COLORS.white,
							borderTopRightRadius: SIZES.radius,
							borderBottomLeftRadius: SIZES.radius,
							alignItems: 'center',
							justifyContent: 'center',
							...styles.shadow,
						}}
					>
						<Text style={{ ...FONTS.h4 }}>{item.duration}</Text>
					</View>
				</View>

				{/* Restaurant Info */}

				<View
					style={{
						marginTop: SIZES.padding,
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
				>
					<Text style={{ ...FONTS.body2 }}>{item.name}</Text>
					{/* Rating */}
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'space-between',
						}}
					>
						<Image
							source={icons.star}
							style={{
								height: 20,
								width: 20,
								tintColor: COLORS.primary,
								marginRight: 10,
							}}
						/>
						<Text style={{ ...FONTS.body3 }}>{item.rating}</Text>
					</View>
				</View>
			</TouchableOpacity>
		);

		return (
			<FlatList
				data={restaurants}
				keyExtractor={(item) => `${item.id}`}
				renderItem={renderItem}
				contentContainerStyle={{
					paddingHorizontal: SIZES.padding * 2,
					paddingBottom: 30,
				}}
			/>
		);
	}

	return (
		<SafeAreaView style={styles.container}>
			{renderHeader()}
			{renderRestaurantList()}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.lightGray4,
	},
	shadow: {
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 0.1,
		shadowRadius: 3,
		elevation: 1,
	},
});

export default Home;
