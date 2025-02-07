



import axios from 'axios'

const apikey = process.env.NEXT_PUBLIC_API_TOKEN
const apiurl = 'https://postgres-next-ecommerce.onrender.com/api'

const axiosClient = axios.create({
    baseURL:apiurl,
    headers:{
        authorization:`Bearer ${apikey}`
    }
})

export default axiosClient

