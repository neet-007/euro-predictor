import React, { ComponentProps, useEffect, useState } from "react"
import { useEuroStore, setRoundOf16, addThirdPlaces } from "./store"

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
      if(prev === 2) return 3
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

  function choose(nation:string){
    if(oldGroup.length === 0) return
    setOrderdGroup(prev => {
      prev[lastChosen] = nation
      if(lastChosen === 4){
        prev[5] = oldGroup.find(x => x!== nation)!
      }
      return [...prev]
    })
    setLastChose(prev => {
      if(prev === 4) return 4
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

function App() {
  const [A, setA] = useState<string[]>(['Germany', 'Scotland', 'Hungary', 'Switzerland'])
  const [B, setB] = useState<string[]>(['Spain', 'Croatia', 'Italy', 'Albania'])
  const [C, setC] = useState<string[]>(['Slovenia', 'Denmark', 'Serbia', 'England'])
  const [D, setD] = useState<string[]>(['Poland', 'Netherlands', 'Austria', 'France'])
  const [E, setE] = useState<string[]>(['Belgium', 'Slovakia', 'Romania', 'Ukraine'])
  const [F, setF] = useState<string[]>(['Turkey', 'Georgia', 'Portugal', 'Czech'])

  const thirdPlaces = useEuroStore(store => store.thirdPlaces)

  console.log(useEuroStore(store => store.thirdPlaces))
  console.log(useEuroStore(store => store.roundOf16))

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
    </div>
  )
}

export default App
