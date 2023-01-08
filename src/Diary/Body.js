import React, { useEffect, useRef, useState } from 'react';
import Editor from './Editor';
import List from './List';
const Body = () => {
  
  const [item, setItem] = useState([])
  const diaryId = useRef(0);
  const getData = async()=>{
    const res = await fetch(
      'https://jsonplaceholder.typicode.com/comments'
    ).then((res)=> res.json());
  
    const initData = res.slice(0,20).map(it => {
      return{
        title : it.email, 
        content: it.body,
        emotion: Math.floor(Math.random()*5 ) + 1,
        creted_date : new Date().getTime(),
        id: diaryId.current +=1,
      }
    })
    setItem(initData)
  }
  useEffect(()=>{
    getData();
  },[])
   
  const newDiary = ({title, content, emotion}) =>{
    const newItem = {
      title,
      content,
      emotion,
      id: diaryId.current
    }
    setItem(()=>[newItem, ...item])
    diaryId.current +=1 ; 
  }

  const deleteDiary = (deleteId) => { 
    console.log(deleteId)
    console.log(item.filter(it => it.id !== deleteId))
    // setItem((prev)=> {
    //   prev.filter(it => it.id !== deleteId)
    // })
    //id = 전달받은 클릭한 아이템의 id 
    //data = 기존의 아이템 리스트. 
    //차례씩 돌면서 data.id == targetId 같지않은것만 필터링해서, 기존에 it 셋팅해라 ~~~  

    // setItem((data)=> {
    //   console.log(data)
    //     data.filter(it => it.id !== id )})
  }

  const editDiary = (id) => { 
    
  }
  return (
    <div>
      <Editor newDiary={newDiary}/>
      <List list={item} deleteDiary={deleteDiary} editDiary={editDiary}/>
    </div>
  )
}

export default React.memo(Body);