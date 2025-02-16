import client from "./client";

const getImages = () => {
    console.log("Inside getImages")
    return client.get("/images");
}

export default {
    getImages,
}