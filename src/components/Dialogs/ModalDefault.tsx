import { Button } from "../Buttons/Buttons"

export const ModalDefault = () => {

    return (
        <div>
            <p>Are you sure?</p>
            <p>You're about to delete this collection.</p>
            <section>
                <Button onClick={() => {}} label="Delete" />
            </section>
        </div>
    )
}