import styled from 'styled-components'

export const SectionOrder = styled.section`
  background-color: ${props => props?.theme?.colors?.white};
  height: 270vh;
`

export const StatusTop = styled.button`
  cursor: none;
  padding: 10px;
  border-radius: 0.5rem;
  font-weight: 700;
  border: none;
  margin-right: 20px;
  width: 200px;
`

export const BoxTopStatusGeral = styled.div`
  display: inline-flex;
  margin-top: 15px;

  @media (max-width: 620px) {
    display: flex;
  }

  @media (max-width: 420px) {
    flex-direction: column;
    align-items: center;
  }
`

export const TextDataOrder = styled.span`
  color: ${props => props?.theme?.colors?.black};
  width: 95%;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const TotalFrete = styled.button`
  background-color: ${props => props?.theme?.colors?.white};
  color: ${props => props?.theme?.colors?.black};
  padding: 3px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  font-weight: 700;
  border: none;
  cursor: none;
  margin-right: 20px;
  width: 30%;
`

export const TotalTop = styled.button`
  background-color: ${props => props?.theme?.colors?.white};
  color: ${props => props?.theme?.colors?.black};
  padding: 3px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  font-weight: 700;
  border: none;
  cursor: none;
  width: 200px;

  svg {
    margin-right: 5px;
    color: ${props => props?.theme?.colors?.black};
  }
`

export const GridOrder = styled.div`
  display: grid;
  grid-template-columns: 33% 33% 33%;
  grid-gap: 10px;

  @media (max-width: 950px) {
    justify-content: center;
    grid-template-columns: 70%;
  }

  @media (max-width: 510px) {
    grid-template-columns: 90%;
  }
`

export const WhatsButton = styled.button`
  background-color: green;
  border: none;
  color: white;
  padding: 8px;
  width: 100px;
  margin-top: 15px;
`

export const BoxPix = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 10px;
  align-items: center;

  @media (max-width: 950px) {
    justify-content: center;
    flex-direction: column;
  }
`

export const InputPix = styled.input`
  padding: 8px;
  margin-right: 5px;
  width: 60%;
  height: 40px;
`

export const ButtonPix = styled.button`
  background: none;
  border: none;

  @media (max-width: 950px) {
    margin: 20px;
  }

  svg {
    color: ${props => props?.theme?.colors?.black};
  }
`

export const ButtoQRCode = styled.button`
  background: transparent;
  color: ${props => props?.theme?.colors?.black};
`

export const BoxProductCart = styled.div`
  background-color: ${props => props?.theme?.colors?.gray};
  margin: 30px;
  padding: 15px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 0.4rem;

  @media (max-width: 816px) {
    width: 500px;
    flex-direction: column;
  }

  @media (max-width: 730px) {
    width: 400px;
  }

  @media (max-width: 545px) {
    width: 300px;
  }

  @media (max-width: 450px) {
    width: 250px;
  }
`

export const ImageProductCart = styled.div``

export const Sku = styled.span`
  color: ${props => props?.theme?.colors?.black};
  font-size: 11px;
  margin-bottom: 13px;
`

export const BoxDataProduct = styled.div`
  margin: 0 20px;
  width: 800px;

  @media (max-width: 1333px) {
    width: 500px;
  }

  @media (max-width: 545px) {
    width: 200px;
    display: flex;
  }
`

export const BoxData = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 816px) {
    align-items: center;
  }

  @media (max-width: 535px) {
    align-items: unset;
    width: 300px;
  }
`

export const BoxPriceProductCart = styled.div``

export const PriceProduct = styled.span`
  color: ${props => props?.theme?.colors?.black};
`

export const BoxPricesTotalProduct = styled.div`
  display: flex;
  margin: 0 20px;
`

export const BoxPrices = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  @media (max-width: 816px) {
    margin: 10px;
    align-items: center;
  }
`

export const PriceProductData = styled.strong`
  margin-bottom: 5px;
  font-size: 19px;
  color: ${props => props?.theme?.colors?.black};
`

export const NameProduct = styled.strong`
  color: ${props => props?.theme?.colors?.black};
  margin-bottom: 8px;
  width: 95%;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 720px) {
    width: 55%;
  }
`

export const AtributeProduct = styled.span`
  font-size: 13px;
`

export const BoxTotal = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 50px;

  @media (max-width: 535px) {
    flex-direction: column;
  }
`

export const TextTotal = styled.span`
  color: ${props => props?.theme?.colors?.black};
  font-size: 24px;
  font-weight: 900;
`

export const TotalOrder = styled.h2`
  color: red;
  font-size: 23px;
`

export const ContainerComments = styled.div`
  margin-top: 35px;
`

export const DataComment = styled.span`
  color: ${props => props?.theme?.colors?.black};
`

export const ContainerCommets = styled.div`
  display: inline-flex;
  width: 100%;
`

export const EtiquetaComment = styled.span`
  color: ${props => props?.theme?.colors?.black};
`

export const TextComment = styled.textarea`
  width: 100%;
  padding: 15px;
`

export const ButtonSendComment = styled.button`
  display: inline-flex;
  align-items: center;
  width: 120px;
  justify-content: space-evenly;
  color: ${props => props?.theme?.colors?.black};
  background-color: ${props => props?.theme?.colors?.white};
  font-weight: 800;

  svg {
    color: ${props => props?.theme?.colors?.black};
  }
`

export const BoxComment = styled.div`
  display: flex;
  align-items: center;
  background-color: ${props => props?.theme?.colors?.white};
  padding: 13px;
  margin-top: 15px;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`

export const ImageComment = styled.img`
  width: 70px;
  height: 70px;
  margin-right: 20px;
`

export const TextUser = styled.strong``

export const Comments = styled.span`
  color: ${props => props?.theme?.colors?.black};
`

export const BlockData = styled.div`
  margin: 18px 0;
`

export const TextData = styled.span`
  color: ${props => props?.theme?.colors?.black};
`
