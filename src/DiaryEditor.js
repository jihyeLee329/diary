import { useContext, useRef, useState } from "react"
import React from 'react'
import { DiaryDispatchContext } from "./App";

const DiaryEditor = () => {

  const {onCreate} = useContext(DiaryDispatchContext)
  const authorInput = useRef();
  const contentInput = useRef()
  const [state, setState] = useState({
    author:"",
    content:"",
    emotion: 1,
  })
  function handleChangeState(e){
    setState({
      ...state,
      [e.target.name]: e.target.value,
    })
  }
  
  function handleSubmit(){
    if(state.author.length <1){
      authorInput.current.focus();
    }
    if(state.content.length <1){
      contentInput.current.focus();
    }
    onCreate(state.author, state.content, state.emotion)
    setState({
      author:"",
      content:"",
      emotion: 1,
    })
  }
  return (
    <div className="DiaryEditor">
      <h2>오늘의 일기</h2>
      <div>
        <input name="author" type="text" 
          ref={authorInput}
          value={state.author} 
          onChange={handleChangeState}
        />
      </div>
      <div>
        <textarea name="content"
          ref={contentInput}
          value={state.content} 
          onChange={handleChangeState}/>
      </div>
      <div>
        <select name="emotion" value={state.emotion} onChange={handleChangeState}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <div>
        <button onClick={handleSubmit}>일기 저장하기</button>
      </div>
    </div>
  )
}
export default React.memo(DiaryEditor); 