import styled from "@emotion/styled";
import useSelectMonedas from "../hooks/useSelectMonedas";
import { monedas } from "../data/monedas"

const InputSubmit = styled.input`
    background-color: #9497ff;
    border: none;
    width: 100%;
    padding: 10px;
    color: #fff;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;
    margin-top: 20px;
    
    &:hover{
        background-color: #7A70EF;
        cursor: pointer;
    }
`

const Formulario = () => {

  const [ SelectMonedas ] = useSelectMonedas("Elige tu moneda", monedas);

  return (
    <form>
        <SelectMonedas/>
        <InputSubmit type="submit" value="cotizar"/>
    </form>
  )
}

export default Formulario