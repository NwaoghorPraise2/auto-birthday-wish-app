import { AnyZodObject } from "zod";

/**
 * @desc Interface for request validators using Zod schema objects
 */
export default interface RequestValidators {
    body?: AnyZodObject;    // Validator for request body
    params?: AnyZodObject;  // Validator for request URL parameters
    query?: AnyZodObject;   // Validator for request query parameters
}