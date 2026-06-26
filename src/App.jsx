// Mainから派生したmain-layoutです。
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import testImg from './assets/test.jpg'
import test2Img from './assets/test2.jpg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <figure className="figure">
      <h2 className="fig-h">コンテンツ見出し</h2>
      <section className="fig-contents">
        <figcaption className="figcap">
          ダミーテキストです。ダミーテキストです。ダミーテキストです。
          ダミーテキストです。ダミーテキストです。ダミーテキストです。
          ダミーテキストです。ダミーテキストです。ダミーテキストです。
          ダミーテキストです。ダミーテキストです。ダミーテキストです。
          ダミーテキストです。ダミーテキストです。ダミーテキストです。
          ダミーテキストです。ダミーテキストです。ダミーテキストです。
          ダミーテキストです。ダミーテキストです。ダミーテキストです。
        </figcaption>
        <img src="{test2Img}" alt="" className="img" />
      </section>
    </figure>
    

    </>
  )
}

export default App
