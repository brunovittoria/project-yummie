import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom"; //O useParams serve para pegar a keyword da URL
import Category from "../../components/Category";

export default function Cuisine(){

    const [cuisine, setCuisine] = useState([])
    let params = useParams()
    
    const getCuisine = async (name) => {
        const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}`)

        const recipes = await data.json()
        setCuisine(recipes.results)
    }

    //No fetch acima passamos uma variavel name como parametro e variavel dentro de nossa LINK API, pois o valor a ser carregado pela API ira depender doque o usuario buscar, ITALIAN, THAI...

    // Agora para renderizar o getCuisine iremos usar o useEffect>
    useEffect(() => {

        getCuisine(params.type)  // Com esse codigo ele ira pegar o TYPE do icone que foi clicado THAI, ITALIAN
        console.log(params.type)
    }, [params.type])

    return(
    <>
        <Category>

        </Category>

        <Grid  //Esses atributos abaixo serao responsaveis por aplicar animacoes quando a page for carregada
          animate={{opacity: 1}}
          initial={{opacity: 0}}
          exit={{opacity: 0}}
          transition={{duration: 0.5}}
        >
            {cuisine.map((item) => {
                return(
                    <Card key={item.id}>
                        <Link to={"/recipe/" + item.id}>
                            <img src={item.image} alt=""/>
                            <h4>{item.title}</h4>
                        </Link>
                    </Card>
                )
            })}
        </Grid>
    </>

    )
}

const Grid = styled(motion.div)`
   display: grid;
   grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
   grid-gap: 3rem;
`;

const Card = styled.div`
   margin-left: 25px;
   margin-right: 25px;
   img {
    width: 100%;
    border-radius: 2rem;
   }

   a{
    text-decoration: none;
   }

   h4{
    text-align: center;
    ppadding: 1rem;
   }
`;

