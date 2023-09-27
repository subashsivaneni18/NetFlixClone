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
       
       const  movies = await prisma.movie.findMany()

       return res.status(200).send(movies)
    } catch (error) {
        console.log(error)
        return res.status(500).send("Server Error")
    }
}