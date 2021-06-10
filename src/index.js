import path from 'path';
import fs from 'fs';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';
import parseUrl from 'parse-url';

axios.defaults.adapter = httpAdapter;

const pageLoader = (url, pathToFolder) => {
  const { resource, pathname } = parseUrl(url);
  const filename = `${path.join(resource, pathname).replace(/[^0-9a-zA-Z]/g, '-')}.html`;
  return axios.get(url)
    .then((response) => response.data)
    .then((data) => {
      fs.writeFile(path.join(pathToFolder, filename), data, (err) => {
        if (err) throw err;
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export default pageLoader;
