export default function Sidebar({
    recipeHistory,
    selectedRecipeId,
    onSelectRecipe,
    onNewRecipe,
    onDeleteRecipe
}) {
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
                                onClick={() => onDeleteRecipe(recipe.id)}
                                aria-label={`Delete ${recipe.title}`}
                            >
                                <i className="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </aside>
    )
}