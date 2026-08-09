import { useState,useEffect} from "react"
import IngredientsList from "./components/IngredientsList"
import ClaudeRecipe from "./components/ClaudeRecipe"
import Sidebar from "./components/Sidebar"
import { getRecipeFromChefClaude, getRecipeHistory, deleteRecipe } from "./api/recipe"

export default function Main() {
    const [ingredients, setIngredients] = useState([])
    const [recipe, setRecipe] = useState("")
    const [isLoading,setIsLoading] = useState(false)
    const [recipeHistory, setRecipeHistory] = useState([])
    const [selectedRecipeId, setSelectedRecipeId] = useState(null)

    useEffect(() => {
        async function loadHistory() {
            const history = await getRecipeHistory()
            setRecipeHistory(history)
        }

        loadHistory()
    }, [])

    async function getRecipe() {
        try{
            setIsLoading(true)
            const recipeData = await getRecipeFromChefClaude(ingredients)
            setRecipe(recipeData.recipe)
            setSelectedRecipeId(recipeData.id)
            setRecipeHistory((prev)=>[
                recipeData,...prev
            ])
        }
        finally{
            setIsLoading(false)
        }
    }

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }
    function removeIngredient(indexToRemove) {
        setIngredients(prevIngredients =>
            prevIngredients.filter(
                (_,index) => index !== indexToRemove
            )
        )
    }

    function startNewRecipe() {
        setSelectedRecipeId(null)
        setRecipe("")
        setIngredients([])
    }
    async function handleDeleteRecipe(recipeId) {
        await deleteRecipe(recipeId)

        setRecipeHistory(prev =>
            prev.filter(recipe => recipe.id !== recipeId)
        )
        if (recipeId === selectedRecipeId) {
            startNewRecipe()
        }
    }

    return (
        <main>
            <Sidebar
                recipeHistory={recipeHistory}
                onSelectRecipe={(selectedRecipe) => {
                    setIngredients(selectedRecipe.ingredients.split(", "))
                    setRecipe(selectedRecipe.recipe)
                    setSelectedRecipeId(selectedRecipe.id)
                }}
                onNewRecipe={startNewRecipe}
                onDeleteRecipe={handleDeleteRecipe}
            />
            <form action={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>

            {ingredients.length > 0 &&
                <IngredientsList
                    ingredients={ingredients}
                    getRecipe={getRecipe}
                    isLoading = {isLoading}
                    removeIngredient={removeIngredient}
                />
            }

            {recipe && <ClaudeRecipe recipe={recipe} />}
        </main>
    )
}