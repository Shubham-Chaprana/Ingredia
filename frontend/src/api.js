export async function getRecipeFromChefClaude(ingredients) {
    const response = await fetch("http://127.0.0.1:8000/api/chat/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ingredients: ingredients,
        }),
    });

    const data = await response.json();

    return data.recipe;
}