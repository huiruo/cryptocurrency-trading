
//home
// const traderBaseUrl = 'http://192.168.50.5:10027'
//company
// const traderBaseUrl="http://172.16.1.141:8089"

const getTraderApiUrl = () => {
    switch (process.env.APP_ENV) {
        case 'dev':
            // return traderBaseUrl;
            return `/traderUrl`;
        case 'preprod':
            return '';
        case 'prod':
            //发布到开发环境写死解决跨域
            return 'http://192.168.50.5:10027'
        default:
            return '/trader';
    }
}

const traderApiUrl = getTraderApiUrl()

export {traderApiUrl}