/* eslint-disable no-undef */
import { join } from 'path';
import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.2',
  info: {
    title: 'API-Documentation-Mono-Assessment', // Title of the documentation
    version: '1.0.0', // Version of the app
    description:
      "Femi Oluwatolas swagger documentation for the fullstack assessment.", // short description of the app
  },
};
const dir = join(__dirname, '..', '/');

const options = {
  swaggerDefinition,
  // path to the API docs
  apis: [`${dir}/**/*.yaml`],
};

// initialize swagger-jsdoc
export default swaggerJSDoc(options);
