import createStorageStore from '$lib/utility/store/create-storage-store';

export interface NavState {
	isExpanded: boolean;
}

export interface NavMethods {
	toggleNav: () => void;
	closeNav: () => void;
}

const navStoreObject = createStorageStore<NavState, NavMethods>({
	storage: {
		key: 'nav',
		type: 'session'
	},
	getMethods: (store) => {
		const toggleNav = () =>
			store.update((v) => {
				if (v === 'LOADING') return v;
				if (v.isExpanded) {
					return { isExpanded: false };
				}
				return { isExpanded: true };
			});

		const closeNav = () =>
			store.update((v) => {
				if (v === 'LOADING') return v;
				return { isExpanded: false };
			});

		return {
			toggleNav,
			closeNav
		};
	},
	defaultValue: { isExpanded: false }
});

// rename via destruction on export
export const {
	store: navStore,
	methods: { toggleNav, closeNav }
} = navStoreObject;
