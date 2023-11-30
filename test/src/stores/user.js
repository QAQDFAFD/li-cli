import { defineStore } from 'pinia'
export const user = defineStore('userInfo', {
    state: () => {
        return {
            username: '',
            token: ''
        }
    }
})
