import { useState } from "react"
import IngredientsList from "./IngredientsList.jsx"
import ClaudeRecipe from "./ClaudeRecipe.jsx"
import { getRecipeFromMistral } from "../ai.js"

export default function Main(){
   const [ingredients, setIngredients] = useState([])
   const [recipeShown, setRecipeShown] = useState(false)
   const [recipe, setRecipe] = useState(null)
   const [loading, setLoading] = useState(false)
    

   function addIngredient(formData){
        const newIngredients = formData.get("ingredient")
        setIngredients(prevIngredients => [...prevIngredients, newIngredients])

   }

   async function fetchRecipe() {
    setLoading(true)
    const airesponse = await getRecipeFromMistral(ingredients)
    setRecipe(airesponse)
    setRecipeShown(true)
    setLoading(false)
   }

//    function toggleRecipeShown(){
//     setRecipeShown(prevValue => !prevValue)
//    }

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
                    toggleRecipeShown={fetchRecipe}
                    loading={loading}
                /> }

            {recipeShown && <ClaudeRecipe recipe={recipe}/>} 
               
                
            </main>
        </>
    )
}

