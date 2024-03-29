import { addToCompare } from "../Redux/compareProductSlice";
import { requestFailure, requestStart, requestSuccess } from "../Redux/userSlice";
import { publicRequest, userRequest } from "../requestMethods/requestMethods";
import { failureToast, successToast } from "./apiCalls";




export const getIndexedProducts = async ({query, limit=0, sort }) => {
    try {
        const response = await publicRequest.get(`/products/find/indexed-query?search=${query}&limit=${limit}&sort=${sort}`)
        const {products} = response.data;
        return products;
    }
    catch (err) {
        console.log(err);
    }
}




export const handleReviewDelete = async ( user, id ) => {

    try {
        const response = await userRequest.delete(`/reviews/${id}/${user}`);
        window.location.reload(false);
        successToast(response.data.msg)

    }
    catch (err) {
        failureToast(err.response.data.msg);
        console.log(err);
    }
}





export const handleReviewPost = async (rating, comment, id) => {
    try {
        const response = await userRequest.post("/reviews", { rating, comment, product: id });
        window.location.reload(false);
        successToast(response.data.msg)
    }
    catch (err) {
        failureToast(err.response.data.msg);
        console.log(err);
    }
}



export const updateFeatured = async ( products ) => {
    try {
        const response = await userRequest.patch("/products/update/featured", {products});
        console.log(response.data);
        successToast("Featured products updated!")
    }
    catch (err) {

    }
}


export const getFeatured = async (  ) => {
    try {
        const response = await publicRequest.get("/products/find/featured");
        const products = response.data.map((prod) => {
            return { ...prod, image: prod.images[0] }
        })
        return products;
    }
    catch (err) {
        console.log(err);
    }
}


export const addToCompareP = async ( dispatch, productId) => {
    try {
        const product = await getOneProduct(productId);
        dispatch(addToCompare(product));
    }
    catch (err) {
        console.log(err);
    }
}



export const getAllProducts = async ({ sort, limitPrice, subIds, limit, search}) => {
    try {
        let endpoint = "/products?"
        if (sort)  endpoint += `sort=${sort}&`
        if (limitPrice) endpoint += `limitprice=${limitPrice}&`
        if (subIds) endpoint += `subIds=${subIds}&`
        if (limit) endpoint += `limit=${limit}&`
        if (search) endpoint += `search=${search}&`

        // console.log(endpoint);   
        const response = await publicRequest.get(endpoint);
        return response.data;
    }
    catch (err) {
        console.log(err);
    }
}



export const getOneProduct = async (id) => {
    try {
        console.log("getOne Product");
        const response = await publicRequest.get(`/products/${id}`);
        return response.data;
    }
    catch (err) {
        console.log(err);
    }
}





export const addProductAdmin = async (dispatch, values) => {
    dispatch(requestStart())
    const formData = new FormData();

    for (let key in values) {
        if (key === "images" ) {
            values.images.forEach((image) => {
                formData.append(`images`, image);
            });
        }
        else {
            formData.append(key, values[key]);
        }
    }

    try {
        await userRequest.post("/products", formData)
        successToast("Product added in the system")
        dispatch(requestSuccess())
    }
    catch (err) {
        console.log(err.response.data);
        failureToast(err.response?.data)
        dispatch(requestFailure())
    }
}




export const editProductAdmin = async (dispatch, values, id) => {
    dispatch(requestStart())
    const formData = new FormData();
    for (let key in values) {
        if (key === "images" ) {
            values.images.forEach((image) => {
                formData.append(`images`, image);
            });
        }
        else {
            formData.append(key, values[key]);
        }
    }

    

    try {
        await userRequest.patch(`/products/${id}`, formData)
        successToast("Product updated")
        dispatch(requestSuccess())
    }
    catch (err) {
        console.log(err.response.data);
        failureToast("Problem updating the product info.")
        dispatch(requestFailure())
    }
}



export const deleteProductAdmin = async (id) => {
    try {
        await userRequest.delete(`/products/${id}`)
        successToast("Product deleted")
    }
    catch (err) {
        console.log(err.response.data);
        failureToast("Problem deleting product")
    }
}



