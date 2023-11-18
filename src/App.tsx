// import { useState } from "react"
import './App.css'
import { useAppSelector, useAppDispatch } from './app/hooks'
import { addItem, getListItems, moveItem, removeItem, toggleStatus, updateContent } from './features/counter/counterSlice'
import { Button, Form, FormControl } from "react-bootstrap"
import cn from "classnames"
import { chevronUp as UpArrow, chevronDown as DownArrow } from "./assets/icons"

function App() {
  // const [ content, setContent ] = useState<string>("") 
  const dispatch = useAppDispatch()
  const list = useAppSelector(getListItems).list
  console.log(list);

  const handleSubmitAddNew = (event: React.BaseSyntheticEvent) => {
    event.preventDefault()
    const value = ((event.target as HTMLFormElement)[0] as HTMLInputElement).value
    const payload = { content: value, done: false, id: list.length }
    dispatch(addItem({ data: payload}))
    event.target.reset()
  }

  const handleDelete = (index: number) => {
    dispatch(removeItem(index))
  }
  


  return (
    <>
      <div id="container" className="flex flex-col justify-center bg-[#de3f53] rounded-t-md w-80">
        <span className="text-2xl text-white p-4">TO DO LIST</span>

        <Form className="flex" onSubmit={handleSubmitAddNew}>
          <FormControl className="shadow-none" style={{ borderRadius: "0", backgroundColor: "#3c4979", border: "none", color: "white" }} type="text" placeholder="Add new task..."></FormControl>
          <Button style={{ borderRadius: "0", fontSize: "32px", lineHeight: "10px"}} type="submit">+</Button>
        </Form>

        
        {
          list.length > 0 ?
          list.map(( item, index ) => {
            return (
              <div className="bg-[#262e4c] text-white flex p-1" key={item.id}>
                <input name="checkbox-id" type="checkbox" className="ml-3" onChange={() => dispatch(toggleStatus(index))} defaultChecked={item.done} />
                <label htmlFor="checkbox-id" className="leading-none ml-1 w-full">
                  <form action="" className="flex flex-row justify-between" onSubmit={(e: React.BaseSyntheticEvent) => {
                      dispatch(updateContent({ index: index, data: { content: ((e?.target as HTMLFormElement)[0] as HTMLInputElement).value, done: false, id: item.id }}))
                    }}>
                    <input id="content-value" type="text" className={cn("bg-[#262e4c]",{
                      "line-through": item.done
                    })} defaultValue={item.content} />
                    <div className="flex">
                      <img src="https://www.svgrepo.com/show/449945/trash.svg" alt="" height={25} width={25} className="cursor-pointer" onClick={() => handleDelete(index)} />
                      <div className="flex flex-col">
                        <div 
                          id="arrow-up" 
                          className="cursor-pointer rounded-sm bg-[#262e4c] hover:bg-[#3C4979] transition duration-500"
                          onClick={() => dispatch(moveItem({ id: item.id, direction: "up" }))}
                        >
                          <UpArrow width={15} height={15}/>
                        </div>
                        <div 
                          id="arrow-down" 
                          className="cursor-pointer rounded-sm bg-[#262e4c] hover:bg-[#3C4979] transition duration-500"
                          onClick={() => dispatch(moveItem({ id: item.id, direction: "down" }))}
                        >
                          <DownArrow width={15} height={15}/>
                        </div>
                      </div>
                    </div>
                    <button id="content-btn" type="submit" hidden />
                  </form>
                </label>
              </div>
            )
          }) : <h4 className="text-white" style={{ marginTop: "5px", marginBottom: "5px" }}>=== Ready When You Are ===</h4>
        }
      </div>
      <script>
        {
          ` const input = document.getElementById("content-value");
            input?.addEventListener("keyup", function(event) {
            if (event.key === "Enter") {
                event.preventDefault();
                document.getElementById("content-btn")?.click();
            }
          }`
        }
      </script>
    </>
  )
}

export default App
