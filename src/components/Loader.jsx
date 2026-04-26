import { RippleLoader } from "react-loadly";

function Loader() {
  return (
    <div className='flex h-screen items-center justify-center'>
      <RippleLoader
        size={45}
        color='var(--color-primary)'
        speed={1}
        aria-label='Loading'
        showText={true}
        loadingText='Loading...'
        loaderCenter={true}
        count={3}
        borderWidth={4}
        secondaryColor='var(--color-warning)'
      />
    </div>
  );
}

export default Loader;
