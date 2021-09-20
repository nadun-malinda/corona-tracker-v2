import { useState, useEffect } from 'react'

const useDebounce = (value: string, delay: number): string => {
    const [debouncedvalue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        // clean up and cancel the timeout when value or delay change
        return () => clearTimeout(handler)
    }, [value, delay])

    // this will return the latest value,
    // if "value" hasn't been updated within last "delay" time
    return debouncedvalue
}

export default useDebounce
