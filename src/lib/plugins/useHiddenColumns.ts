import type { UseTablePlugin } from '$lib/types/UseTablePlugin';
import { derived, writable, type Writable } from 'svelte/store';

/**
 * `PluginState` will be exposed to the user as controls for the plugin.
 * `PluginState` should be `Writable` or contain `Writable`s.
 */
export interface HiddenColumnsState {
	hiddenColumnIds: Writable<Array<string>>;
}

/**
 * `PluginPropSet` describes data passed into each table component.
 */
export interface HiddenColumnsPropSet {
	'thead.tr': never;
	'thead.tr.th': {
		hidden: boolean;
	};
	'tbody.tr': never;
	'tbody.tr.td': never;
}

export const useHiddenColumns = <Item>(): UseTablePlugin<
	Item,
	HiddenColumnsState,
	HiddenColumnsPropSet
> => {
	const hiddenColumnIds = writable<Array<string>>([]);

	const pluginState: HiddenColumnsState = { hiddenColumnIds };

	const visibleColumnIdsFn = derived(hiddenColumnIds, ($hiddenColumnIds) => {
		return (ids: Array<string>) => {
			return ids.filter((id) => !$hiddenColumnIds.includes(id));
		};
	});

	return {
		pluginState,
		visibleColumnIdsFn,
	};
};
