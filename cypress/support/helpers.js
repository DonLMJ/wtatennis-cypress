export const urls = {
    userPreferences: '**/user/preferences',
    loginActions: '**/login-actions/**',
    appleLogin: '**/auth/realms/wta/broker/apple/login*',
    // Add other URL mappings here
};

export const uuid = () => Date.now();

//at least one character beofre whatver email domain like text@text.text works
export const getUniqueEmail = () => `fake_+${uuid()}@email.com`;

//1 character minimum max is unlimited??, every character allowed, name and surname can be the same
export const getRandomName = () => {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    const length = Math.floor(Math.random() * 30) + 1; // Random length between 1 and 30
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

export const getRandomPassword = () => {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    const length = Math.floor(Math.random() * 23) + 8; // Random length between 8 and 30
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

export const user = () => ({
    name: getRandomName(),
    email: getUniqueEmail(),
    password: getRandomPassword()
});