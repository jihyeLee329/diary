import React from 'react'

function Item({item, deleteDiary, editDiary}){
  function deleteD(){
    console.log(item.id)
    deleteDiary(item.id)
  }
  function editD(){
    editDiary(item.id)
  }
 
  return(
    <div className="item">
      <p className="title">{item.title}</p>
      <div className="content">{item.content}</div>
      <div className="emotion">감정 점수 : {item.emotion}</div>
      <div>
        <button onClick={editD}>수정</button>
        <button onClick={deleteD}>삭제</button>
      </div>
    </div>
  )
}
export default React.memo(Item)