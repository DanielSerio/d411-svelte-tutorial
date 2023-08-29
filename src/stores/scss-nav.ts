import createStorageStore from '$lib/utility/store/create-storage-store';

export interface SubNavStore {
	y: number;
	stops: App.ProgressStops[];
}

const scssNavStoreObject = createStorageStore<SubNavStore>({
	storage: {
		type: 'session',
		key: 'scss-nav'
	},
	defaultValue: { y: 0, stops: [] }
});

export const { store: scssNavStore } = scssNavStoreObject;
