import { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/libs/prismadb'

export default async function handler(req:NextApiRequest,res:NextApiResponse)
{
    if(req.method!=='POST')
    {
        return res.status(400).send("The Method is Not Post")
    }

    try {
        const {  title, description, vedioUrl, thumbnailUrl ,genre,duration} = req.body;

        if(  !title || !description || !vedioUrl || ! thumbnailUrl || !genre || !duration)
        {
            return res.status(400).send("Enter All Details")
        }

        const movie = await prisma.movie.create({
          data: {
            title: title as string,
            thumbnailUrl: thumbnailUrl as string,
            videoUrl: vedioUrl as string,
            description: description as string,
            duration: duration as string,
            genre:genre as string
          },
        });
 
        if(!movie)
        {
            res.status(400).send("Movie Not Created")
        }

        res.status(200).send(movie)

    } catch (error) {
        console.log(error)
        res.status(500).send("Server Error")
    }
}