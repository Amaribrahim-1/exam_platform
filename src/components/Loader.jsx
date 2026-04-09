import { RippleLoader } from "react-loadly";

function Loader() {
  return (
    <RippleLoader
      size={45}
      color='#6c8ef5'
      speed={1}
      aria-label='Loading'
      showText={true}
      loadingText='Loading...'
      loaderCenter={true}
      count={3}
      borderWidth={4}
      secondaryColor='#e0e7ff'
    />
  );
}

export default Loader;
