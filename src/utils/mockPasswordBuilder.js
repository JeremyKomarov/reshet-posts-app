export const mockPasswordBuilder = (name) => {
  const firstName = name.split(" ")[0].toLowerCase();
  
  return `${firstName}123`;
};