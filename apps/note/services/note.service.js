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
console.log(filterBy);

  return storageService.query(NOTE_KEY).then((notes) => {
    if (filterBy.txt) {
      const regExp = new RegExp(filterBy.txt, 'i')
      notes = notes.filter((note) => regExp.test(note.info.title) || regExp.test(note.info.txt))
    }
    if (filterBy.type) {
      const regExp = new RegExp(filterBy.type, 'i')
      notes = notes.filter((note) => regExp.test(note.type))
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

function getEmptyNote() {
  return {
    createdAt: Date.now(),
    type: 'NoteTxt',
    isPinned: true,
    style: {
      backgroundColor: 'white'
    },
    info: {
      title: '',
      txt: ''
    }
  }
}

function getDefaultFilter() {
  return { txt: '' }
}

function _createNotes() {
  let notes = utilService.loadFromStorage(NOTE_KEY)
  if (!notes || !notes.length) {
    notes = [
      {
        id: 'n001',
        createdAt: 1625488800000,
        type: 'NoteTxt',
        isPinned: false,
        style: { backgroundColor: '#efeff1' },
        info: { txt: 'Remember to call John today.' }
      },
      {
        id: 'n002',
        createdAt: 1625488801000,
        type: 'NoteImg',
        isPinned: false,
        style: { backgroundColor: '#e9e3d4' },
        info: {
          url: 'https://picsum.photos/300/200?random=1',
          title: 'Beach',
          txt: 'Relaxing beach view'
        }
      },
      {
        id: 'n003',
        createdAt: 1625488802000,
        type: 'NoteTodos',
        isPinned: false,
        style: { backgroundColor: '#f6e2dd' },
        info: {
          title: 'Daily Tasks',
          todos: [
            { txt: 'Finish homework', doneAt: null },
            { txt: 'Buy groceries', doneAt: null },
            { txt: 'Book an appointment', doneAt: null }
          ]
        }
      },
      {
        id: 'n004',
        createdAt: 1625488803000,
        type: 'NoteTxt',
        isPinned: false,
        style: { backgroundColor: '#d3bfdb' },
        info: { txt: 'Meeting with the team at 2 PM' }
      },
      {
        id: 'n005',
        createdAt: 1625488804000,
        type: 'NoteImg',
        isPinned: false,
        style: { backgroundColor: '#aeccdc' },
        info: {
          url: 'https://picsum.photos/300/200?random=2',
          title: 'Mountain',
          txt: 'Hiking trip planned'
        }
      },
      {
        id: 'n006',
        createdAt: 1625488805000,
        type: 'NoteTodos',
        isPinned: false,
        style: { backgroundColor: '#d4e4ed' },
        info: {
          title: 'Shopping List',
          todos: [
            { txt: 'Milk', doneAt: null },
            { txt: 'Eggs', doneAt: null },
            { txt: 'Bread', doneAt: null }
          ]
        }
      },
      {
        id: 'n007',
        createdAt: 1625488806000,
        type: 'NoteTxt',
        isPinned: false,
        style: { backgroundColor: '#b4ddd3' },
        info: { txt: 'Read a new book today' }
      },
      {
        id: 'n008',
        createdAt: 1625488807000,
        type: 'NoteImg',
        isPinned: false,
        style: { backgroundColor: '#fff8b8' },
        info: {
          url: 'https://picsum.photos/300/200?random=3',
          title: 'Sunset',
          txt: 'Beautiful sunset view'
        }
      },
      {
        id: 'n009',
        createdAt: 1625488808000,
        type: 'NoteTodos',
        isPinned: false,
        style: { backgroundColor: '#f39f76' },
        info: {
          title: 'Workout Plan',
          todos: [
            { txt: 'Push-ups', doneAt: null },
            { txt: 'Running', doneAt: null }
          ]
        }
      },
      {
        id: 'n010',
        createdAt: 1625488809000,
        type: 'NoteTxt',
        isPinned: false,
        style: { backgroundColor: '#faafa8' },
        info: { txt: 'Get ready for the weekend trip!' }
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
