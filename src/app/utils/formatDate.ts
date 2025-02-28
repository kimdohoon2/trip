interface DateString {
  (dateString: string): string;
}

const formatDate: DateString = (dateString) => {
  const year = dateString.slice(0, 4);
  const month = dateString.slice(4, 6);
  const day = dateString.slice(6, 8);
  return new Date(`${year}-${month}-${day}`).toLocaleDateString().replace(/\.$/, '');
};

export default formatDate;
