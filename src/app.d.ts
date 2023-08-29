// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}

		interface NavigationProgressSubStop {
			name: string;
			id: string;
			icon: string;
		}

		interface ProgressStop extends NavigationProgressSubStop {
			y: number;
		}

		interface ProgressStops extends NavigationProgressSubStop {
			y: number;
			subStops?: ProgressStop[];
		}

		interface NavigationProgressStop extends NavigationProgressSubStop {
			subStops?: NavigationProgressSubStop[];
		}
	}
}

export {};
