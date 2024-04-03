import { ErrorResponse, handleRequestError } from '@/Util/handleRequestError';
import { AxiosError } from 'axios';
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        cpf: { 
          label: "CPF", 
          type: "text", 
          placeholder: "000.000.000-00",          
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/login/`,{
              method: "POST",	
              headers: { 
                "Content-Type": "application/json" 
              },
              body: JSON.stringify({
                id_or_cpf: credentials?.cpf,
                password: credentials?.password,
              }),
            },
          );
          
          const user = await res.json();
          if(user && res.ok){
            return user;
          }

          
          if(user.code == 1002){
            throw new Error('CPF não existe. Por favor, tente novamente.');
          }
          switch (res.status) {
            case 401:
              throw new Error('Credenciais inválidas. Por favor, tente novamente.');
            default:
              throw new Error('Um erro inesperado ocorreu. Por favor, tente novamente.');
          }

          return null;

        } catch (error) {
          // console.error('Error in authorize: ', error);
          if (error instanceof AxiosError) {
              handleRequestError(error as AxiosError<ErrorResponse>, credentials);
          }
          throw error;
        }
      },
    }),
  ],

callbacks: {
  async jwt({ token, user }: { token: any; user: any }) {
    if (user) {
      const accessTokenExpiry = Date.now() + 60 * 60 * 1000; // 60 minutos desde ahora
      token = {
        ...token,
        id: user.id,
        img: user.img,
        access: user.access,
        refresh: user.refresh,
        accessTokenExpiry,
        detail: user.detail,
        profiles: user.profiles,
        head_offices: user.head_offices,
        branch_offices: user.branch_offices,
      };
    } else if (token.accessTokenExpiry - Date.now() < 30 * 60 * 1000) {
      // Obtener un nuevo token de acceso usando el token de actualización
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/refresh_token/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refresh: token.refresh,
        }),
      });

      const data = await res.json();

      if (data.access) {
        const accessTokenExpiry = Date.now() + 60 * 60 * 1000; // 60 minutos desde ahora
        token = {
          ...token,
          access: data.access,
          accessTokenExpiry,
        };
      }
    }

    return token;
  },

  async session({ session, token }) {
    session.user = token as any;
    return session;
  },
},
  
  pages: {
    signIn: "/",
  },
});

export { handler as GET, handler as POST };