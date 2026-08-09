export default function Sidebar({
    recipeHistory,
    onSelectRecipe,
    onNewRecipe,
    onDeleteRecipe
}) {
    return (
        <aside>
            <button onClick={onNewRecipe}>
                + New Recipe
            </button>

            <div className="recipe-history">
                {recipeHistory.map(recipe => (
                    <div key={recipe.id}>
                        <button
                            onClick={() => onSelectRecipe(recipe)}
                        >
                            {recipe.title}
                        </button>

                        <button
                            onClick={() => onDeleteRecipe(recipe.id)}
                        >
                            🗑️
                        </button>
                    </div>
                ))}
            </div>
        </aside>
    )
}