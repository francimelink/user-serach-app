
const app = Vue.createApp({
    data() {
        return {
            userAvatarImg: '',
            userName: '',
            userAt: '',
            userJoined: '',
            userDesc: '',
            userPubRepo: 0,
            userFollowers: 0,
            userFollowing: 0,
            userLocation: '',
            userWebsite: '',
            userTwitter: '',
            userCompany: '',
            isVisible: false,
            month: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Otc', 'Nov', 'Dec']
        }
    },
    methods: {
        updateUser: function (userData) {
            const user = document.getElementById('user')
            this.userAvatarImg = userData.avatar_url
            this.userName = userData.name;
            this.userAt = `@${userData.login}`;


            // format joined date to 25 Jan 2011
            let joinedAt = new Date(userData.created_at);
            this.userJoined = `Joined ${joinedAt.getDate()} ${this.month[joinedAt.getMonth()]} ${joinedAt.getFullYear()}`

            // TODO: fullfill all other data.


            user.classList.add('visible')
        },
        switchTheme: function () {
            const lightButton = document.getElementById('themeLight')
            const darkButton = document.getElementById('themeDark')

            lightButton.classList.toggle('hide')
            darkButton.classList.toggle('hide')
            document.body.classList.toggle('dark')
            document.body.classList.toggle('light')
        },

        searchUser: function () {
            let gitUsername = document.getElementById('search')
            let errMsg = 'No results'
            gitUsername = gitUsername.value

            let url = `https://api.github.com/users/${gitUsername}`

            fetch(url)
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    this.updateUser(data)
                })
                .catch(error => {
                    // TODO: error hadeling. Show msg
                    console.log(error);
                })
        }

    }
})

app.mount('#app')