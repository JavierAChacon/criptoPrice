import styled from "@emotion/styled";
import useSelectMonedas from "../hooks/useSelectMonedas";
import { monedas } from "../data/monedas"
import { useEffect, useState } from "react";
import Error from "./Error";

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

const Formulario = ({setMonedas}) => {


  const [ criptos, setCriptos ] = useState([]);
  const [ moneda, SelectMonedas ] = useSelectMonedas("Choose your currency", monedas);
  const [ criptomoneda, SelectCriptomoneda ] = useSelectMonedas("Choose your crypto", criptos);
  const [ error, setError ] = useState(false);

  useEffect(() => {
    const consultarAPI = async () => {
      const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      const arrayCripto = resultado.Data.map(cripto => {
        const objeto = {
          id: cripto.CoinInfo.Name,
          nombre: cripto.CoinInfo.FullName
        }
        return objeto;
      });
      setCriptos(arrayCripto);
    }
    consultarAPI();
  }, []);

  const handleSubmit = e => {
    e.preventDefault()
    if([moneda, criptomoneda].includes("")){
      setError(true);
    }else{
      setError(false);
      setMonedas({
        moneda,
        criptomoneda
      });
    }
  }

  return (
    <>
      {error && <Error>All fields are required</Error>}
      <form onSubmit={handleSubmit}>
          <SelectMonedas/>
          <SelectCriptomoneda/>
          <InputSubmit type="submit" value="Consult"/>
      </form>
    </>
  )
}

export default Formulario