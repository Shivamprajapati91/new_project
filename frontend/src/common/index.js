

const backendDomain = process.env.REACT_APP_BACKEND_URL//"http://localhost:8080"


const SummaryApi={
    signUp: {
       url: `${backendDomain}/api/signup`,
       method: "post",
         mode: 'no-cors'
    },
    signin: {
        url: `${backendDomain}/api/signin`,
        method: "post",
         mode: 'no-cors'
    },
    current_user:{
        url: `${backendDomain}/api/user-details`,
        method: "get",
         mode: 'no-cors'
    },
    logout_user:{
       url: `${backendDomain}/api/user-logout`,
       method: 'get',
         mode: 'no-cors'
    },
    allUser: {
        url: `${backendDomain}/api/all-users`,
        method: 'get',
         mode: 'no-cors'
    },
    updateUser: {
        url: `${backendDomain}/api/update-user`,
        method: 'post',
         mode: 'no-cors'
    },
    uploadProduct: {
        url: `${backendDomain}/api/upload-product`,
        method: 'post',
         mode: 'no-cors'
    },
    allProduct: {
        url: `${backendDomain}/api/get-product`,
        method: 'get',
         mode: 'no-cors'
    },
    updateProduct: {
        url: `${backendDomain}/api/update-product`,
        method: 'post',
         mode: 'no-cors'
    },
    categoryProduct: {
        url: `${backendDomain}/api/get-categoryProduct`,
        method: 'get',
         mode: 'no-cors'
    },
    categoryWiseProduct: {
         url: `${backendDomain}/api/category-product`,
        method: 'post',
         mode: 'no-cors'
    },
    productDetails: {
        url: `${backendDomain}/api/product-details`,
        method: 'post',
         mode: 'no-cors'
    },
    addToCartProduct: {
        url : `${backendDomain}/api/addtocart`,
        method: 'post',
         mode: 'no-cors'
    },
    addToCartProductCount: {
        url : `${backendDomain}/api/countAddToCartProduct`,
        method: 'get',
         mode: 'no-cors'
    },
    addToCartProductView: {
        url:  `${backendDomain}/api/view-cart-product`,
        method: 'get',
         mode: 'no-cors'
    },
    updateCartProduct:{
         url:  `${backendDomain}/api/update-cart-product`,
         method: 'post',
         mode: 'no-cors'
    },
    deleteCartProduct: {
           url:  `${backendDomain}/api/delete-cart-product`,
            method: 'post',
         mode: 'no-cors'
    },
    searchProduct : {
           url:  `${backendDomain}/api/search`,
            method: 'get',
         mode: 'no-cors'
    },
    filterProduct: {
          url:  `${backendDomain}/api/filter-product`,
            method: 'post',
         mode: 'no-cors'
    },
    payment: {
        url:  `${backendDomain}/api/checkout`,
            method: 'post',
         mode: 'no-cors'
    },
    getOrder: {
         url:  `${backendDomain}/api/order-list`,
            method: 'get',
         mode: 'no-cors'
    }
    
}

export default SummaryApi
