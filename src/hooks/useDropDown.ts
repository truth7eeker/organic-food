import { useState } from 'react'

function useDropDown() {
    const [isOpen, setIsOpen] = useState(false)
    const handleOpen = () => {
        setIsOpen(!isOpen)
    }

    return { isOpen, handleOpen }
}

export default useDropDown