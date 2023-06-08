import Head from "next/head";
import { HeaderStore } from "../components/HeaderStore";
import { FooterStore } from "../components/FooterStore";
import FooterAccount from "../components/FooterAccount";
import CarrosselBannerHome from "../components/CarrosselBannerHome";
import DestaqueProducts from "../components/DestaqueProducts";
import ProdutosOfertas from "../components/ProdutosOfertas";
import { MosaicoHome } from "../components/MosaicoHome";
import BlockCategoriasHome from "../components/BlockCategoriasHome";
import VizualizadosRecentemete from "../components/VizualizadosRecentemete";
import Newsletters from "../components/Newsletters";


export default function Home() {
  return (
    <>
      <Head>
        <title>Loja Virtual Builder Seu Negócio Online</title>
      </Head>

      <HeaderStore />
      <CarrosselBannerHome />
      <ProdutosOfertas title="Ofertas do mês" />
      <BlockCategoriasHome />
      <Newsletters />
      <MosaicoHome />
      <DestaqueProducts title='Produtos destaques' />
      <VizualizadosRecentemete title="Vizualizados recentemente" />
      <FooterStore />
      <FooterAccount />

    </>
  )
}