import ContentLoader from 'react-content-loader';

function Skeleton() {
  return (
    <ContentLoader
      speed={2}
      width={240}
      height={350}
      viewBox="0 0 260 350"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      >
      <rect x="0" y="1" rx="10" ry="10" width="250" height="210" />
      <rect x="33" y="224" rx="10" ry="10" width="190" height="30" />
      <rect x="11" y="298" rx="10" ry="10" width="100" height="40" />
      <circle cx="215" cy="314" r="27" />
    </ContentLoader>
  );
}

export default Skeleton;
