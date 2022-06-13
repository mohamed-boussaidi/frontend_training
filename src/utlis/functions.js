export function getProductListFromArray(data){
    var dataString=""
    data.map((item,index)=>{
        if(data.length===index+1){
            dataString+=item.nom

        }else{
            dataString+=item.nom+", "
        }
    })
    return dataString
}
const createImage = (url) =>
    new Promise((resolve, reject) => {
        const image = new Image()
        image.addEventListener('load', () => resolve(image))
        image.addEventListener('error', error => reject(error))
        image.setAttribute('crossOrigin', 'anonymous')
        image.src = url
    })

export const getCroppedImg = async (imageSrc, crop) => {
    const image = await createImage(imageSrc)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    /* setting canvas width & height allows us to
    resize from the original image resolution */
    canvas.width = 250
    canvas.height = 250

    ctx.drawImage(
        image,
        crop.x,
        crop.y,
        crop.width,
        crop.height,
        0,
        0,
        canvas.width,
        canvas.height
    )
    const base64=canvas.toDataURL('image/jpeg');
    return base64
}
export function dataURLtoFile(dataurl, filename) {

    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, {type:mime});
}
export function join_String(data) {
    var string = "";
    data.map((item, index) => {
        if (data.length !== index + 1) {
            string = string + "" + item.label + ",";
        } else {
            string = string + "" + item.label;
        }
    })
    return string
}
export function join_String_save(data) {
    var string = "";
    data.map((item, index) => {
        if (data.length !== index + 1) {
            string = string + "" + item.value + ",";
        } else {
            string = string + "" + item.value;
        }
    })
    return string
}
export function array_to_select_options_list(data) {
    const data_array = [];
    data.map((item) => {
        var itemdata = {value: item, label: item};
        data_array.push(itemdata)
    })
    return data_array
}


