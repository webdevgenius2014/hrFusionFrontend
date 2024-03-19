const apiURL = `${process.env.REACT_APP_API_BASE_URL}/`;

export const ImagePath = (path) => {
  return apiURL + path;
};

export const DemoCsv = (filePath) => {
  const link = document.createElement("a");
  link.href = filePath;
  // link.download = "filePath";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
