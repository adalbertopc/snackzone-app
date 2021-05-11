export default CartReducer = (state = [], action) => {
	//console.log(action.payload.products);
	switch (action.type) {
		case 'ADD_TO_CART':
			return [...state, ...action.payload.products];
		case 'REMOVE_FROM_CART':
			return state.filter((product) => product.menuId !== action.menuId);

		default:
			throw new Error();
	}
};
