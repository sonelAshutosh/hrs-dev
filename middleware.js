// import { NextResponse } from 'next/server'
// import useAPIAuth from './api.config/useAPIAuth'

// export default function middleware(req) {
//   const { loginStatus } = useAPIAuth()
//   const url = req.url

//   if (!loginStatus && url.include('/'))
//     //&& url.include('/')
//     return NextResponse.redirect('/login')

//   if (loginStatus && url === '/login') return NextResponse('/')
// }
