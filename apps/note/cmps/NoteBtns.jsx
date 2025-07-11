
const { useState } = React

export function NoteBtns({ noteId, onRemoveNote, onSetNotesStyle }) {

    const [showColorPicker, setShowColorPicker] = useState(false)
    const colors = [
        { name: 'Light Gray', color: '#efeff1' },
        { name: 'Beige', color: '#e9e3d4' },
        { name: 'Peach', color: '#f6e2dd' },
        { name: 'Lavender', color: '#d3bfdb' },
        { name: 'Sky Blue', color: '#aeccdc' },
        { name: 'Light Blue', color: '#d4e4ed' },
        { name: 'Mint', color: '#b4ddd3' },
        { name: 'Light Green', color: '#e2f6d3' },
        { name: 'Light Yellow', color: '#fff8b8' },
        { name: 'Coral', color: '#f39f76' },
        { name: 'Salmon', color: '#faafa8' }
    ]


    const handleColorSelect = (color) => {
        onSetNotesStyle(noteId, color);
        setShowColorPicker(false);
    }

    return (
        <section className="note-btns">
            <button
                className="note-btn"
                onClick={(ev) => {
                    ev.stopPropagation()
                    onRemoveNote(noteId)
                }}
                title="Delete"
            >
                <span className="material-symbols-outlined">delete</span>
            </button>

            <button
                className="note-btn pallete"
                onClick={(ev) => {
                    ev.stopPropagation();
                    setShowColorPicker(prev => !prev);
                }}
            >
                <span className="material-symbols-outlined">palette</span>


                {showColorPicker && (
                    <div className="color-picker">
                        {colors.map((color) => (
                            <div className="color-select"
                                key={color.id}
                                onClick={(ev) => {
                                    ev.stopPropagation();
                                    handleColorSelect(color.color);
                                }}
                                style={{
                                    backgroundColor: color.color,
                                    borderColor: color.color
                                }}
                                title={color.name}
                            ></div>
                        ))}
                    </div>
                )}
            </button>

        </section>
    )
}