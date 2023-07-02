import styled from 'styled-components';

export const TextTitle = styled.span``

export const EtiquetaPrice = styled.label``

export const RangeInput = styled.input.attrs({ type: 'range' })`
  -webkit-appearance: none;
  -moz-appearance: none;
  outline: 0;
  height: 12px;
  border-radius: 40px;
  background: ${props => props?.theme?.colors?.gray};
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);
  margin-left: 8px;
  margin-right: 8px;

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