 export const maxImageSize = 2000000
const validFileExtensions = { image: ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'] };
export const  validImageType=(fileName, fileType)=> {
  return fileName && validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1;
}