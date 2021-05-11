
import { useState, useEffect } from 'react'
import axios from 'axios'

// custom hook for performing GET request
const useFetch = ({parms}) => {

    const {url, method, headers, initialValue} = parms
    const [data, setData] = useState(initialValue)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchData()
    }, [url])

    const fetchData = async () => {
        try {
            setLoading(true)
            const res = await axios({
                method,
                url,
                headers,
                data
              })
            if (res.status === 200) {
                setData(res.data)
            }
        } 
        catch (error) {
            throw error
        } 
        finally {
            setLoading(false)
        }
    }

    return { loading, data }
}

export default useFetch