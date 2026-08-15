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
    const [error, setError] = useState(null)
    
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
            setError("")
            const recipeData = await getRecipeFromChefClaude(ingredients)
            setRecipe(recipeData.recipe)
            setSelectedRecipeId(recipeData.id)
            setRecipeHistory((prev)=>[
                recipeData,...prev
            ])
        }
        catch (error) {
            if (error.status === 429) {
                setError("Too many recipe requests. Please try again later.");
            } else {
                setError("Something went wrong while generating your recipe.");
            }
        }
        finally{
            setIsLoading(false)
        }
    }

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient").trim()
        if(newIngredient!= "") setIngredients(prevIngredients => [...prevIngredients, newIngredient])
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
        return true;
    }

    return (
        <main>
            <Sidebar
                recipeHistory={recipeHistory}
                selectedRecipeId={selectedRecipeId}
                onSelectRecipe={(selectedRecipe) => {
                    setIngredients(selectedRecipe.ingredients.split(", "))
                    setRecipe(selectedRecipe.recipe)
                    setSelectedRecipeId(selectedRecipe.id)
                }}
                onNewRecipe={startNewRecipe}
                onDeleteRecipe={handleDeleteRecipe}
            />

            <div className="main-content">
                <div className="main-content-inner">

                    {ingredients.length === 0 && !recipe && (
                        <div className="empty-recipe-state">
                            <div className="empty-recipe-icon">👨‍🍳</div>
                            <h2>What's cooking?</h2>
                            <p>
                                Start by adding the ingredients you have on hand.
                                Chef Claude will turn them into a recipe for you.
                            </p>
                        </div>
                    )}

                    <div className="ingredient-input-section">
                        <h2>Add ingredients</h2>

                        <form
                            action={addIngredient}
                            className="add-ingredient-form"
                        >
                            <input
                                type="text"
                                placeholder="e.g. oregano"
                                aria-label="Add ingredient"
                                name="ingredient"
                            />

                            <button type="submit">
                                Add ingredient
                            </button>
                        </form>
                    </div>

                    {ingredients.length > 0 && (
                        <IngredientsList
                            ingredients={ingredients}
                            getRecipe={getRecipe}
                            isLoading={isLoading}
                            removeIngredient={removeIngredient}
                        />
                    )}
                    {error && <p className="error" > {error} </p>}
                    {recipe && <ClaudeRecipe recipe={recipe} />}

                </div>
            </div>
        </main>
    )
}