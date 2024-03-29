import { create } from "zustand";

//type thirdPlacesKey = 0 | 1 | 2 | 3 | 4 | 5

type RoundOf16Key = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'D1' | 'D2' | 'E1' | 'E2' | 'F1' | 'F2' | 'T1' | 'T2' | 'T3' | 'T4';


interface EuroStoreInterface {
    thirdPlaces:(string)[]
    roundOf16:{
        [key in RoundOf16Key]: string | undefined;
    }
    quarterFinals:any
    semiFinals:any
    final:any
}

export const useEuroStore = create<EuroStoreInterface>(() =>({
    thirdPlaces:[],
    roundOf16:{
        A1:undefined,
        A2:undefined,
        B1:undefined,
        B2:undefined,
        C1:undefined,
        C2:undefined,
        D1:undefined,
        D2:undefined,
        E1:undefined,
        E2:undefined,
        F1:undefined,
        F2:undefined,
        T1:undefined,
        T2:undefined,
        T3:undefined,
        T4:undefined
    },
    quarterFinals:undefined,
    semiFinals:undefined,
    final:undefined
}))

export const addThirdPlaces = (value:string) => useEuroStore.setState(state => ({thirdPlaces:[...state.thirdPlaces, value]}))

export const removeThirdPlaces = (value:string) => useEuroStore.setState(state => ({thirdPlaces:state.thirdPlaces.filter(x => x !== value)}))

export const setRoundOf16 = (key:RoundOf16Key, value:string) => useEuroStore.setState(state => ({roundOf16:{...state.roundOf16, [key]:value}}))