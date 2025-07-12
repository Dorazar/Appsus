import { noteService } from "../services/note.service.js"
const { Fragment } = React
const { useNavigate } = ReactRouterDOM

export function NoteImg({ noteToEdit, setNoteToEdit, title, txt, url, images }) {
    // console.log(images);

    const navigate = useNavigate()

    function onSaveNote(ev) {
        ev.preventDefault()
        noteService.save(noteToEdit)
            .then(() => navigate('/note'))
            .catch(err => {
                console.log('Cannot save note:', err)
                // showErrorMsg('Cannot save note')
            })
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;
            case 'checkbox':
                value = target.checked
                break;
            case 'file':
                const files = Array.from(target.files)
                files.forEach(file => {
                    const reader = new FileReader()
                    reader.onloadend = () => {
                        setNoteToEdit(prevNote => ({
                            ...prevNote,
                            info: {
                                ...prevNote.info,
                                images: [...(prevNote.info.images || []), reader.result]
                            }
                        }))
                    }
                    reader.readAsDataURL(file)
                })
                return
        }

        setNoteToEdit((prevNote) => ({
            ...prevNote,
            info: { ...prevNote.info, [field]: value },
        }));
    }

    function handleRemoveImage(imgKey) {

        if (typeof (imgKey) === 'number')
            setNoteToEdit(prevNote => ({
                ...prevNote,
                info: {
                    ...prevNote.info,
                    images: prevNote.info.images.filter((_, i) => i !== imgKey)
                }
            }))
        else {
            setNoteToEdit(prevNote => ({
                ...prevNote,
                info: {
                    ...prevNote.info,
                    url: ''
                }
            }))
        }
    }

    if (!noteToEdit) {


        return (
            <section className="img-type">

                <section className="imgs-container">
                    <div className="image-wrapper">
                        <img src={url} />
                    </div>
                    {images && images.map((imgSrc, idx) => (
                        <div key={idx} className="image-wrapper">
                            <img src={imgSrc} alt={`Uploaded ${idx + 1}`} />
                        </div>
                    ))}
                </section>
                {title && <h3 className="note-title">{title}</h3>}
                {txt && <p className="note-txt">{txt}</p>}
            </section>
        )
    }

    return (
        <Fragment>
            <form onSubmit={onSaveNote}>
                <section className="imgs-container">
                    <div className="image-wrapper">
                        <img src={url} />
                        <button className="note-btn" onClick={(ev) => {
                            ev.preventDefault()
                            handleRemoveImage(url)
                        }}
                        >
                            <span className="material-symbols-outlined">
                                delete
                            </span>
                        </button>
                    </div>
                    {images && images.map((imgSrc, idx) => (
                        <div key={idx} className="image-wrapper">
                            <img src={imgSrc} alt={`Uploaded ${idx + 1}`} />
                            <button className="note-btn" onClick={(ev) => {
                                ev.preventDefault()
                                handleRemoveImage(idx)
                            }}
                            >
                                <span className="material-symbols-outlined">
                                    delete
                                </span>
                            </button>
                        </div>
                    ))}
                </section>
                <input
                    onChange={handleChange}
                    value={noteToEdit.info.title || ''}
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Title"
                />
                <textarea
                    onChange={handleChange}
                    value={noteToEdit.info.txt || ''}
                    name="txt"
                    id="txt"
                    placeholder="Write a description..."
                />

                <div className="modal-actions">
                    <label className="file-upload-btn">
                        <span className="material-symbols-outlined note-btn">photo</span>
                        <input
                            onChange={handleChange}
                            type="file"
                            name="image"
                            id="image"
                            accept="image/*"
                            style={{ display: 'none' }}
                        />
                    </label>
                    <button className="cancel-btn" type="submit">Cancel</button>
                </div>
            </form>
        </Fragment>
    )
}


