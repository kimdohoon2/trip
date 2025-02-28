export const filterAddress = (address: string) => {
  return address.split(' ').slice(0, 2).join(' ');
};

export const filterTitle = (title: string, maxLength: number = 12) => {
  return title.length > maxLength ? title.slice(0, maxLength) + '...' : title;
};
