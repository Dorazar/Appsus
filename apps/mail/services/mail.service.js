import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const MAIL_KEY = 'mailDB'
const NOTE_KEY='noteDB'
_createMails()

export const mailService = {
  query,
  get,
  remove,
  save,
  getEmptyMail,
  getDefaultFilter,
  _setNextPrevMailId,
  isMailInStorage,
  getFilterFromSearchParams,
  getEmptyNote,
  saveNote
}

window.mailService = mailService

function query(filterBy = {}) {
  return storageService.query(MAIL_KEY).then((mails) => {

if (filterBy.txt) {
      const regExp = new RegExp(filterBy.txt, 'i')
      mails = mails.filter((mail) => regExp.test(mail.body) || regExp.test(mail.subject) || regExp.test(mail.from))
    }
    if (filterBy.read) {
      if (filterBy.read === '1') {
        mails = mails.filter((mail) => mail.isRead === true)
      } else if (filterBy.read === '0') mails = mails.filter((mail) => mail.isRead === false)
    }
  
 if (filterBy.folder === 'trash') {
      mails = mails.filter((mail) => mail.removedAt !== null)
    }
    else if (filterBy.folder === 'sent') {
      mails = mails.filter((mail) => mail.from === loggedinUser.email && mail.removedAt===null && mail.sentAt!==null)
    }
    else if (filterBy.folder === 'inbox' ) {
      mails = mails.filter((mail) => mail.to === loggedinUser.email && mail.removedAt===null)
    }
      else if (filterBy.folder === 'draft') {
      mails = mails.filter((mail) => mail.sentAt === null && mail.removedAt===null)
    }

     else if (filterBy.folder === 'stared') {
      mails = mails.filter((mail) => mail.isStared === true && mail.removedAt===null)
    }



    if (filterBy.sort === 'createdAt') {

      mails = mails.sort((a, b) => (b.createdAt - a.createdAt) )
    } else if (filterBy.sort === 'from') {

      mails.sort((a, b) => a.from.localeCompare(b.from))
    } else if (filterBy.sort === 'subject') {
   
      mails.sort((a, b) => a.subject.localeCompare(b.subject) )
    }

    

   


    

    // console.log('service:',filterBy)

    return mails
  })
}

function get(mailId) {
  return storageService.get(MAIL_KEY, mailId).then((mail) => {
    return _setNextPrevMailId(mail)
  })
}

function remove(mailId) {
  // return Promise.reject('Oh No!')
  return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
  if (mail.id) {
    return storageService.put(MAIL_KEY, mail)
  } else {
    return storageService.post(MAIL_KEY, mail)
  }
}

function getEmptyMail() {
  return {
        subject: '',
        body: '',
        createdAt:new Date().getTime(),
        isRead: true,
        removedAt: null,
        to: '',
        sentAt:null,
        from: 'user@appsus.com',
        isStared:false,
  }
}

function getEmptyNote() {
  return {
    createdAt:new Date().getTime(),
    info:{from:'',subject:'',body:''},
    isPinned:false,
    style:{backgroundColor:"#a4a4e5"},
    type:'NoteMail'

  }
}

function getDefaultFilter() {
  return { txt:'', read:'',sort:'', folder: '' }
}

