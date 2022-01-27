import './App.css';
import { useState, useEffect, useRef, forwardRef } from 'react'
import { gsap, Power0 } from 'gsap'

function App() {
  const [topPosition, setTopPositon] = useState([])
  const [text, setText] = useState('')
  const [listChat, setListChat] = useState([])

  const refChats = useRef([])

  const handleAddChat = () => {
    setTopPositon([...topPosition, `${Math.floor(Math.random() * 500)}`])
    setListChat([...listChat, text])
    setText('')
  }

  useEffect(() => {
    {
      refChats.current?.map((chatItem, index) => {
        var element = chatItem.getBoundingClientRect()
        gsap.to(chatItem, (width - element.left) / 200, { x: width, ease: Power0.easeNone })
      })
    }
  }, [listChat])

  function useWindowSize() {
    const [size, setSize] = useState([0, 0])
    useEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight])
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
  }

  const [width, height] = useWindowSize();

  let Chat = forwardRef((props, ref) => {
    return <div ref={ref}>{props.content}</div>
  });

  const onContentChange = (e) => {
    setText(e.target.value)
  }

  const handleOnKeyUp = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault()
      handleAddChat()
    }
  }

  return (
    <div className="App">
      <div className="box">
        {listChat?.map((chatItem, index) => {
          return (
            <div
              key={index}
              style={{ top: `${topPosition[index]}px` }}
              ref={e => refChats.current[index] = e}
              className="chatItem"
            >
              <Chat
                content={chatItem}
              />
            </div>
          )
        })}
      </div>

      <div className="">
        <input
          className='input'
          type='text'
          name='text'
          value={text}
          onChange={(e) => onContentChange(e)}
          onKeyUp={(e) => handleOnKeyUp(e)}
        />
        <button onClick={() => handleAddChat()} className="button">Chat</button>
      </div>
    </div >
  );
}

export default App;
