var ImageKit = require("imagekit");

var imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URLEND_POINT
});

async function uploadFile(file, filename) {

    const responce = await imagekit.upload({
        file: file,
        fileName: filename,
        folder: "ai-caption"
    });
    return responce;
}

module.exports = uploadFile