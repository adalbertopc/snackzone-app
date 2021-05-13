import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { MAPBOX_API_KEY } from 'react-native-dotenv';

MapboxGL.setAccessToken(MAPBOX_API_KEY);
MapboxGL.setConnected(true);
export const MapBox = () => {
	const snackzoneCoords = [-109.43293887595466, 27.060780252614716];
	return (
		<View style={styles.page}>
			<View style={styles.container}>
				<MapboxGL.MapView style={styles.map}>
					<MapboxGL.Camera zoomLevel={15} centerCoordinate={snackzoneCoords} />
					<MapboxGL.PointAnnotation
						id='snackzone-marker'
						snippet='SnackZone'
						coordinate={snackzoneCoords}
						draggable={false}
						title='SnackZone'
					/>
				</MapboxGL.MapView>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	page: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	container: {
		flex: 1,
		width: '100%',
		height: '100%',
		backgroundColor: 'tomato',
	},
	map: {
		...StyleSheet.absoluteFillObject,
	},
});
