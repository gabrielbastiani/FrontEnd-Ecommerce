import Head from "next/head"
import { HeaderStore } from "../components/HeaderStore"
import { FooterStore } from "../components/FooterStore"
import FooterAccount from "../components/FooterAccount"

export default function Home() {
  return (
    <>
      <Head>
        <title>Loja Virtual Builder Seu Negócio Online</title>
      </Head>

      <HeaderStore />



      <FooterStore />
      <FooterAccount />

    </>
  )
}