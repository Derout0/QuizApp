import dotenv from 'dotenv'
import './config/paths.js'
import { server } from '@/api/core/server.ts'

dotenv.config()

server()
