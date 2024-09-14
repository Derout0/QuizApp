import type { AxiosError, AxiosRequestConfig } from 'axios'
import axios from 'axios'
import { USER_ACCESS_TOKEN } from '@/shared/consts/localStorage'
import type { AuthResponse } from '@/entities/user'

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
    _isRetry?: boolean
}

const $api = axios.create({
    withCredentials: true,
    baseURL: __API_URL__,
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem(USER_ACCESS_TOKEN)}`
    return config
})

$api.interceptors.response.use((config) => {
    return config
}, async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig

    if (originalRequest && error.response?.status == 401 && error.config && !originalRequest._isRetry) {
        originalRequest._isRetry = true

        try {
            const response = await axios.get<AuthResponse>(`${__API_URL__}/refresh`, { withCredentials: true })
            localStorage.setItem(USER_ACCESS_TOKEN, response.data.tokens.accessToken)

            return $api.request(originalRequest)
        }
        catch (error) {
            console.log('Unauthorized')
        }
    }

    throw error
})

export default $api
