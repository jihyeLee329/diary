import { useContext } from "react"
import { DiaryStateCotext } from "./App"
import DiaryItem from "./DiaryItem"

export default function DiaryList(){
  const diaryList = useContext(DiaryStateCotext)
  return(
    <div className="DiaryList">
      <h2>일기 리스트</h2>
      <h4>{diaryList.length}</h4>
      <div className="list">
        {diaryList?.map((list) => (
          <DiaryItem {...list} key={list.id} />
        ))}
      </div>
    </div>
  )
}

DiaryList.defaultProps={
  diaryList:[]
}