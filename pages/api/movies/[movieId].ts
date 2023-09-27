import { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/libs/prismadb'

export default async function handler(req:NextApiRequest,res:NextApiResponse)
{
    if(req.method!=='GET')
    {
        return res.status(400).send("Method is Not Get")
    }

    try {
        const {movieId} = req.query

        if(!movieId || typeof movieId !=='string')
        {
            return res.status(400).send("Invalid Id")
        }

        const movie = await prisma.movie.findUnique({
            where:{
                id:movieId
            }
        })

        if(!movie)
        {
            return res.status(404).send("Movie Not Found")
        }

        return res.status(200).send(movie)
    } catch (error) {
        console.log(error)
        res.status(200).send("Server Error")
    }
}