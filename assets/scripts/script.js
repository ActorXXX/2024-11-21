// La ruta base
const API_GITHUB = 'https://api.github.com'

// TEMPLATE STRING - Completando la ruta
const API_GITHUB_USER = `${API_GITHUB}/users`


const profileFoto = document.getElementById('foto')
const profileNombre = document.getElementById('nombre')
const profileEnlace = document.getElementById('enlace')
const inputUsuario = document.getElementById('usuario')
const inputBoton = document.getElementById('buscaPerfil')

console.log(inputUsuario.value)
//const prueba = document.getElementById('prueba')

//----OBTENER USUARIO
inputBoton.addEventListener('click', () => {
    const username = inputUsuario.value
    console.log(username)

    cargarPerfil(username)
})

// ----OBTENER DATOS

const cargarPerfil = async (username) => {
    const userData = JSON.parse(localStorage.getItem('user'))
    // Validamos si ya existe el usuario
    let user = userData

    if(username) {
        if(userData) {
            if(username != userData.username) {
                const response = await fetch(`${API_GITHUB_USER}/${username}`)
                const data = await response.json()

                user = {
                    username: data.login,
                    photo: data.avatar_url,
                    name: data.name,
                    profileLink: data.html_url
                }

                localStorage.setItem('user', JSON.stringify(user))
            } else {
                user = {
                    username: userData.login,
                    photo: userData.avatar_url,
                    name: userData.name,
                    profileLink: userData.html_url
                }

                console.log('Obteniendo los datos desde el Storage')
            }

        } else {
            if(username != null || username !== userData.username) {
                const response = await fetch(`${API_GITHUB_USER}/${username}`)
                const data = await response.json()
    
                user = {
                    username: data.login,
                    photo: data.avatar_url,
                    name: data.name,
                    profileLink: data.html_url
                }
                localStorage.setItem('user', JSON.stringify(user))
            }
            console.log('Obteniendo los datos con fetch')
        }
    }

    // Mostrando los datos en pantalla

    if(user) {
        profileFoto.src = user.photo
        profileNombre.textContent = user.name
        profileEnlace.href = user.profileLink
    } else {
        return
    }
}

//cargarPerfil()
