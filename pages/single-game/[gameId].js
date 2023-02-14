import ContentText from "@/components/shared/content-text";
import Footer from "@/components/shared/footer";
import Hero from "@/components/shared/hero";
import Page from "@/components/shared/page";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function SingleGame(){
    const router = useRouter();
    const [game, setGame] = useState(null);
    const { gameId }= router.query;

    useEffect(() => {
        if ({gameId} === null) return;
        
        getGame(gameId);
    }, [gameId]);

    const getGame = async (id) => {
        const response = await fetch(`/api/game-by-id?id=${id}`);
        const data = await response.json();
        const {game}  = data;
        setGame(game);
    }
    
    console.log(game);

    if (!game) {
        return (
            <div>Loading ...</div>
        )
    }

    return(
        <Page>
           <Hero name = {game.title}></Hero>
           <Image 
                src = {game.picture} 
                width = {250} 
                height = {250} 
                className = "container mx-auto object-contain h-122 w-64"/>
           <div className = "text-center italic">{game.developer}</div>
           <ContentText>
                {game.summary}
           </ContentText>

           <Footer 
                name1="previous game" 
                name2="next game" 
                href1 ={`/single-game/${+game.id -1}`}
                href2 ={`/single-game/${+game.id +1}`}
            />
           

        </Page>
    )
}
