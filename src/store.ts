import { create } from "zustand";

//type thirdPlacesKey = 0 | 1 | 2 | 3 | 4 | 5

export type RoundOf16Key = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'D1' | 'D2' | 'E1' | 'E2' | 'F1' | 'F2' | 'T1' | 'T2' | 'T3' | 'T4';

export type QuarterFinalsKey = 'Q1' | 'Q2' | 'Q3' | 'Q4' | 'Q5' | 'Q6' | 'Q7' | 'Q8'

export type semiFinalsKey = 'S1' | 'S2' | 'S3' | 'S4'

export type FinalKey = 'F1' | 'F2'

export interface EuroStoreInterface {
    thirdPlaces:(string)[]
    roundOf16:{
        [key in RoundOf16Key]: string | undefined;
    }
    quarterFinals:{
        [key in QuarterFinalsKey]:string | undefined
    }
    semiFinals:{
        [key in semiFinalsKey]:string | undefined
    }
    final:{
        [key in FinalKey]:string | undefined
    }
    winner:string | undefined
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
    quarterFinals:{
        Q1:undefined,
        Q2:undefined,
        Q3:undefined,
        Q4:undefined,
        Q5:undefined,
        Q6:undefined,
        Q7:undefined,
        Q8:undefined,
    },
    semiFinals:{
        S1:undefined,
        S2:undefined,
        S3:undefined,
        S4:undefined
    },
    final:{
        F1:undefined,
        F2:undefined
    },
    winner:undefined
}))

export const addThirdPlaces = (value:string) => useEuroStore.setState(state => ({thirdPlaces:[...state.thirdPlaces, value]}))

export const removeThirdPlaces = (value:string) => useEuroStore.setState(state => ({thirdPlaces:state.thirdPlaces.filter(x => x !== value)}))

export const setRoundOf16 = (key:RoundOf16Key, value:string) => useEuroStore.setState(state => ({roundOf16:{...state.roundOf16, [key]:value}}))

export const setQuarterFinal = (key:QuarterFinalsKey, value:string) => useEuroStore.setState(state => ({quarterFinals:{...state.quarterFinals, [key]:value}}))

export const setSemiFinal = (key:semiFinalsKey, value:string) => useEuroStore.setState(state => ({semiFinals:{...state.semiFinals, [key]:value}}))

export const setFinal = (key:FinalKey, value:string) => useEuroStore.setState(state => ({final:{...state.final, [key]:value}}))

export const setWinner = (value:string) => useEuroStore.setState(()=> ({winner:value}))

export const ROUNDOF16MATCHES = {
    A1:'C1',
    A2:'B2',
    B1:'T1',
    C2:'T4',
    F1:'T3',
    D2:'E2',
    E1:'T2',
    D1:'F2',
}

export const QUARTERFINALSMATCHES = {
    Q1:'Q3',
    Q2:'Q4',
    Q5:'Q6',
    Q7:'Q8',
}

export const SEMIFINALSMATCHES = {
    S1:'S2',
    S3:'S4',
}

export const FINALMATCHES = {
    F1:'F2'
}