import { operation } from "../utils";

const initState = {
    value: ""
}

export const display = (state = initState, action) => {

    const {value} = action;
    
    switch(action.type) {
        case 'DISPLAY':
            return {
                ...state,
                value: `${state?.value}${value}`
            }
        case 'C':
            return {
                ...state,
                value: `${value}`
            }
        case 'CE':
            return {
                ...state,
                value
            }
        case 'EQUAL':
            try {
                return {
                    ...state,
                    value: operation(value)
                }
            } catch (error) {
                return {
                    ...state,
                    value: value
                }
            }
        default:
            return state;
    }
}