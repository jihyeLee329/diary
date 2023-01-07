import { useState } from "react"
import styled from "styled-components"
import Item from "./Item"

const ListWrapper = styled.div`
  max-width: 500px;
  margin:0 auto;
  .item{ 
    background-color:rgba(0,0,0,0.2);
    padding:15px; 
    box-sizing:border-box;
    margin-bottom:10px;
    .title{font-weight:bold;}
    .content{background-color:#fff; padding:10px; box-sizing:border-box; min-height:100px;}
    .emotion{margin-top:10px; text-align:right;}
  }
`


export default function List({list}){
  return(
    <ListWrapper>
      <h2>일기 리스트</h2>
      {list.map((i, idx) => (
        <Item item={i} key={idx}/>
      ))}
    </ListWrapper>

  )
}