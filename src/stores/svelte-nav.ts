import createStorageStore from '$lib/utility/store/create-storage-store';

export interface SubNavStore {
	y: number;
	stops: App.ProgressStops[];
}

const svelteNavStoreObject = createStorageStore<SubNavStore>({
	storage: {
		type: 'session',
		key: 'sv-nav'
	},
	defaultValue: { y: 0, stops: [] }
});

export const { store: svelteNavStore } = svelteNavStoreObject;
