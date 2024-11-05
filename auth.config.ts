// src/auth/auth.config.ts

import { NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';

const authConfig = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? ''
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: "Email",
          type: 'text', // Use 'text' for email field
          placeholder: 'your-email@example.com'
        },
        password: {
          label: "Password",
          type: 'password',
          placeholder: 'your-password'
        }
      },
      async authorize(credentials) {
        // Here you would normally query your database or an external API
        const user = {
          id: '1',
          name: 'John',
          email: credentials?.email as string
        };
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/' // Custom sign-in page
  },
  secret: process.env.NEXTAUTH_SECRET || 'your-default-secret', // Define a secret for JWT signing
} satisfies NextAuthConfig;

export default authConfig;
