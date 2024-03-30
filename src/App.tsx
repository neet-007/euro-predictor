import React, { ComponentProps, useEffect, useState } from "react"
import { useEuroStore, setRoundOf16, addThirdPlaces, ROUNDOF16MATCHES, RoundOf16Key, setQuarterFinal, QuarterFinalsKey, semiFinalsKey, FinalKey, setSemiFinal, setFinal, QUARTERFINALSMATCHES, SEMIFINALSMATCHES, FINALMATCHES, EuroStoreInterface, setWinner } from "./store"

interface GroupCardProps extends ComponentProps<'article'>{
  group:string[]
  groupName?:'A' | 'B' | 'C' | 'D' | 'E' | 'F',
}

const GroupCard:React.FC<GroupCardProps> = ({group, groupName}) => {
  const [oldGroup, setOldGroup] = useState<string[]>(group)
  const [orderdGrouo, setOrderdGroup] = useState<string[]>(['', '', '', ''])
  const [lastChosen, setLastChose] = useState<number>(0)

  useEffect(() => {
    setRoundOf16(`${groupName!}1`, orderdGrouo[0])
    setRoundOf16(`${groupName!}2`, orderdGrouo[1])
    if(orderdGrouo[2]){
      addThirdPlaces(orderdGrouo[2])
    }
  },[oldGroup])

  function choose(nation:string){
    if(oldGroup.length === 0) return
    setOrderdGroup(prev => {
      prev[lastChosen] = nation
      if(lastChosen === 2){
        prev[3] = oldGroup.find(x => x!== nation)!
      }
      return [...prev]
    })
    setLastChose(prev => {
      if(prev === 3) return 3
      return prev + 1
    })
    setOldGroup(prev => {
      if(lastChosen === 2) return prev.splice(0, -1)
      return prev.filter(x => x !== nation)}
      )
  }

  return(
    <div>
      <div className=" flex gap-2">
        {group.map(nation => {
          return <button key={`button-${nation}`} disabled={orderdGrouo.includes(nation)} onClick={() => choose(nation)}>{nation}</button>
        })}
      </div>
      <div className=" flex flex-col gap-2">
        {orderdGrouo.map((nation, index) => {
          return <div key={index + 1} className=" bg-slate-400 h-[2rem]">{nation ? nation: lastChosen === index ? `chose your ${index + 1} team`: ''}</div>
        })}
      </div>
    </div>
  )
}

interface ThirdPlacesProps extends ComponentProps<'article'>{
}

const ThirdPlaces:React.FC<ThirdPlacesProps> = () => {
  const oldGroup = useEuroStore(state => state.thirdPlaces)
  const [orderdGrouo, setOrderdGroup] = useState<string[]>(['', '', '', '', '', ''])
  const [lastChosen, setLastChose] = useState<number>(0)

  useEffect(() => {
    if(lastChosen === 4){
      for(let i = 0; i < 4; i++){
        const key = `T${i + 1}` as RoundOf16Key
        setRoundOf16(key, orderdGrouo[i])
      }
    }
  },[lastChosen])

  function choose(nation:string){
    if(oldGroup.length === 0) return
    setOrderdGroup(prev => {
      prev[lastChosen] = nation
      if(lastChosen === 4 && oldGroup.length === 6){
          console.log(prev)
          console.log(oldGroup.find(x => !prev.includes(x)))
        prev[5] = oldGroup.find(x => !prev.includes(x))!
      }
      return [...prev]
    })
    setLastChose(prev => {
      if(prev === 5) return 5
      return prev + 1
    })
  }

  return(
    <div>
      <div className=" flex gap-2">
        {oldGroup.map(nation => {
          return <button key={`button-${nation}`} disabled={orderdGrouo.includes(nation)} onClick={() => choose(nation)}>{nation}</button>
        })}
      </div>
      <div className=" flex flex-col gap-2">
        {orderdGrouo.map((nation, index) => {
          return <div key={index + 1} className=" bg-slate-400 h-[2rem]">{nation ? nation: lastChosen === index ? `chose your ${index + 1} team`: ''}</div>
        })}
      </div>
    </div>
  )
}

interface KnockOutProps extends ComponentProps<'article'>{
  round: 'Q' | 'S' | 'F' | 'W'
  MATCHES: typeof ROUNDOF16MATCHES | typeof QUARTERFINALSMATCHES | typeof SEMIFINALSMATCHES | typeof FINALMATCHES
  roundGroup: any
}

