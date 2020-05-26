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
    temperature(){
        return[
            v => !!v || 'Température obligatoire',
            v => /^[+]?\d+(\.\d+)?$/.test(v) || 'Température invalide',
        ]
    }
    postalCode(){
        return[
            v => !!v || 'Code postal obligatoire',
            v => /^[0-9]{3,5}$/.test(v) || 'Code postal invalide',
        ]
    }
    minPower(maxPower){
        if (maxPower === '') {
            return [
                v => !!v || 'Puissance minimum obligatoire',
                v => /^[0-9]+$/.test(v) && v >= 0 || 'Valeur doit être un entier positif',
            ]
        } else {
            return [
                v => !!v || 'Puissance minimum obligatoire',
                v => parseInt(v,10) < parseInt(maxPower,10) || 'Doit être inférieur à la puissance maximum',
                v => /^[0-9]+$/.test(v) && v >= 0 || 'Valeur doit être un entier positif',
            ]
        }
    }
    maxPower(minPower){
        if (minPower === '') {
            return [
                v => !!v || 'Puissance maximum obligatoire',
                v => /^[0-9]+$/.test(v) && v >= 0 || 'Valeur doit être un entier positif',
            ]
        } else {
            return [
                v => !!v || 'Puissance maximum obligatoire',
                v => parseInt(v,10) > parseInt(minPower,10) || 'Doit être supérieur à la puissance minimum',
                v => /^[0-9]+$/.test(v) && v >= 0 || 'Valeur doit être un entier positif',
            ]
        }
    }
}

