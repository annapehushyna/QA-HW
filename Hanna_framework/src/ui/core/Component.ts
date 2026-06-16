import { PageHolder } from './PageHolder';

/**
 * Abstract base for every reusable UI component.
 * Each component must be able to assert its own loaded/visible state.
 */
export abstract class Component extends PageHolder {
  abstract expectLoaded(): Promise<void>;
}