function _createMails() {
  let mails = utilService.loadFromStorage(MAIL_KEY)
  if (!mails || !mails.length) {
  mails = [
  {
    id: 'e300',
    createdAt: 1625698140000,
    subject: 'Meeting Reminder',
    body: "Don't forget our meeting tomorrow at 10 AM.",
    isRead: false,
    sentAt: 1625698140500,
    removedAt: null,
    from: 'noreply@meetings.com',
    to: 'user@appsus.com',
    isStared: true,
  },
  {
    id: 'e301',
    createdAt: 1729843020000,
    subject: 'Special Offer Inside',
    body: 'You’ve unlocked a special deal – open to find out!',
    isRead: false,
    sentAt: 1729843020500,
    removedAt: null,
    from: 'offers@dealsclub.net',
    to: 'user@appsus.com',
    isStared: true,
  },
  {
    id: 'e302',
    createdAt: 1619198520000,
    subject: 'Team Sync-Up',
    body: "Let's align on our goals for this sprint.",
    isRead: true,
    sentAt: 1619198520500,
    removedAt: null,
    from: 'team@projecthub.io',
    to: 'user@appsus.com',
    isStared: true,
  },
  {
    id: 'e303',
    createdAt: 1552262580000,
    subject: 'Invoice Available',
    body: 'Your invoice for March is now ready to view.',
    isRead: true,
    sentAt: 1552262580500,
    removedAt: null,
    from: 'billing@invoices.org',
    to: 'user@appsus.com',
    isStared: true,
  },
  {
    id: 'e304',
    createdAt: 1634752860000,
    subject: 'Welcome Aboard!',
    body: 'We’re glad to have you with us. Let’s get started!',
    isRead: true,
    sentAt: 1634752860500,
    removedAt: null,
    from: 'welcome@onboarder.co',
    to: 'user@appsus.com',
    isStared: false,
  },
  {
    id: 'e305',
    createdAt: 1731009660000,
    subject: 'Project Deadline',
    body: 'Reminder: Project deliverables due by end of week.',
    isRead: true,
    sentAt: 1731009660500,
    removedAt: null,
    from: 'deadline@tasktracker.ai',
    to: 'user@appsus.com',
    isStared: false,
  },
  {
    id: 'e306',
    createdAt: 1621699080000,
    subject: 'Event Invitation',
    body: 'Join us for a celebration this weekend.',
    isRead: true,
    sentAt: 1621699080500,
    removedAt: null,
    from: 'events@celebrateit.com',
    to: 'user@appsus.com',
    isStared: false,
  },
  {
    id: 'e307',
    createdAt: 1725316560000,
    subject: 'Security Alert',
    body: 'Unusual login detected. Please verify your activity.',
    isRead: false,
    sentAt: 1725316560500,
    removedAt: null,
    from: 'security@alerts.net',
    to: 'user@appsus.com',
    isStared: false,
  },
  {
    id: 'e308',
    createdAt: 1686487560000,
    subject: 'Weekly Newsletter',
    body: 'Catch up on all the latest updates from our team.',
    isRead: false,
    sentAt: 1686487560500,
    removedAt: null,
    from: 'news@weeklybuzz.com',
    to: 'user@appsus.com',
    isStared: true,
  },
  {
    id: 'e309',
    createdAt: 1687118640000,
    subject: "You're Invited!",
    body: 'We’re hosting a private event – RSVP now!',
    isRead: false,
    sentAt: 1687118640500,
    removedAt: null,
    from: 'invite@exclusive.co',
    to: 'user@appsus.com',
    isStared: true,
  },
  {
    id: 'e310',
    createdAt: 1634618400000,
    subject: 'Password Change',
    body: 'Your password was changed successfully.',
    isRead: false,
    sentAt: 1634618400500,
    removedAt: null,
    from: 'support@securemail.org',
    to: 'user@appsus.com',
    isStared: false,
  },
  {
    id: 'e311',
    createdAt: 1631114400000,
    subject: 'Holiday Greetings',
    body: 'Wishing you and your loved ones happy holidays.',
    isRead: false,
    sentAt: 1631114400500,
    removedAt: null,
    from: 'greetings@holidayvibes.com',
    to: 'user@appsus.com',
    isStared: false,
  },
  {
    id: 'e312',
    createdAt: 1733572140000,
    subject: 'Update Required',
    body: 'A new update is available – please install it now.',
    isRead: true,
    sentAt: 1733572140500,
    removedAt: null,
    from: 'updates@systemzone.net',
    to: 'user@appsus.com',
    isStared: true,
  },
  {
    id: 'e313',
    createdAt: 1656137160000,
    subject: 'Survey Request',
    body: 'Tell us how we did – take this quick survey.',
    isRead: true,
    sentAt: 1656137160500,
    removedAt: null,
    from: 'survey@feedbackhub.org',
    to: 'user@appsus.com',
    isStared: false,
  },
{
  id: 'e314',
  createdAt: 1751653800000, 
  subject: 'Flight Confirmation',
  body: 'Your flight is confirmed. Bon voyage!',
  isRead: true,
  sentAt: 1751653800500,
  removedAt: null,
  from: 'flights@travelnow.com',
  to: 'user@appsus.com',
  isStared: false
}
,
  {
    id: 'e315',
    createdAt: 1639477080000,
    subject: 'Delivery Scheduled',
    body: 'We’ll be delivering your package tomorrow.',
    isRead: true,
    sentAt: 1639477080500,
    removedAt: null,
    from: 'shipping@fasttrack.io',
    to: 'user@appsus.com',
    isStared: true,
  },
  {
    id: 'e316',
    createdAt: 1748801520000,
    subject: 'New Message',
    body: 'You have a new message waiting in your inbox.',
    isRead: false,
    sentAt: 1748801520500,
    removedAt: null,
    from: 'messages@chatspace.net',
    to: 'user@appsus.com',
    isStared: true,
  },
  {
    id: 'e317',
    createdAt: 1677656820000,
    subject: 'Support Ticket',
    body: 'Your support request has been received.',
    isRead: false,
    sentAt: 1677656820500,
    removedAt: null,
    from: 'helpdesk@supportnow.org',
    to: 'user@appsus.com',
    isStared: false,
  },
  {
    id: 'e318',
    createdAt: Date.now(),
    subject: 'System Notification',
    body: 'System maintenance is scheduled for tonight.',
    isRead: false,
    sentAt: Date.now() + 500,
    removedAt: null,
    from: 'system@maintenance.net',
    to: 'user@appsus.com',
    isStared: true,
  },
  {
    id: 'e319',
    createdAt: Date.now(),
    subject: 'Thanks for Subscribing',
    body: 'Thanks for joining our community. Stay tuned!',
    isRead: true,
    sentAt: Date.now() + 500,
    removedAt: null,
    from: 'news@subscriptions.org',
    to: 'user@appsus.com',
    isStared: false,
  },
]


  }

  utilService.saveToStorage(MAIL_KEY, mails)
}

