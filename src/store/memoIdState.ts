import { atom } from 'recoil';

export const memoIdState = atom<string[]>({
	key: 'memoIdState',
	default: [],
});
