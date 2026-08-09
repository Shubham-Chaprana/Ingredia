import { authFetch } from "./client";
export async function getRecipeFromChefClaude(ingredients) {
    const { data } = await authFetch("/chat/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ingredients: ingredients,
        }),
    });

    return data;
}
export async function getRecipeHistory() {
    const { data } = await authFetch("/recipes/", {
        method: "GET",
    })

    return data
}

export async function deleteRecipe(recipeId) {
    const { response, data } = await authFetch(`/recipes/${recipeId}/`, {
        method: "DELETE",
    })

    if (!response.ok) {
        throw new Error(data.detail || "Failed to delete recipe")
    }
}