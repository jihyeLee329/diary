
import React, { useState } from 'react';
import styled from 'styled-components';
const EditorForm = styled.div`
  max-width:800px;
  width:100%;
  margin:0 auto;
  text-align: center;
  .textForm input{ 
    display:block;
    width:100%; 
    padding:5px 10px; 
    box-sizing:border-box;
    height:45px;
  }
  .contentForm{margin-top:30px;}
  .contentForm textarea{
    width:100%;
    max-width:100%;
    min-width:100%;
    height:300px;
    box-sizing:border-box;
  }
  select{
    width:500px;
    height:45px;
    padding:5px 10px;
    box-sizing:bordr-box;
  }
  .submitBtn{
    margin-top:50px;
    width:500px;
    height:45px; 
    padding:15px; 
    box-sizing:border-box;
  }
  `;


function Editor({newDiary}){
  const [data, setData] = useState({
    title: "",
    content: "",
    emotion: 1,
  })

  function handleText(e){
    setData({
      ...data, 
      [e.currentTarget.name] : e.currentTarget.name === 'emotion' ? Number(e.currentTarget.value) : e.currentTarget.value,
    })
  }

  function submit(){
    console.log(data)
    newDiary(data)
    setData({
      title: "",
      content: "",
      emotion: 1,
    })
  }

  return(
    <EditorForm>
      <h2>오늘의 일기</h2>
      <div className='textForm'>
        <input type="text" name="title" placeholder="제목" 
        value={data.title} onChange={handleText}/>
      </div>
      <div className='contentForm'>
        <textarea name="content" value={data.content} onChange={handleText}/>
      </div>
      <div className='selectForm'>
        <select name="emotion" value={data.emotion} onChange={handleText}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <button className='submitBtn' onClick={submit}>
        작성하기
      </button>
    </EditorForm>
  )

}

export default React.memo(Editor);