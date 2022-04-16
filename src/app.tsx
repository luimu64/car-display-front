import { ButtonGroup, TextField, Button } from "./components/inputs"
import { useState } from "preact/hooks"

export function App() {
  const [category, setCategory] = useState<number>(0);
  const [customText, setCustomText] = useState<string>('');

  const categories = [
    'time',
    'custom text'
  ]

  const sendCustomText = () => {
    fetch("http://192.168.1.51:3000/custom-text", {
      method: "post",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: customText })
    })
  }

  const clearCustomText = () => {
    fetch("http://192.168.1.51:3000/custom-text", {
      method: "delete"
    })
  }

  const startDateLoop = () => {
    fetch("http://192.168.1.51:3000/date", {
      method: "head"
    })
  }

  const stopDateLoop = () => {
    fetch("http://192.168.1.51:3000/date", {
      method: "delete"
    })
  }

  return (
    <>
      <ButtonGroup options={categories} changeFunc={(v) => setCategory(v)} />
      {category === 0 &&
        <div class="m-5">
          <div class="flex gap-5 mt-5 flex-wrap">
            <Button clickFunc={startDateLoop} text="start date loop" />
            <Button clickFunc={stopDateLoop} text="stop date loop" />
          </div>
        </div>
      }
      {category === 1 &&
        <div class="m-5">
          <TextField placeholder="custom text" changeFunc={(v) => setCustomText(v)} />
          <div class="flex gap-5 mt-5 flex-wrap">
            <Button clickFunc={sendCustomText} text="update text" />
            <Button clickFunc={clearCustomText} text="clear text" />
          </div>
        </div>
      }
    </>
  )
}
