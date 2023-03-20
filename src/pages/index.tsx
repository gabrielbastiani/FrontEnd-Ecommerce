import Head from "next/head"
import { HeaderStore } from "../components/HeaderStore"

export default function Home() {
  return (
    <>
      <Head>
        <title>Loja Virtual Builder Seu Negócio Online</title>
      </Head>

      <HeaderStore />

    </>
  )
}