import DiaryItem from "./DiaryItem"

export default function DiaryList({diaryList, onRemove, onEdit}){
  return(
    <div className="DiaryList">
      <h2>일기 리스트</h2>
      <h4>{diaryList.length}</h4>
      <div className="list">
        {diaryList?.map((list) => (
          <DiaryItem {...list} key={list.id} onRemove={onRemove} onEdit={onEdit}/>
        ))}
      </div>
    </div>
  )
}

DiaryList.defaultProps={
  diaryList:[]
}