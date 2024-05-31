import { Link } from 'react-router-dom';
import { SignGoogle } from '../../features/authentication/SignGoogle';
import { SignIn } from '../../features/authentication/SignIn';
import { useGetRandomImgApi } from '../../hooks/useGetRandomImgApi';

export const SignInPage = () => {
  const apiUrl =
    'https://api.vam.ac.uk/v2/objects/search?q=oil%20canvas&min_length=2&max_length=16&images_exist=true&order_sort=asc&page=1&page_size=15&cluster_size=20&images=false&random=false';
  const { imageId, loading, systemNumber } = useGetRandomImgApi(apiUrl);

  return (
    <div className="signinpage-wrapper">
      {!loading && imageId && (
        <div
          className={`imgsign-wrapper`}
          key={imageId}
          style={{
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'auto',
            backgroundImage: `url(https://framemark.vam.ac.uk/collections/${imageId}/full/full/0/default.jpg)`,
          }}
        >
          {loading ? <div>Loading...</div> : null}
          <Link className="expanded-anchor" to={`/art-piece/${systemNumber}`}></Link>
        </div>
      )}
      <div className="sign-wrapper">
        <div className="sign__content">
          <h4 className="h4--bold">Sign In to ArtViewer</h4>
          <SignGoogle label="Sign In With Google" />
          <div className="sing__separator">
            <hr />
            <p className="p--separator">or sign in with email</p>
            <hr />
          </div>
          <SignIn />
          <div className="noaccount-wrapper">
            <p className="subtext">Don't have an account?</p>
            <a href="/signup">Sign Up</a>
          </div>
        </div>
      </div>
    </div>
  );
};
