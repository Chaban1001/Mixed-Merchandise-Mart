import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { store } from '@/store/store';

type RootState = ReturnType<typeof store.getState>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
