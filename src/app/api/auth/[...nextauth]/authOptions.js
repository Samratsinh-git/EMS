import CredentialsProvider from "next-auth/providers/credentials";
import {PrismaAdapter} from '@next-auth/prisma-adapter'
import bcrypt from 'bcrypt'
import prisma from '@/app/libs/prismadb'
import { PrismaClient } from "@prisma/client/edge";

export const authOptions = {
    adapter: PrismaAdapter(new PrismaClient()),
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                username: {label: 'username', type: 'text'},
                password: {label: 'password', type: 'password'}
            },
            async authorize(credentials){
                if(!credentials?.username || !credentials?.password){
                    throw new Error('Invalid Credentials')
                }
                const user = await prisma.organisation.findUnique({
                    where: {
                        username: credentials.username
                    }
                });
                if(!user || !user?.password){
                    throw new Error('Invalid Credentials')
                }
                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.password
                );
                if(!isCorrectPassword){
                    throw new Error("Invalid Password")
                }
                return user;
            }
        })
    ],
    debug: process.env.NODE_ENV==='development',
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
};
