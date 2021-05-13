import { useReducer, useEffect } from 'react';
import { SERVER_URL } from 'react-native-dotenv';
import { types } from '../constants/types';

const dataFetchReducer = (state, action) => {
	switch (action.type) {
		case types.FETCH_GET:
			return { ...state, isLoading: true, isError: false };
		case types.FETCH_SUCCESS:
			return {
				...state,
				data: action.payload,
				isLoading: false,
				isError: false,
			};
		case types.FETCH_ERROR:
			return {
				state: [],
				isLoading: false,
				isError: true,
			};
		default:
			return state;
	}
};

export const useFetch = (endpoint) => {
	const [state, dispatch] = useReducer(dataFetchReducer, {
		isLoading: true,
		isError: false,
		data: [],
	});

	const url = `${SERVER_URL}/${endpoint}`;
	// const headers = {
	//     headers: {
	//         'auth-token': getAuthCookie(),
	//     },
	// }
	useEffect(() => {
		const fetchData = async () => {
			dispatch({ type: types.FETCH_GET });
			try {
				const response = await fetch(url, {
					method: 'GET',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
				});

				const { data } = await response.json();
				//console.log(data);
				dispatch({
					type: types.FETCH_SUCCESS,
					payload: data,
				});
			} catch (e) {
				console.log(e);
				dispatch({ type: types.FETCH_ERROR });
			}
		};
		fetchData();
	}, [url]);

	return state;
};
