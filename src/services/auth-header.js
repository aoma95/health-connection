export default function authHeader() {
    let user = JSON.parse(sessionStorage.getItem('jwt'));
    if (user && user.access_token) {
        return { Authorization: 'Bearer ' + user.access_token };
    } else {
        return {};
    }
}
