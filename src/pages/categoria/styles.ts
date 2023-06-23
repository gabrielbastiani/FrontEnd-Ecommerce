import styled from 'styled-components'

export const Filtros = styled.div`
  margin-bottom: 20px;
`

export const TextFilter = styled.span`
  font-size: 20px;
`

export const TextTitle = styled.span``

export const TextAtribute = styled.span`
  margin-bottom: -5px;
  font-size: 19px;
`

export const TypeAtribute = styled.span`
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: 12px;
  font-size: 17px;
`

export const SectionCategories = styled.div`
  display: flex;
  align-items: baseline;
`

export const SectionAtributes = styled.div`
  display: flex;
  align-items: baseline;
`

export const InputAttribute = styled.input`
  cursor: pointer;
  margin-right: 10px;
`

export const SubsCategs = styled.div`
  display: flex;
  align-items: baseline;
`

export const SubsAtribut = styled.div`
  display: flex;
  align-items: baseline;
  margin-top: 5px;
`

export const SubCategsBlockExtra = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
`

export const SmallText = styled.span`
  font-size: 15px;
`

export const BoxText = styled.div`
  margin-bottom: 10px;
`

export const FilterText = styled.li`
  font-size: 14px;
  margin-bottom: 8px;
  list-style-type: none;
`

export const SectionBoxAtributes = styled.div`
  display: flex;
`

export const GridSectionProducts = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: 320px 320px 320px;
  padding: 10px;
  grid-gap: 25px;

  @media (max-width: 1000px) {
    grid-template-columns: 320px 320px;
  }

  @media (max-width: 700px) {
    grid-template-columns: 320px;
  }
`

export const BoxProduct = styled.div`
  background-color: ${props => props?.theme?.colors?.white};
  margin: 10px;
  padding: 10px;
  width: 320px;
  flex: none;
  border: solid 1px ${props => props?.theme?.colors?.gray};
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  a {
    display: contents;
  }
`

export const Info = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  a {
    display: contents;
  }
`

export const Images = styled.div`
  height: 300px;
  margin-bottom: 10px;
  opacity: 1;
  z-index: 1;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export const ImagesHover = styled.div`
  margin-top: -300px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  :hover {
    opacity: 0;
  }
`

export const Name = styled.span`
  color: ${props => props?.theme?.colors?.black};
  margin-bottom: 20px;
  position: relative;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 95%;
`

export const OldPrice = styled.span`
  font-size: 0.8rem;
  text-decoration: line-through;
  color: ${props => props?.theme?.colors?.gray};
`

export const Price = styled.span`
  padding-top: 2px;
  font-size: 1.3rem;
  font-weight: bold;
`

export const BoxBuy = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  height: 40px;
  margin-top: 10px;
`

export const Quantidade = styled.div`
  display: flex;
  border: 1px solid;
  margin-right: 10px;
  width: calc(40% - 10px);
`

export const Min = styled.span`
  display: block;
  width: 33.33%;
  line-height: 40px;
  text-align: center;
  color: #838282;
  cursor: pointer;
`

export const ValueQuant = styled.span`
  display: block;
  width: 33.33%;
  line-height: 40px;
  text-align: center;
  color: #838282;
`

export const Max = styled.span`
  display: block;
  width: 33.33%;
  line-height: 40px;
  text-align: center;
  color: #838282;
  cursor: pointer;
`

export const Add = styled.button`
  letter-spacing: 1px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60%;
  text-align: center;
  background-color: ${props => props?.theme?.colors?.warning};
  color: ${props => props?.theme?.colors?.white};
  line-height: 40px;
  font-size: 15px;
  cursor: pointer;
  -webkit-transition: opacity 0.5s ease-in-out;
  -moz-transition: opacity 0.5s ease-in-out;
  -ms-transition: opacity 0.5s ease-in-out;
  -o-transition: opacity 0.5s ease-in-out;
  transition: opacity 0.5s ease-in-out;
  opacity: 1;

  :hover {
    opacity: 0.7;
  }
`

export const ButtonFilter = styled.button`
  background-color: ${props => props?.theme?.colors?.black};
  border: none;
  color: ${props => props?.theme?.colors?.white};
  width: 60%;
  padding: 10px;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 1px;
  border-radius: 5px;
`

export const InputRange = styled.input.attrs({ type: 'range' })`
  -webkit-appearance: none;
  -moz-appearance: none;
  outline: 0;
  height: 12px;
  border-radius: 40px;
  background: ${props => props?.theme?.colors?.gray};
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);
  width: 330px;

  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 24px;
    height: 24px;
    background-image: radial-gradient(circle, #f7f7fc 40%, #ff9800 45%);
    border-radius: 50%;
    box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.5);
  }

  ::-moz-range-thumb {
    width: 24px;
    height: 24px;
    -moz-appearance: none;
    background-image: radial-gradient(circle, #f7f7fc 40%, #ff9800 45%);
    border-radius: 50%;
    box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.5);
  }
`

export const EtiquetaPreco = styled.label`
  font-weight: 600;
`