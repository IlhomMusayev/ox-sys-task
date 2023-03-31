const localStorageKey = 'token'

async function logout() {
    window.localStorage.removeItem(localStorageKey)
}

export { logout, localStorageKey }
