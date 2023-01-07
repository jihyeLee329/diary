export default function Item({item, idx}){
  return(
    <div key={idx} className="item">
      <p className="title">{item.title}</p>
      <div className="content">{item.content}</div>
      <div className="emotion">감정 점수 : {item.emotion}</div>
    </div>
  )
}