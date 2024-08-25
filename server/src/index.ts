import dotenv from 'dotenv'
import { server } from '@/api/core/server.ts'

dotenv.config()

server()
