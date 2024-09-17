export const addressBuilder = (address) => {
  if (!address) {
    return "N/A";
  }

  const { street = "N/A", suite = "N/A", city = "N/A" } = address;
  
  return `${street}, ${suite}, ${city}`;
};