import axios from 'axios'

/* https://www.thecolorapi.com/docs#schemes-generate-scheme-get */
const theColorApi = axios.create({
    baseURL: 'http://www.thecolorapi.com/',
})

export default theColorApi