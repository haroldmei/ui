import { State } from 'types/State';

// Copied from '@octokit/rest'
export interface Knot {
  id: string;
  states: State[];
}
