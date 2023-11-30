export default [
    {
        url: '/api/user/login',
        method: 'post',
        response: () => {
            return {
                code: 200,
                data: {
                    name: 'vben1'
                }
            }
        }
    },
    {
        url: '/api/user/register',
        method: 'post',
        response: {
            code: 200,
            data: {
                name: 'vben2'
            }
        }
    },
    {
        url: '/api/user/getUserInfo',
        method: 'get',
        response: {
            code: 200,
            data: {
                name: 'vben3'
            }
        }
    }
]
