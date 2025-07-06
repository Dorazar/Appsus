const { Fragment } = React

export function NoteModal({ children, isOpen, onClose = () => { } }) {
    
    if (!isOpen) return null
    console.log( {children}.children.props.note);
    return (
        <Fragment>
            <section onClick={onClose} className='modal-backdrop'></section>
            <section  className='modal-content'>
                {children}
                <button className='close-btn' onClick={onClose}>X</button>
            </section>
        </Fragment>
    )
}

