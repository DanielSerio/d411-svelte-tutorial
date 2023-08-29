import createStorageStore from '$lib/utility/store/create-storage-store';

export interface SubNavStore {
	y: number;
	stops: App.ProgressStops[];
}

const javascriptNavStoreObject = createStorageStore<SubNavStore>({
	storage: {
		type: 'session',
		key: 'js-nav'
	},
	defaultValue: { y: 0, stops: [] }
});

export const { store: javascriptNavStore } = javascriptNavStoreObject;
