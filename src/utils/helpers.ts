export function transformFormErrors(formErrors: { [field: string]: string[] }): { [field: string]: string} {
  const errors: { [key: string]: string} = {};
  if (formErrors) {
    for (let key in formErrors) {
      errors[key] = formErrors[key][0]; 
    }
  }

  return errors;
}