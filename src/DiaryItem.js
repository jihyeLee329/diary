import React, { useEffect, useRef, useState } from "react"

const DiaryItem = ({
  author, emotion, created_date, content, id, 
  onRemove, onEdit
}) => {
  useEffect(()=>{ console.log(`${id} 번째 렌더`)})
  const [isEdit, setIsEdit] = useState(false)
  const [localContent, setLocalContent] = useState(content)
  const textArea = useRef();

  const handleRemove = ()=>{
    if(window.confirm(`${id}번 일기를 정말 삭제하시겠습니까?`)){
      onRemove(id)
    }
  }

  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalContent(content)
  }

  const handleEdit = () => {
    if(localContent.length < 5){
      alert('5글자 이상 작성하세요');
      textArea.current.focus();
      return
    }
    if(window.confirm(`${id}번 일기를 수정하시겠습니까?`)){
      onEdit(id, localContent)
      toggleIsEdit()
    }
  }
  const toggleIsEdit = () => {setIsEdit(!isEdit)}
  return(
    <div className="DiaryItem">
      <div className="info">
        <span>작성자 : {author} | 감정 점수 : {emotion}</span>
        <br/>
        <span className="date">{new Date(created_date).toLocaleString()}</span>
      </div>
      <div className="content">
        {isEdit ? 
          <>
            <textarea ref={textArea} value={localContent} onChange={(e) => setLocalContent(e.target.value)}/>
          </> : 
          <>{content}</>
        }
      </div>
      {isEdit ? <>
        <button onClick={handleQuitEdit}>수정 취소</button>
        <button onClick={handleEdit}>수정 완료</button>
      </>:
      <>
        <button onClick={handleRemove}>삭제하기</button>
        <button onClick={toggleIsEdit}>수정하기</button>
      </>}
    </div>
  )
}

export default React.memo(DiaryItem)