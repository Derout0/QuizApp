import dotenv from 'dotenv'
import './config/paths.js'
import { server } from '@/api/core/server.ts'

// TODO GLOBAL: Remove unnecessary checks on request in controllers (use express-validator)

dotenv.config()

server()
