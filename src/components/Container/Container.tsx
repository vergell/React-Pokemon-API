import { Cards } from "../Cards/Cards"
import { Context } from "../Context"
import { StartButton } from "../StartButton/StartButton"
import "./Container.css"
export const Container = () => {
   const { loading, pokemonCards, start, setStart, handleClick, time } =
      Context()

   const handleStart = () => {
      setStart(true)
   }
   if (loading) {
      return (
         <div>
            <h1>loading</h1>
         </div>
      )
   }

   return (
      <div>
         {!start ? (
            <div>
               <div onClick={handleStart}>
                  {" "}
                  <StartButton />
               </div>
               <h1>Time: {time}</h1>
            </div>
         ) : (
            <div className="container">
               {pokemonCards.map((pokemonCard, index) => (
                  <Cards
                     card={pokemonCard}
                     key={index}
                     onClick={handleClick}
                  ></Cards>
               ))}
            </div>
         )}
      </div>
   )
}
