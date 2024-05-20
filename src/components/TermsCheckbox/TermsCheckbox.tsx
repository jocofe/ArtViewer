type TermsCheckboxProps = {
    checked: boolean;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export const TermsCheckbox: React.FC<TermsCheckboxProps> = ({ checked, onChange}) => {
    
    return (
        <div className="loquesea">
            <input type="checkbox" id="terms" checked={checked} onChange={onChange} />
            <p className="terms_text">
            I agree with ArtViewer{' '}
                <a className="sign-up-page__link" href="">
                  Terms of Service
                </a>
                ,{' '}
                <a className="sign-up-page__link" href="">
                  Privacy Policy
                </a>
                , and default{' '}
                <a className="sign-up-page__link" href="">
                  Notification Settings
                </a>
                . 
            </p>
        </div>
    )
}