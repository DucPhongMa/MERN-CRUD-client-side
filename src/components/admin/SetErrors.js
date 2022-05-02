export const setErrors = (name, description, price, quantity) => {
    let errors = {};
    errors.name = name ? "" : "Name is empty"
    errors.description = description ? "" : "Description is empty"
    errors.price = price ? "" : "Price is empty"
    errors.quantity = quantity ? "" : "Quantity is empty"

    return errors;
}