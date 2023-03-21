import Head from "next/head"
import { HeaderStore } from "../components/HeaderStore"
import { FooterStore } from "../components/FooterStore"
import FooterAccount from "../components/FooterAccount"
import CarrosselBannerHome from "../components/CarrosselBannerHome"

export default function Home() {
  return (
    <>
      <Head>
        <title>Loja Virtual Builder Seu Negócio Online</title>
      </Head>

      <HeaderStore />
      <CarrosselBannerHome />


      <FooterStore />
      <FooterAccount />

    </>
  )
}