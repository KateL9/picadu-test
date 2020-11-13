// Создаем переменную, в которую положим кнопку меню
let menuToggle = document.querySelector('#menu-toggle');
// Создаем переменную, в которую положим меню
let menu = document.querySelector('.sidebar');


const regExpValidEmail = /^\w+@\w+\.\w{2,}$/;

const loginElement = document.querySelector('.login');
const loginForm = document.querySelector('.login-form');
const emailInput = document.querySelector('.login-email');
const passwordlInput = document.querySelector('.login-password');
const loginSignup = document.querySelector('.login-signup');

const userElem = document.querySelector('.user');
const userNameElem = document.querySelector('.user-name');

const exitElem = document.querySelector('.exit');
const editElem = document.querySelector('.edit');
const editContainer = document.querySelector('.edit-container');

const editUsername = document.querySelector('.edit-username');
const editPhotoURL = document.querySelector('.edit-photo');
const userAvatarElem = document.querySelector('.user-avatar');

const postsWrapper = document.querySelector('.posts');

const listUsers = [{
        id: '01',
        email: 'maks@mail.com',
        password: '12345',
        displayName: 'MaksJS'
    },
    {
        id: '02',
        email: 'kate@mail.com',
        password: '123456',
        displayName: 'KateKillMaks'
    }
];

const setUsers = {
    user: null,
    logIn(email, password, handler) {
        if (!regExpValidEmail.test(email)) return alert('Invalid email!');
        const user = this.getUser(email);
        if (user && user.password === password) {
            this.authorizedUser(user);
            handler();
        } else {
            alert("The user doesn't exsist")
        }
    },

    logOut(handler) {
        this.user = null;
        handler();
    },

    signUp(email, password, handler) {
        if (!regExpValidEmail.test(email)) return alert('Invalid email!');

        if (!email.trim() || !password.trim()) {
            alert('Введите данные');
            return;
        }
        if (!this.getUser(email)) {
            const user = { email, password, displayName: this.getUsername(email) };
            // displayName: email.substring(0, email.indexOf('@'))
            listUsers.push(user);
            this.authorizedUser(user);
            handler();
        } else {
            alert('The user already exsists')
        }
    },

    editUser(userName, userPhoto = '', handler) {
        if (userName) {
            this.user.displayName = userName;
        }
        if (userPhoto) {
            this.user.photo = userPhoto;
        }
        handler();
    },

    getUser(email) {
        return listUsers.find(item => item.email === email)
            // find((item) => {
            //   return item.email === email;
            // })
    },

    authorizedUser(user) {
        this.user = user;
    },

    getUsername(email) {
        var array = email.split("@");
        array.pop();
        var username = array.join("");
        return username;
    }
};

const setPosts = {
    allPosts: [{
            title: 'Заголовок поста1',
            text: 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты.',
            tags: ['свежее', 'новое', 'горячее', 'мое', 'случайность'],
            author: 'maks@mail.com',
            date: '11.11.2020, 01:07:00',
            likes: 25,
            comments: 40
        },
        {
            title: 'Заголовок поста2',
            text: 'Officia esse eiusmod ut et fugiat ullamco laborum nulla labore deserunt nostrud incididunt tempor. Elit commodo irure eu laboris nulla culpa irure incididunt. Dolore fugiat eiusmod officia veniam fugiat dolor non. Dolor esse sit culpa ut minim sit dolore.',
            tags: ['свежее', 'новое', 'горячее', 'случайность'],
            author: 'kate@mail.com',
            date: '11.11.2020, 01:07:00',
            likes: 5,
            comments: 2
        }
    ],
};

const toggleAuthDom = () => {
    const user = setUsers.user;
    console.log('user: ', user);

    if (user) {
        loginElement.style.display = 'none';
        userElem.style.display = '';
        userNameElem.textContent = user.displayName;
        userAvatarElem.src = user.photo || userAvatarElem.src;
    } else {
        loginElement.style.display = '';
        userElem.style.display = 'none';
    }
};


const showAllPosts = () => {
    let postsHTML = '';
    setPosts.allPosts.forEach(post => {
        postsHTML += `
        <section class="post">
                <div class="post-body">
                    <h2 class="post-title">${post.title}</h2>
                    <p class="post-text">${post.text}</p>
                    <div class="tags">
                        <a href="#" class="tag">#свежее</a>
                    </div>
                    <!-- /.tags -->
                </div>
                <!-- /.post-body -->
                <div class="post-footer">
                    <div class="post-buttons">
                        <button class="post-button likes">
              <svg width="19" height="20" class="icon icon-like">
                <use xlink:href="img/icons.svg#like"></use>
              </svg>
              <span class="likes-counter">26</span>
            </button>
                        <button class="post-button comments">
              <svg width="21" height="21" class="icon icon-comment">
                <use xlink:href="img/icons.svg#comment"></use>
              </svg>
              <span class="comments-counter">157</span>
            </button>
                        <button class="post-button save">
              <svg width="19" height="19" class="icon icon-save">
                <use xlink:href="img/icons.svg#save"></use>
              </svg>
            </button>
                        <button class="post-button share">
              <svg width="17" height="19" class="icon icon-share">
                <use xlink:href="img/icons.svg#share"></use>
              </svg>
            </button>
                    </div>
                    <!-- /.post-buttons -->
                    <div class="post-author">
                        <div class="author-about">
                            <a href="#" class="author-username">arteislamov</a>
                            <span class="post-time">5 минут назад</span>
                        </div>
                        <a href="#" class="author-link"><img src="img/avatar.jpeg" alt="avatar" class="author-avatar"></a>
                    </div>
                    <!-- /.post-author -->
                </div>
                <!-- /.post-footer -->
            </section>
        `;
    });

    postsWrapper.innerHTML = postsHTML;
};

const init = () => {

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const emailValue = emailInput.value;
        const passwordValue = passwordlInput.value;

        setUsers.logIn(emailValue, passwordValue, toggleAuthDom);
        loginForm.reset();
    });

    loginSignup.addEventListener('click', (event) => {
        event.preventDefault();
        const emailValue = emailInput.value;
        const passwordValue = passwordlInput.value;

        setUsers.signUp(emailValue, passwordValue, toggleAuthDom);
        loginForm.reset();
    });

    exitElem.addEventListener('click', event => {
        event.preventDefault();
        setUsers.logOut(toggleAuthDom);

    })

    editElem.addEventListener('click', event => {
        event.preventDefault();
        editContainer.classList.toggle('visible');
        editUsername.value = setUsers.user.displayName;
    });

    editContainer.addEventListener('submit', event => {
        event.preventDefault();
        setUsers.editUser(editUsername.value, editPhotoURL.value, toggleAuthDom);
        editContainer.classList.remove('visible');
    });

    // отслеживаем клик по кнопке меню и запускаем функцию 
    menuToggle.addEventListener('click', function(event) {
        // отменяем стандартное поведение ссылки
        event.preventDefault();
        // вешаем класс на меню, когда кликнули по кнопке меню 
        menu.classList.toggle('visible');
    });

    showAllPosts();
    toggleAuthDom();
};

document.addEventListener('DOMContentLoaded', init);