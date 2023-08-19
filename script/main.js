
const app = Vue.createApp({
    data() {

        return {
            userAvatarImg: '',
            userName: '',
            userAt: '',
            userJoined: '',
            userBio: '',
            userPubRepo: 0,
            userFollowers: 0,
            userFollowing: 0,
            userLocation: '',
            userWebsite: '',
            userTwitter: '',
            userCompany: '',
            isVisible: false,
            month: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Otc', 'Nov', 'Dec'],
            notAvailablePlaceholder: 'Not Available'
        }
    },
    methods: {
        updateUser: function (userData) {

            const user = document.getElementById('user')
            this.userAvatarImg = userData.avatar_url
            this.userAt = `@${userData.login}`

            this.userPubRepo = userData.public_repos
            this.userFollowers = userData.followers
            this.userFollowing = userData.following

            this.userName = userData.name;
            if (!userData.name) this.userName = this.notAvailablePlaceholder

            this.userBio = userData.bio
            if (!userData.bio) this.userBio = this.notAvailablePlaceholder

            this.userLocation = userData.location
            if (!userData.location) this.userLocation = this.notAvailablePlaceholder

            this.userWebsite = userData.html_url
            if (!userData.html_url) this.userWebsite = this.notAvailablePlaceholder

            this.userTwitter = userData.twitter_username
            if (!userData.twitter_username) this.userTwitter = this.notAvailablePlaceholder

            this.userCompany = userData.company
            if (!userData.company) this.userCompany = this.notAvailablePlaceholder

            let joinedAt = new Date(userData.created_at);
            this.userJoined = `Joined ${joinedAt.getDate()} ${this.month[joinedAt.getMonth()]} ${joinedAt.getFullYear()}`

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
            gitUsername = gitUsername.value

            let url = `https://api.github.com/users/${gitUsername}`
            try {
                fetch(url)
                    .then(response => {
                        if (response.status === 200) {
                            return response.json()
                        }
                    })
                    .then(data => {
                        this.updateUser(data)
                    })
                    .catch(error => {
                        // TODO: error msg
                        console.log(error);
                    })

            } catch (error) {
                console.log(error);
            }
        }

    }
})

app.mount('#app')