function _createMail(subject) {
  const mail = getEmptyMail(subject)
  mail.id = makeId()
  return mail
}


// function saveReview(mailId, review) {
//   return get(mailId).then((mail) => {
//     review.id = utilService.makeId()
//     mail.reviews.push(review)
//     console.log(review)
//     return save(mail)
//   })
// }

function _setNextPrevMailId(mail) {
  return query().then((mails) => {
    const mailIdx = mails.findIndex((currMail) => currMail.id === mail.id)
    const nextMail = mails[mailIdx + 1] ? mails[mailIdx + 1] : mails[0]
    const prevMail = mails[mailIdx - 1] ? mails[mailIdx - 1] : mails[mails.length - 1]
    mail.nextMailId = nextMail.id
    mail.prevMailId = prevMail.id
    return mail
  })
}

// function getEmptyReview() {
//   return { fullname: '', rating: '3', readAt: new Date().toISOString().split('T')[0] }
// }

function isMailInStorage(checkMail) {
  return query('mailDB').then((mails) => {
    return mails.find((mail) => mail.title === checkMail.title)
  })
}

function getFilterFromSearchParams(searchParams) {
  const txt = searchParams.get('txt') || ''
  const read = searchParams.get('read') || ''
  const sort = searchParams.get('sort') || 'createdAt'
  const folder = searchParams.get('folder') || 'inbox'
  return {
    txt,
    read,
    sort,
    folder
  }
}

const loggedinUser = { email: 'user@appsus.com', fullname: 'Mahatma Appsus' }

function saveNote(note) {
  if (note.id) {
    return storageService.put(NOTE_KEY, note)
  } else {
    return storageService.post(NOTE_KEY, note)
  }
}