const KnockOut:React.FC<KnockOutProps> = ({round, MATCHES, roundGroup}) => {
  const roundOf16 = useEuroStore(store => store.roundOf16)

  function quailfy(index:any, value:any){
    if(round === 'Q'){
      let key = '' as QuarterFinalsKey;
      if(index === 'A1' || index === 'C1') key = 'Q1'
      else if(index === 'A2' || index === 'B2')key = 'Q2'
      else if(index === 'B1' || index === 'T1')key = 'Q3'
      else if(index === 'C2' || index === 'T4')key = 'Q4'
      else if(index === 'F1' || index === 'T3')key = 'Q5'
      else if(index === 'D2' || index === 'E2')key = 'Q6'
      else if(index === 'E1' || index === 'T2')key = 'Q7'
      else if(index === 'D1' || index === 'F2')key = 'Q8'
      setQuarterFinal(key, value)
    }
   if(round === 'S'){
    let key = '' as semiFinalsKey
    if(index === 'Q1' || index === 'Q3') key = 'S1'
    else if(index === 'Q2' || index === 'Q4') key = 'S2'
    else if(index === 'Q5' || index === 'Q6') key = 'S3'
    else if(index === 'Q7' || index === 'Q8') key = 'S4'
    setSemiFinal(key, value)
   }
   if(round === 'F'){
    let key = '' as FinalKey
    if(index === 'S1' || index === 'S2') key = 'F1'
    else if(index === 'S3' || index === 'S4') key = 'F2'
    setFinal(key, value)
   }
   if(round === 'W'){
    setWinner(value)
   }
  }

  return (
    <>
    {Object.keys(MATCHES).map((team) => {
      return <div className=" flex gap-4">
              <button className=" bg-red-400 h-[2rem]" onClick={() => quailfy(team, roundGroup[team])}>
              {roundGroup[team]}
              </button>
              <button className=" bg-red-400 h-[2rem]" onClick={() => quailfy(MATCHES[team], roundGroup[MATCHES[team]])}>
              {roundGroup[MATCHES[team]]}
              </button>
             </div>
    })}
    </>
  )
}

function App() {
  const A = ['Germany', 'Scotland', 'Hungary', 'Switzerland']
  const B = ['Spain', 'Croatia', 'Italy', 'Albania']
  const C = ['Slovenia', 'Denmark', 'Serbia', 'England']
  const D = ['Poland', 'Netherlands', 'Austria', 'France']
  const E = ['Belgium', 'Slovakia', 'Romania', 'Ukraine']
  const F = ['Turkey', 'Georgia', 'Portugal', 'Czech']

  const roundOf16 = useEuroStore(store => store.roundOf16)
  const quarterFinals = useEuroStore(store => store.quarterFinals)
  const semiFinal = useEuroStore(store => store.semiFinals)
  const final = useEuroStore(store => store.final)
  const winner = useEuroStore(store => store.winner)
  console.log(final)

  function swapTeams(fromIndex:number, toIndex:number, setFunction:React.Dispatch<React.SetStateAction<string[]>>){
    setFunction(prev =>{
      const temp = prev[fromIndex]
      prev[fromIndex] = prev[toIndex]
      prev[toIndex] = temp

      return [...prev]
    })
  }

  return (
    <div className=" flex flex-col gap-4">
      <GroupCard group={A} groupName="A" />
      <GroupCard group={B} groupName="B" />
      <GroupCard group={C} groupName="C" />
      <GroupCard group={D} groupName="D" />
      <GroupCard group={E} groupName="E" />
      <GroupCard group={F} groupName="F" />
      <ThirdPlaces/>
      <KnockOut round="Q" MATCHES={ROUNDOF16MATCHES} roundGroup={roundOf16}/>
      <KnockOut round="S" MATCHES={QUARTERFINALSMATCHES} roundGroup={quarterFinals}/>
      <KnockOut round="F" MATCHES={SEMIFINALSMATCHES} roundGroup={semiFinal}/>
      <KnockOut round="W" MATCHES={FINALMATCHES} roundGroup={final}/>
      <div>
        {winner}
      </div>
    </div>
  )
}

export default App
