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
    const possible = "AABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    for (let i = 0; i < 1; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
};

//8 character minimum
export const getRandomPassword = () => {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    for (let i = 0; i < 8; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
};

export const user = () => ({
    name: getRandomName(),
    email: getUniqueEmail(),
    password: getRandomPassword()
});