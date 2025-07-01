import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const NOTE_KEY = 'noteDB'
_createNotes()

export const noteService = {
  query,
  get,
  remove,
  save,
  getEmptyNote,
  getDefaultFilter,
  _setNextPrevNoteId,
  isNoteInStorage,
  getFilterFromSearchParams
}

window.noteService = noteService



function query(filterBy = {}) {
  return storageService.query(NOTE_KEY).then((notes) => {
    if (filterBy.txt) {
      const regExp = new RegExp(filterBy.txt, 'i')
      notes = notes.filter((note) => regExp.test(note.title) || regExp.test(note.description))
    }
    console.log(notes)
    return notes
  })
}

function get(noteId) {
  return storageService.get(NOTE_KEY, noteId).then((note) => {
    return _setNextPrevNoteId(note)
  })
}

function remove(noteId) {
  // return Promise.reject('Oh No!')
  return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
  if (note.id) {
    return storageService.put(NOTE_KEY, note)
  } else {
    return storageService.post(NOTE_KEY, note)
  }
}

function getEmptyNote(subject = '') {
  return { subject }
}

function getDefaultFilter() {
  return { txt: '' }
}

function _createNotes() {
  let notes = utilService.loadFromStorage(NOTE_KEY)
  if (!notes || !notes.length) {
    notes = [
      {
        id: 'n101',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: true,
        style: {
          backgroundColor: '#a4a4e5'
        },
        info: {
          txt: 'Fullstack Me Baby!'
        }
      },
      {
        id: 'n102',
        createdAt: 1112223,
        type: 'NoteImg',
        isPinned: false,
        info: {
          url: 'http://some-img/me',
          title: 'Bobi and Me',
          txt: 'I love Bobi'
        },
        style: {
          backgroundColor: '#a4a4e5'
        }
      },
      {
        id: 'n103',
        createdAt: 1112224,
        type: 'NoteTodos',
        isPinned: false,
        info: {
          title: 'Get my stuff together',
          todos: [
            { txt: 'Driving license', doneAt: null },
            { txt: 'Coding power', doneAt: 187111111 }
          ]
        }
      }

    ]
  }
  utilService.saveToStorage(NOTE_KEY, notes)

}

function _createNote(subject) {
  const note = getEmptyNote(subject)
  note.id = makeId()
  return note
}

// function saveReview(noteId, review) {
//   return get(noteId).then((note) => {
//     review.id = utilService.makeId()
//     note.reviews.push(review)
//     console.log(review)
//     return save(note)
//   })
// }

function _setNextPrevNoteId(note) {
  return query().then((notes) => {
    const noteIdx = notes.findIndex((currNote) => currNote.id === note.id)
    const nextNote = notes[noteIdx + 1] ? notes[noteIdx + 1] : notes[0]
    const prevNote = notes[noteIdx - 1] ? notes[noteIdx - 1] : notes[notes.length - 1]
    note.nextNoteId = nextNote.id
    note.prevNoteId = prevNote.id
    return note
  })
}

// function getEmptyReview() {
//   return { fullname: '', rating: '3', readAt: new Date().toISOString().split('T')[0] }
// }




function isNoteInStorage(checkNote) {
  return query('noteDB').then((notes) => {
    return notes.find((note) => note.title === checkNote.title)
  })
}


function getFilterFromSearchParams(searchParams) {
  const txt = searchParams.get('txt') || ''
  return {
    txt
  }
}
