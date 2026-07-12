export async function getRecipeFromChefClaude(ingredients) {
    const response = await fetch("http://127.0.0.1:8000/api/hello/")

    const data = await response.json()

    return data.message
}