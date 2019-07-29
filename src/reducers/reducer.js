import { ADD_FEATURE } from './actions';
import { REMOVE_FEATURE } from './actions';
import { STATUS_CODES } from 'http';

const initial = {
	additionalPrice : 0,
	car             : {
		price    : 26395,
		name     : '2019 Ford Mustang',
		image    : 'https://cdn.motor1.com/images/mgl/0AN2V/s1/2019-ford-mustang-bullitt.jpg',
		features : [],
	},
	store           : [
		{ id: 1, name: 'V-6 engine', price: 1500 },
		{ id: 2, name: 'Racing detail package', price: 1500 },
		{ id: 3, name: 'Premium sound system', price: 500 },
		{ id: 4, name: 'Rear spoiler', price: 250 },
	],
};

export const reducer = (state = initial, { type, payload }) => {
	switch (type) {
		case ADD_FEATURE: {
			return {
				...state,
				car   : {
					...state.car,
					features : [ ...state.car.features, payload ],
					price    : state.car.price + payload.price,
				},
				store : state.store.filter(f => f.id !== payload.id),
				//This line makes you only able to buy an item once.
			};
		}
		case REMOVE_FEATURE: {
			return {
				...state,
				car   : {
					...state.car,
					features : state.car.features.filter(feature => {
						return feature.id !== payload.id;
					}),
					price    : state.car.price - payload.price,
				},
				store : [ ...state.store, payload ],
				//This line makes you only able to buy an item once.
			};
		}
		default:
			return state;
	}
};
