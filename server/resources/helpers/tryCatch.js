import { failure } from "./response";

export default (method) => async (req, res) => {
  try {
    return await method(req, res);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return failure(503, "error", "Some error occurred", res);
  }
};
