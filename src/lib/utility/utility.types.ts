import type { Writable } from 'svelte/store';

// STORES are "LOADING" before window/localStorage/sessionStorage is available. more explicit than using null, and a bit easier to work with
export type StorageStoreValue<Type extends object> = 'LOADING' | Type;

export interface StorageStoreStorage {
	type?: 'session';
	key: string;
}

export interface StorageStoreConfig<Type extends object, MethodsType extends object = object> {
	storage: StorageStoreStorage;
	defaultValue: Type;
	onSubscribe?: (value: StorageStoreValue<Type>) => Promise<void>;
	getMethods?: (store: Writable<StorageStoreValue<Type>>) => MethodsType;
}

export interface StorageStore<Type extends object, MethodsType extends object = object> {
	store: Writable<StorageStoreValue<Type>>;
	methods: MethodsType;
}
