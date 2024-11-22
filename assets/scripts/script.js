const API_GITHUB = 'https://api.github.com'

const API_GITHUB_USER = `${API_GITHUB}/users`

const profileFoto = document.getElementById('foto')
const profileNombre = document.getElementById('nombre')
const profileEnlace = document.getElementById('enlace')
const inputUsuario = document.getElementById('usuario')

//const prueba = document.getElementById('prueba')

//------------

// ---------------OBTENER DATOS

const cargarPerfil = async () => {
    // Validamos si ya existe el usuario
    const userData = JSON.parse(localStorage.getItem('user'))
    let user = {}

    if(userData) {
        user = {
            photo: userData.photo,
            name: userData.name,
            profileLink: userData.profileLink
        }

        console.log('obteniendo los datos desde el storage')

    } else {
        const response = await fetch(`${API_GITHUB_USER}/ActorXXX`)
        const data = await response.json()
    
        user = {
            photo: data.avatar_url,
            name: data.name,
            profileLink: data.html_url,
    }

    // guardando en el storage
        localStorage.setItem('user', JSON.stringify(user))

        console.log('obteniendo los datos con FETCH')
    }

    //mostrando los datos en la pantalla

    profileFoto.src = user.photo
    profileNombre.textContent = user.name
    profileEnlace.href = user.profileLink

    console.log(user)
}

cargarPerfil()


// creando un objeto
// sessionStorage.setItem('fruta', 'pera')



//const fruta = localStorage.getItem('fruta')

//console.log(fruta)

//prueba.textContent = fruta


// borrar lo que creamos

//localStorage.removeItem('fruta')