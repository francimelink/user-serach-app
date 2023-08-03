const lightButton = document.getElementById('themeLight')
const darkButton = document.getElementById('themeDark')
const searchForm = document.querySelector("form")
const user = document.getElementById('user')


lightButton.addEventListener('click', switchTheme)
darkButton.addEventListener('click', switchTheme)


function switchTheme() {
    lightButton.classList.toggle('hide')
    darkButton.classList.toggle('hide')
    document.body.classList.toggle('dark')
    document.body.classList.toggle('light')
}

searchForm.addEventListener('submit', function (event) {
    event.preventDefault()
    let gitUsername = document.getElementById('search')
    gitUsername = gitUsername.value

    let url = `https://api.github.com/users/${gitUsername}`

    fetch(url)
        .then(response => {
            return response.json()
        })
        .then(data => {
            updateUser(data)
        })
        .catch(error => {
            console.error(error)
        })
})

function updateUser(userData) {
    console.log(userData);
    let userAvatarImg = document.querySelector('.user__avatar-img')
    let userName = document.querySelector('.user__data-name')
    let userAt = document.querySelector('.user__data-at')
    let userJoined = document.querySelector('.user__data-joined')

    userAvatarImg.setAttribute('src', userData.avatar_url)
    userName.textContent = userData.name;
    userAt.textContent = `@${userData.login}`;
    userJoined.textContent = `Joined ${userData.created_at}`

    user.classList.add('visible')

}


