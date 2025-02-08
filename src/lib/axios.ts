import axios from 'axios'

const instance = axios.create({
	baseURL: 'https://btw-wh.up.railway.app/api',
	// baseURL: 'http://localhost:3002/api/',
})

instance.interceptors.request.use((config) => {
	config.headers.Authorization = window.localStorage.getItem('token')
	return config
})

export default instance
