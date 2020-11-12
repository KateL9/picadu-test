// Создаем переменную, в которую положим кнопку меню
let menuToggle = document.querySelector('#menu-toggle');
// Создаем переменную, в которую положим меню
let menu = document.querySelector('.sidebar');
// отслеживаем клик по кнопке меню и запускаем функцию 
menuToggle.addEventListener('click', function(event) {
    // отменяем стандартное поведение ссылки
    event.preventDefault();
    // вешаем класс на меню, когда кликнули по кнопке меню 
    menu.classList.toggle('visible');
})

const loginElement = document.querySelector('.login');
const loginForm = document.querySelector('.login-form');
const emailInput = document.querySelector('.login-email');
const passwordlInput = document.querySelector('.login-password');
const loginSignup = document.querySelector('.login-signup');

const userElem = document.querySelector('.user');
const userNameElem = document.querySelector('.user-name');


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
        const user = this.getUser(email);
        if (user && user.password === password) {
            this.authorizedUser(user);
            handler();
        } else {
            alert("The user doesn't exsist")
        }
    },
    logOut() {
        console.log('logIOut')
    },
    signUp(email, password, handler) {
        if (!this.getUser(email)) {
            const user = { email, password, displayName: this.getUsername(email) };
            listUsers.push(user);
            this.authorizedUser(user);
            handler();
        } else {
            alert('The user already exsists')
        }
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

const toggleAuthDom = () => {
    const user = setUsers.user;
    console.log('user: ', user);

    if (user) {
        loginElement.style.display = 'none';
        userElem.style.display = '';
        userNameElem.textContent = user.displayName;
    } else {
        loginElement.style.display = '';
        userElem.style.display = 'none';
    }
};

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const emailValue = emailInput.value;
    const passwordValue = passwordlInput.value;

    setUsers.logIn(emailValue, passwordValue, toggleAuthDom);
});

loginSignup.addEventListener('click', (event) => {
    event.preventDefault();
    const emailValue = emailInput.value;
    const passwordValue = passwordlInput.value;

    setUsers.signUp(emailValue, passwordValue, toggleAuthDom);
});

toggleAuthDom();
