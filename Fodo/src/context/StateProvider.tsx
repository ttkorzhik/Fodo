import {createContext, FC, ReactNode, useContext, useReducer} from "react";
import {initialState, StateProps } from "./initialState";
import {Reducer} from "redux";

interface StateProviderProps {
    reducer: Reducer
    initialState: StateProps
    children: ReactNode
}
export const StateContext = createContext<any>(initialState);

export const StateProvider:FC<StateProviderProps> = ({reducer, initialState, children}) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);