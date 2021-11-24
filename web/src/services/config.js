// const API_BASE = 'http://192.168.50.5:10027'

const getApiBase = () => {
    switch (process.env.APP_ENV) {
        case 'dev':
            return '/trader';
        case 'preprod':
            return '';
        case 'prod':
            //发布到开发环境写死解决跨域
            return 'http://192.168.50.5:10027'
        default:
            return '/trader';
    }
}

export default getApiBase()