export class Rules {
    password(){
        return[
            v => !!v || 'Mot de passe obligatoire',
            v => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,20}$/.test(v) || 'compris entre 6 et 20 caractères qui contient au moins une lettre minuscule, une lettre majuscule, un chiffre numérique, et un caractère spécial',
        ]
    }
    cPassword(pass){
        return[
            v => !!v || 'Mot de passe obligatoire',
            v => v == pass || 'Mot de passe pas identique',
        ]
    }
}

