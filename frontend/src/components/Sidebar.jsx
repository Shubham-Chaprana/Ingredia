import { useState } from "react"
export default function Sidebar({
    recipeHistory,
    selectedRecipeId,
    onSelectRecipe,
    onNewRecipe,
    onDeleteRecipe
}) {
    const [recipeToDelete, setRecipeToDelete] = useState(null)
    return (
        <aside className="sidebar">
            <button
                className="new-recipe-button"
                onClick={onNewRecipe}
            >
                + New Recipe
            </button>
            <div className="recipe-history-section">
                <h2>Recents</h2> 
                <div className="recipe-history">
                    {recipeHistory.map(recipe => (
                        <div
                            key={recipe.id}
                            className="recipe-history-item"
                        >
                            <button
                                className={`recipe-history-button ${
                                    recipe.id === selectedRecipeId ? "selected" : ""
                                }`}
                                onClick={() => onSelectRecipe(recipe)}
                            >
                                {recipe.title}
                            </button>

                            <button
                                className="delete-recipe-button"
                                onClick={() => setRecipeToDelete(recipe)}
                                aria-label={`Delete ${recipe.title}`}
                            >
                                <i className="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            {recipeToDelete && (
                <div className="delete-modal-backdrop">
                    <div className="delete-modal">
                        <h2>Delete recipe?</h2>

                        <p>
                            Are you sure you want to delete{" "}
                            <strong>{recipeToDelete.title}</strong>?
                        </p>

                        <div className="delete-modal-actions">
                            <button
                                onClick={() => setRecipeToDelete(null)}
                            >
                                Cancel
                            </button>

                            <button
                                onClick={async () => {
                                    await onDeleteRecipe(recipeToDelete.id)
                                    setRecipeToDelete(null)
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </aside>
    )
}