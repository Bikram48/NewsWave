const newsContainer = document.querySelector('.news-container')
const categories = document.querySelectorAll('.nav-item .nav-link')
const searchBtn = document.getElementById('search-btn')
const searchTerm = document.getElementById('search-term')
const spinner = document.getElementById('spinner')
const loadMoreBtn = document.getElementById('loadmore-btn')
let page = 1
let data = []
let isCategory = false
let category = ''

fetchNews()

loadMoreBtn.onclick = async() => {
    page += 1
    if(!isCategory) {
        fetchNews(page)
    } else {
        const data = await fetchNewsByTerm(category)
        displayNews(data)
    }
}

async function fetchNews(page=1) {
    try{
        const resp = await fetch(`https://newsapi.org/v2/everything?sources=bbc-news&apiKey=5235a3e37c4f470ca8af56361d4f8148&page=${page}&pageSize=9`)
        const respData = await resp.json()
        const newsData = respData.articles
        data.push(...newsData)
        displayNews(data)
 
    } catch(err) {
        console.log("error while fetching results")
    }
}

for(let i=0; i<categories.length; i++) {
    categories[i].onclick = async () => {
        data = []
        page = 1
        category = categories[i].dataset.category
        const news = await fetchNewsByTerm(category)
        displayNews(news)
    }
}

async function fetchNewsByTerm(term) {
    isCategory = true
    displayLoading(true)
    const resp = await fetch(`https://newsapi.org/v2/everything?q=${term}&sources=bbc-news&apiKey=5235a3e37c4f470ca8af56361d4f8148&page=${page}&pageSize=9`)
    const respData = await resp.json()
    displayLoading(false)
    const news = respData.articles
    data.push(...news)
    return data
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
        spinner.style.display = 'block'
    } else {
        spinner.style.display = 'none'
    }
}
