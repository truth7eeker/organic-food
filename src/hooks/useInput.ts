import { useState } from "react"


function useInput(initialValue:string) {
  const [value, setValue] = useState(initialValue)
  const onChange = (e:any) => {
    setValue(e.target.value)
  }

  return { value, onChange }
}

export default useInput