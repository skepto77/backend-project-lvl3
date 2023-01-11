import path from 'path';
import fs from 'fs/promises';
import axios from 'axios';
import parseUrl from 'parse-url';

const pageLoader = (url, pathToFolder) => {
  console.log(url);
  const { resource, pathname } = parseUrl(url);
  const filename = `${path
    .join(resource, pathname)
    .replace(/[^0-9a-zA-Z]/g, '-')}.html`;
  return axios
    .get(url)
    .then((response) => response.data)
    .then((data) => {
      fs.writeFile(path.join(pathToFolder, filename), data, (err) => {
        if (err) throw err;
      });
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export default pageLoader;
