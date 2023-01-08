import React, { useEffect, useRef, useMemo, useCallback, useReducer } from 'react';
import './App.css';
import Body from './Diary/Body';
// import Editor from './Diary/Editor';
// import List from './Diary/List';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

const reducer = (state, action) => {
//state : 상태 변화가 일어나기 직전의 최신 state
//action : 어떤 상태변화를 일으켜야하는지 정보 
  switch(action.type){
    case 'INIT' : {
      return action.data
    }
    case 'CREATE' : {
      const create_date = new Date().getTime();
      const newItem = {
          ...action.data,
          create_date
      }
      return [newItem, ...state];
    }
    case 'REMOVE' :{
      return state.filter(it=> it.id !== action.targetId);
    }
    case 'EDIT' :{
      // edit dispatch 함수가 실행되면, action 으로 targetId 랑 newContent 가 전달되었다. 
      // 기존의 state에서 map 함수를 실행해서, action으로 전달받은 targetId 랑 일치하면, 
      // 기존 각각의 it 에서 content만 새로운 content로 수정하고, 아니면 기존 it 그대로 전달.
      return state.map(it=> it.id === action.targetId ? 
        {...it, content:action.newContent} : it)
    }
    default: 
      return state;
  }
}

// data = diaryState 공급용 context
export const DiaryStateCotext = React.createContext();
// dispatch 공급용 context
export const DiaryDispatchContext = React.createContext();
function App() {
  const dataId = useRef(0)
  // const [data, setData] = useState([])
  const [data, dispatch] = useReducer(reducer, [])

  const getData = async() => {
    const res = await fetch(
      'https://jsonplaceholder.typicode.com/comments')
    .then((res) => res.json())


    const initData = res.slice(0,20).map(it =>{
      return {
        author:it.email,
        content:it.body,
        emotion: Math.floor(Math.random() * 5) +1,
        create_date: new Date().getTime(),
        id: dataId.current++ 
      }
    })

    dispatch({type : "INIT", data: initData})
    // setData(initData)
  };
  useEffect(()=>{
    getData()
    // console.log(data)
  },[])

  const onCreate = useCallback(
    (author, content, emotion) => {
      dispatch({
        type:'CREATE', 
        data:{ author, content, emotion, id: dataId.current
      }})
        dataId.current += 1;
      // const created_date = new Date().getTime()
      // const newItem ={
      //   author,
      //   content,
      //   emotion,
      //   created_date,
      //   id: dataId.current
      // }
  
      // setData((data)=>[newItem, ...data])
    },
    //첫번째 인자 : 일기작성하기 누르면 호출되는 함수. 새로운 다이어리가 추가되는 로직. 
    []
  )

  const onRemove = useCallback((targetId) =>{
    dispatch({type : 'REMOVE', targetId})
    // setData(data => data.filter((it)=> it.id !== targetId))
  }, [])

  const onEdit = useCallback((targetId, newContent) =>{
    dispatch({type: 'EDIT', targetId, newContent})
    // setData(
    //   data => 
    //   data.map((it) => it.id === targetId ? 
    //     {...it, content:newContent} : 
    //     it
    //   )
    // )
  }, [])

  const memoizedDispatches = useMemo(()=> {
    return {onCreate, onRemove, onEdit}
  }, [])

  //useMemo로 감싸버리면 useMemo 안에 있는 함수가 실행되고, return 되는건 값이다 .
  //그래서 더이상 함수가 아니라 값임. 함수로 쓰면 안됨 
  const getDiaryAnalysis = useMemo(() => {
    const goodCount = data.filter(i => i.emotion >=3 ).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount/data.length) * 100;
    return {goodCount, badCount, goodRatio}
  }, [data.length]) //useEffect처럼 두번째 배열엔 뎁스 집어넣으면 됨 ~ 

  const {goodCount, badCount, goodRatio} = getDiaryAnalysis;


  return (
    <Body />
    // <DiaryStateCotext.Provider value={data}>
    //   <DiaryDispatchContext.Provider value={memoizedDispatches}>
    //     <div className="App">
    //       <DiaryEditor/>
    //       <div>전체 일기 : {data.length}</div>
    //       <div>기분 좋은 일기 개수 : {goodCount}</div>
    //       <div>기분 나쁜 일기 개수 : {badCount}</div>
    //       <div>기분 좋은 일기 비율 : {goodRatio}</div>
    //       <DiaryList/>
    //     </div>
    //   </DiaryDispatchContext.Provider>
    // </DiaryStateCotext.Provider>
  );
}

export default App;
