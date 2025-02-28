const createKakaoMapURL = (address: string) => {
  const encodedAddress = encodeURIComponent(address);
  return `https://map.kakao.com/link/search/${encodedAddress}`;
};

export default createKakaoMapURL;
