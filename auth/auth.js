const authCard = document.getElementById("authCard");

const loginTab = document.querySelector(".login-tab");
const registerTab = document.querySelector(".register-tab");
const mainBtn = document.querySelector(".main-btn");

const emailInput = document.querySelector(".email-input");
const passwordInput = document.querySelector(".password-input");
const repeatInput = document.querySelector(".repeat-input");

let isRegisterMode = false;

repeatInput.style.display = "none";

loginTab.addEventListener("click", () => {
    isRegisterMode = false;

    authCard.src = "../image/ui/gl/login-card.png";

    repeatInput.style.display = "none";

    emailInput.value = "";
    passwordInput.value = "";
    repeatInput.value = "";
});

registerTab.addEventListener("click", () => {
    isRegisterMode = true;

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
    const { data, error } = await supabaseClient.auth.signUp({
        email,
        password
    });

    if (error) {
        alert("Ошибка регистрации: " + error.message);
        return;
    }

    const userId = data.user.id;

    const { error: profileError } = await supabaseClient
        .from("profiles")
        .insert([
            {
                id: userId,
                username: "NewPlayer",
                gold: 0,
                gems: 0,
                energy: 100,
                selected_character: "helin"
            }
        ]);

    if (profileError) {
        alert("Ошибка создания профиля: " + profileError.message);
        return;
    }

    alert("Аккаунт создан!");
    window.location.href = "../index.html";
}

async function loginUser(email, password) {
    const { error } = await supabaseClient.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        alert("Ошибка входа: " + error.message);
        return;
    }

    alert("Вход выполнен!");
    window.location.href = "../index.html";
}