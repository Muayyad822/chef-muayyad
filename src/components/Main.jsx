import { useState } from "react"
import IngredientsList from "./IngredientsList.jsx"
import ClaudeRecipe from "./ClaudeRecipe.jsx"

export default function Main(){
   const [ingredients, setIngredients] = useState(["beef", "stock", "bay leaves", "maize"])
   const [recipeShown, setRecipeShown] = useState(false)

   

   function addIngredient(formData){
        const newIngredients = formData.get("ingredient")
        setIngredients(prevIngredients => [...prevIngredients, newIngredients])

   }

   function toggleRecipeShown(){
    setRecipeShown(prevValue => !prevValue)
   }

    return (
        <>
            <main>
                <form action={addIngredient}>
                    <input 
                    aria-label="Add ingredient" 
                    type="text" 
                    placeholder="e.g beef" 
                    name="ingredient"
                 
                    />
                    <button > Add ingredient</button>
                </form>
                { ingredients.length > 0 && 
                <IngredientsList
                    ingredients={ingredients}
                    toggleRecipeShown={toggleRecipeShown}
                /> }

            {recipeShown && <ClaudeRecipe/>} 
               
                
            </main>
        </>
    )
}

