import { TypedUseSelectorHook, useSelector } from 'react-redux';
import {RootState} from "@/shared/types/type.ts";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;