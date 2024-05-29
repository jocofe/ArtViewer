type TermsCheckboxProps = {
    checked: boolean;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export const TermsCheckbox: React.FC<TermsCheckboxProps> = ({ checked, onChange}) => {
    
    return (
        <div className="terms">
            <input type="checkbox" id="terms" checked={checked} onChange={onChange} />
            <p className="terms__text">
            I agree with ArtViewer <a className="sign-up-page__link" href="">Terms of Service</a> and <a className="sign-up-page__link" href=""> Privacy Policy</a>. 
            </p>
        </div>
    )
}