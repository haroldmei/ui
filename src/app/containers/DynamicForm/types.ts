//import { State } from 'types/State';
import { Knot } from 'types/Knot';

/* --- STATE --- */
export interface DynamicFormState {
  id: string;
  loading: boolean;
  error?: KnotErrorType | null;
  knots: Knot[];
}

export enum KnotErrorType {
  RESPONSE_ERROR = 1,
  KNOT_NOT_FOUND = 2,
}

/* 
  If you want to use 'DynamicState' keyword everywhere in your feature folder, 
  instead of the 'HomePageState' keyword.
*/
export type DynamicState = DynamicFormState;
