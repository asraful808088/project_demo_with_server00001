import { get, remove, set } from 'js-cookie'

export default function setCookie(cookieName,userData){
    set(cookieName,userData,{
        expires:1,
        sameSite:"Strict",
        path:"/",
        secure:true
    })
}
function getCookie(cookieName){
    return get(cookieName)

}
function removeCookie(cookieName){
    return remove(cookieName)
}

export { getCookie, removeCookie }

