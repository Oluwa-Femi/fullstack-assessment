/* eslint-disable import/no-mutable-exports */
import BASE_URL from "./constants";

let url;
let environment;

if (window.location.href.includes("localhost")) {
  environment = "dev";
  url = BASE_URL.staging;
} else if (window.location.href.includes("staging")) {
  environment = "staging";
  url = BASE_URL.staging;
} else {
  environment = "production";
  url = BASE_URL.production;
}
export default url;

export { environment };
