import { beforeToday } from "./dateUtils.js"

export default {

    required (v) {
        return (typeof v !== 'undefined') && (v !== null) && (v !== '')
    },

    minLength (v, par) {
        return typeof v === 'string' && v.length >= par
    },

    maxLength (v, par) {
        return typeof v === 'string' && v.length <= par
    },
    finishInPast (v) {
        return beforeToday(v)
    }
}