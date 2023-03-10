import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { destroyCookie, parseCookies } from '../../node_modules/nookies/dist/index';
import { AuthTokenError } from '../services/errors/AuthTokenError'


//funcao para paginas que só users logados podem ter acesso.
export function canSSRAuth<P>(fn: GetServerSideProps<P>){
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);    

    const token = cookies['@lojavirtual.token'];

    if(!token){
      return{
        redirect:{
          destination: '/loginClient',
          permanent: false,
        }
      }
    }

    try{
      return await fn(ctx);
    }catch(err){
      if(err instanceof AuthTokenError){
        destroyCookie(ctx, '@lojavirtual.token');

        return{
          redirect:{
            destination: '/loginClient',
            permanent: false
          }
        }

      }
    }


  }

}