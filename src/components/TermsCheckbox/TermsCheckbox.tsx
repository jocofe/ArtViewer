import { TermsCheckboxProps } from '../../models/terms-checkbox';

export const TermsCheckbox = ({ checked, onChange }: TermsCheckboxProps) => {
  return (
    <div className="politics-form">
      <input type="checkbox" id="terms" checked={checked} onChange={onChange} />
      <div className="sign-up-page-politics">
        <p className="sign-up-page__terms">
          By creating an account you agree with our
          <a className="sign-up-page__link" href="">
            Terms of Service
          </a>
          and{' '}
          <a className="sign-up-page__link" href="">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};
