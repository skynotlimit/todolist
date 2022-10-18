
import './App.css';
import {useState} from 'react';

function Home(props){
  return <header>
    <h1><a href='/' onClick={(event)=>{
      event.preventDefault();
      props.onChange();
    }}>{props.title}</a></h1>
</header>}

function Nav(props){ 
  const list = []
  for(let i=0;i<props.topics.length;i++){
    let topic = props.topics[i];
    list.push(<li key={topic.id}>
      <input type="checkbox"/> <a id={topic.id}href={'/today/'+topic.id} onClick={(event)=>{
        event.preventDefault();
        props.onChange(+ event.target.id);
      }}>{topic.title}</a>
      </li>)
  }
  return <nav>
    <ol>
      {list}
    </ol>
  </nav>
}
function Article(props){
  return <article>
    <h2>{props.title}</h2>
    {props.body}
  </article>
}
function Create(props){
  return <div>
    <h2>New List</h2>
    <form onSubmit={event=>{
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onCreate(title, body)
    }}>
      <p><input type ='text' name="title" placeholder='Title'/></p>
      <p><textarea name='body' placeholder='Time & content'></textarea></p>
      <p><input type='submit' value='Make a list'></input></p>
    </form>
  </div>
}
function Update(props){
  const [title, setTitle]=useState(props.title);
  const [body, setBody]=useState(props.body);
  return <div>
  <h2>Change your Schedule</h2>
  <form onSubmit={event=>{
    event.preventDefault();
    const title = event.target.title.value;
    const body = event.target.body.value;
    props.onUpdate(title, body)
  }}>
    <p><input type ='text' name="title" value={title} onChange={(event)=>{
      setTitle(event.target.value);
    }}/></p>
    <p><textarea name='body' value={body} onChange={(event)=>{
      setBody(event.target.value);
    }}></textarea></p>
    <p><input type='submit' value='Change your list'></input></p>
  </form>
</div>
}

function App() {
  const [mode, setMode]=useState('HOME');
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4)
  const [topics,setTopics] = useState([
    {id:1, title:'study React', body:'1-3pm'},
    {id:2, title:'exercise-walk', body:'3-4pm'},
    {id:3, title:'Watch Movie', body:'7-9pm'}
  ])
  let content = null;
  let control = null;
  if(mode === 'HOME'){
    content = <Article title="You're the BEST around!"><img src='./sox.jpg'/></Article>
    
  }else if(mode === 'READ'){
    let title, body =null;
    for(let i=0;i<topics.length;i++){
      if(topics[i].id === id){
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content =  <Article title={title} body={body}></Article>
    control =  <><p><a href={'/update'+id} onClick={(event)=>{
        event.preventDefault();
        setMode('UPDATE')
    }}>Change</a></p>
    <p><input type="button" value="Delete" onClick={()=>{
      alert("Delete this Schedule.")
      const newTopics=[];
      for(let i=0;i<topics.length;i++){
        if(topics[i].id !== id){
          newTopics.push(topics[i]);
          setMode("HOME")
        }
      }
      setTopics(newTopics)
    }}/></p>
    </> 
  }else if(mode === 'MAKE'){
    content = <Create onCreate={(_title, _body)=>{
      const newTopic = {id:nextId, title:_title, body:_body}
      let newTopics = [...topics];
      newTopics.push(newTopic);

      setTopics(newTopics);
      setMode('READ');
      setId(nextId);
      setNextId(nextId++);
    }}></Create>
  }else if(mode === 'UPDATE'){
    let title, body =null;
    for(let i=0;i<topics.length;i++){
      if(topics[i].id === id){
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Update title={title} body={body} onUpdate={(_title, _body)=>{
      let newTopics = [...topics]  
      const updated = {id:id, title:_title, body:_body}
      for(let i=0;i<newTopics.length;i++){
        if(newTopics[i].id === id){
          newTopics[i] = updated;
          break;
        }
      }
      setTopics(newTopics);
      setMode('READ');
    }}></Update>
  }
  return (
    <div >
      <Home className='page' title="Stack up Today" onChange={()=>{
        alert("Today's list")
        setMode('HOME')
      }}></Home>
      <Nav topics={topics} onChange={(_id)=>{
        
        setMode('READ');
        setId(_id);
      }}></Nav>
      {content}
      <p><a href='/list' onClick={(event)=>{
        event.preventDefault();
        setMode('MAKE')
      }}>New list</a></p>
      {control}
    </div>
  );
}

export default App;
