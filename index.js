const newsContainer = document.querySelector('.news-container')
const categories = document.querySelectorAll('.nav-item .nav-link')
const searchBtn = document.getElementById('search-btn')
const searchTerm = document.getElementById('search-term')
const spinner = document.getElementById('spinner')

fetchNews()

async function fetchNews() {
    try{
        const resp = await fetch('https://newsapi.org/v2/everything?sources=bbc-news&apiKey=5235a3e37c4f470ca8af56361d4f8148')
        console.log(resp)
        const respData = await resp.json()
        const newsData = respData.articles
        displayNews(newsData)
    } catch(err) {
        console.log("error while fetching results")
    }
}

for(let i=0; i<categories.length; i++) {
    categories[i].onclick = async () => {
        const news = await fetchNewsByTerm(categories[i].dataset.category)
        displayNews(news)
    }
}

async function fetchNewsByTerm(term) {
    displayLoading(true)
    const resp = await fetch(`https://newsapi.org/v2/everything?q=${term}&sources=bbc-news&apiKey=5235a3e37c4f470ca8af56361d4f8148`)
    const respData = await resp.json()
    displayLoading(false)
    const news = respData.articles
    return news
}

searchBtn.onclick = async () => {
    let term = searchTerm.value
    const news = await fetchNewsByTerm(term)
    displayNews(news)
}

async function displayNews(news) {
    newsContainer.innerHTML = ''
    news.forEach(news => allNews(news))
}

function allNews(news) {
    const el = document.createElement('div')
    const{urlToImage, title, content} = news
    el.classList.add('col-md-4')
    el.innerHTML = `
    <div class="card mt-20">
        <img class="card-img-top" src=${urlToImage} alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">${title.slice(0, 46)}...</h5>
          <p class="card-text">${content.slice(0, 118)}...</p>
          <a href=${news.url} target="_blank"  class="btn btn-primary">Read More</a>
        </div>
    </div>
    `
    newsContainer.appendChild(el)
}

function displayLoading(isLoading) {
    if(isLoading) {
        spinner.src = 'loading.gif'
        spinner.style.display = 'block'
    } else {
        spinner.src=''
        spinner.style.display = 'none'
    }
}
