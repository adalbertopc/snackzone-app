export default CartReducer = (state = [], action) => {
	switch (action.type) {
		case 'ADD_TO_CART':
			const productPayload = [...action.payload.products][0];
			let productFound = false;
			const newState = state.map((product) => {
				if (product._id === productPayload._id) {
					productFound = true;
					return {
						...product,
						qty: product.qty + productPayload.qty,
						total: product.total + productPayload.total,
					};
				} else return product;
			});
			return productFound ? [...newState] : [...newState, productPayload];
		case 'REMOVE_FROM_CART':
			return state.filter((product) => product._id !== action._id);

		default:
			throw new Error();
	}
};
