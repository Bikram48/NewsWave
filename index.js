fetchNews()
async function fetchNews() {
    const resp = await fetch('https://newsapi.org/v2/everything?q=apple&from=2023-06-19&to=2023-06-19&sortBy=popularity&apiKey=5235a3e37c4f470ca8af56361d4f8148')
    const respData = await resp.json()
    const newsData = respData.articles
}

