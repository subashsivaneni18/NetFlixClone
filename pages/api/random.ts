import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/libs/prismadb'

export default async function handler(req:NextApiRequest,res:NextApiResponse)
{
    if(req.method!=='GET')
    {
        res.status(400).send("The Method is Not Get")
    }

    try {
       await serverAuth(req,res)
       const movieCount = await prisma.movie.count()

       const randomIndex = Math.floor(Math.random() * movieCount)

       const randomMovies = await prisma.movie.findMany({
         take:1,
         skip:randomIndex
       })

       return res.status(200).send(randomMovies[0])
    } catch (error) {
        console.log(error)
        res.status(400).send("Server Error")
    }
}