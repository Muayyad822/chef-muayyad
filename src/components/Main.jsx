import { useEffect, useRef, useState } from "react"
import IngredientsList from "./IngredientsList.jsx"
import MistralRecipe from "./MistralRecipe.jsx"
import { getRecipeFromMistral } from "../ai.js"

export default function Main(){
   const [ingredients, setIngredients] = useState(["chicken", "all the main spices", "corn", "heavy cream", "pasta"])
   const [recipeShown, setRecipeShown] = useState(false)
   const [recipe, setRecipe] = useState(null)
   const [loading, setLoading] = useState(false)
    
   const recipeSection = useRef(null)

   useEffect(() => {
    if(recipe !== "" && recipeSection.current !== null){
        recipeSection.current.scrollIntoView({behavior: "smooth"})
    } 
   }, [recipe])

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
                    ref={recipeSection}
                    ingredients={ingredients}
                    toggleRecipeShown={fetchRecipe}
                    loading={loading}
                /> }

            {recipeShown && <MistralRecipe recipe={recipe}/>} 
               
                
            </main>
        </>
    )
}

