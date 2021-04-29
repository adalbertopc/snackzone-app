import { images } from '../constants';

// price rating
const affordable = 1;
const fairPrice = 2;
const expensive = 3;

export default restaurantData = [
	{
		id: 1,
		name: 'Productos Destacados',
		rating: 4.8,
		photo: images.snack_banner,
		duration: '30 - 45 min',
		menu: [
			{
				menuId: 1,
				name: 'Combo Pareja',
				photo: images.combo_pareja,
				description: 'Ingredientes: Cacahuates',
				calories: 500,
				price: 99,
			},
			{
				menuId: 2,
				name: 'Chalupa',
				photo: images.chalupa,
				description: 'Ingredientes: todo',
				calories: 250,
				price: 15,
			},
			{
				menuId: 3,
				name: 'Churros Locos',
				photo: images.churros_locos,
				description: 'Ingredientes: Churros locos',
				calories: 600,
				price: 45,
			},
		],
	},
	{
		id: 2,
		name: 'Productos Destacados 2',
		rating: 4.8,
		photo: images.snack_banner,
		duration: '30 - 45 min',
		menu: [
			{
				menuId: 1,
				name: 'Combo Pareja',
				photo: images.combo_pareja,
				description: 'Ingredientes: Cacahuates',
				calories: 500,
				price: 99,
			},
			{
				menuId: 2,
				name: 'Chalupa',
				photo: images.chalupa,
				description: 'Ingredientes: todo',
				calories: 250,
				price: 15,
			},
			{
				menuId: 3,
				name: 'Churros Locos',
				photo: images.churros_locos,
				description: 'Ingredientes: Churros locos',
				calories: 600,
				price: 45,
			},
		],
	},
	{
		id: 3,
		name: 'Productos Destacados 3',
		rating: 4.8,
		photo: images.snack_banner,
		duration: '30 - 45 min',
		menu: [
			{
				menuId: 1,
				name: 'Combo Pareja',
				photo: images.combo_pareja,
				description: 'Ingredientes: Cacahuates',
				calories: 500,
				price: 99,
			},
			{
				menuId: 2,
				name: 'Chalupa',
				photo: images.chalupa,
				description: 'Ingredientes: todo',
				calories: 250,
				price: 15,
			},
			{
				menuId: 3,
				name: 'Churros Locos',
				photo: images.churros_locos,
				description: 'Ingredientes: Churros locos',
				calories: 600,
				price: 45,
			},
		],
	},
];
