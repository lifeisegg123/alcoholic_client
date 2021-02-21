export const generateFormData = (data: any) => {
  const form = new FormData();
  Object.keys(data).forEach((key) => {
    form.append(key, data[key]);
  });
  return form;
};
