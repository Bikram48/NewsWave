const newsContainer = document.querySelector('.news-container')
const categories = document.querySelectorAll('.nav-item .nav-link')
console.log(categories)

fetchNews()
async function fetchNews() {
    try{
        const resp = await fetch('https://newsapi.org/v2/everything?sources=bbc-news&apiKey=5235a3e37c4f470ca8af56361d4f8148')
        const respData = await resp.json()
        const newsData = respData.articles
        displayNews(newsData)
    } catch(err) {
        console.log("no internet")
    }
}

for(let i=0; i<categories.length; i++) {
    categories[i].onclick = async () => {
        const news = await fetchNewsByCategory(categories[i].dataset.category)
        console.log(news)
        displayNews(news)
    }
}

async function fetchNewsByCategory(category) {
    const resp = await fetch(`https://newsapi.org/v2/everything?q=${category}&sources=bbc-news&apiKey=5235a3e37c4f470ca8af56361d4f8148`)
    const respData = await resp.json()
    const news = respData.articles
    console.log(news)
    return news
}

async function displayNews(news) {
    newsContainer.innerHTML = ''
    news.forEach(news => allNews(news))
}

function allNews(news) {
    const el = document.createElement('div')
    el.classList.add('col-md-4')
    el.innerHTML = `
    <div class="card">
        <img class="card-img-top" src=${news.urlToImage} alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">${news.title}</h5>
          <p class="card-text">${news.content}</p>
          <a href=${news.url} target="_blank"  class="btn btn-primary">Read More</a>
        </div>
    </div>
    `
    newsContainer.appendChild(el)
}
