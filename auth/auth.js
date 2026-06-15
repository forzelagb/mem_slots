const authCard = document.getElementById("authCard");

const loginTab = document.querySelector(".login-tab");
const registerTab = document.querySelector(".register-tab");
const mainBtn = document.querySelector(".main-btn");

const emailInput = document.querySelector(".email-input");
const passwordInput = document.querySelector(".password-input");
const repeatInput = document.querySelector(".repeat-input");

let isRegisterMode = false;
const changeDataBtn = document.querySelector(".change-data-btn");

let isVerifyMode = false;
let pendingEmail = "";
let pendingPassword = "";
document.body.classList.add("login-mode");
repeatInput.style.display = "none";

loginTab.addEventListener("click", () => {
    isRegisterMode = false;

    document.body.classList.remove("register-mode");
    document.body.classList.add("login-mode");

    authCard.src = "../image/ui/gl/login-card.png";

    repeatInput.style.display = "none";

    emailInput.value = "";
    passwordInput.value = "";
    repeatInput.value = "";
});

registerTab.addEventListener("click", () => {
    isRegisterMode = true;

    document.body.classList.remove("login-mode");
    document.body.classList.add("register-mode");

    authCard.src = "../image/ui/gl/register-card.png";

    repeatInput.style.display = "block";

    emailInput.value = "";
    passwordInput.value = "";
    repeatInput.value = "";
});

mainBtn.addEventListener("click", async () => {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const repeatPassword = repeatInput.value.trim();

    if (!email || !password) {
        alert("Заполни Email и Пароль");
        return;
    }

    if (isRegisterMode && password !== repeatPassword) {
        alert("Пароли не совпадают");
        return;
    }

    if (isRegisterMode) {
        await registerUser(email, password);
    } else {
        await loginUser(email, password);
    }
});

async function registerUser(email, password) {
    mainBtn.disabled = true;

    const { error } = await supabaseClient.auth.signUp({
        email,
        password
    });

    if (error) {
        alert("Ошибка регистрации: " + error.message);
        mainBtn.disabled = false;
        return;
    }

    pendingEmail = email;
pendingPassword = password;
isVerifyMode = true;

document.body.classList.remove("register-mode");
document.body.classList.add("verify-mode");
authCard.src = "../image/ui/gl/code.png";
mainBtn.disabled = false;
}

async function loginUser(email, password) {
    mainBtn.disabled = true;

    const { error } = await supabaseClient.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        alert("Ошибка входа: " + error.message);
        mainBtn.disabled = false;
        return;
    }

    const {
        data: { user }
    } = await supabaseClient.auth.getUser();

    await createProfileIfNotExists(user);

    alert("Вход выполнен!");
    window.location.href = "../index.html";
}

async function createProfileIfNotExists(user) {
    const { data: existingProfile } = await supabaseClient
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

    if (existingProfile) {
        return;
    }

    const username = user.email.split("@")[0];

    const { error } = await supabaseClient
        .from("profiles")
        .insert([
            {
                id: user.id,
                username: username,
                gold: 0,
                gems: 0,
                energy: 100,
                selected_character: "helin"
            }
        ]);

    if (error) {
        alert("Ошибка создания профиля: " + error.message);
    }
}   

changeDataBtn.addEventListener("click", () => {
    isVerifyMode = false;

    document.body.classList.remove("verify-mode");
    document.body.classList.add("register-mode");

    authCard.src = "../image/ui/gl/register-card.png";

emailInput.value = "";
passwordInput.value = "";
repeatInput.value = "";
});