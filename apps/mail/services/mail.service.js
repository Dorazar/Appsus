import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const MAIL_KEY = 'mailDB'
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
}

window.mailService = mailService

function query(filterBy = {}) {
  return storageService.query(MAIL_KEY).then((mails) => {
    if (filterBy.sort === 'createdAt') {
     
      mails = mails.sort((a, b) => (b.createdAt - a.createdAt) * filterBy.isDesc)
    } else if (filterBy.sort === 'from') {

      mails.sort((a, b) => a.from.localeCompare(b.from) * filterBy.isDesc)
    } else if (filterBy.sort === 'subject') {
   
      mails.sort((a, b) => a.subject.localeCompare(b.subject) * filterBy.isDesc)
    }

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

    

    console.log(filterBy)

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

function getEmptyMail(subject = '') {
  return { subject }
}

function getDefaultFilter() {
  return { txt: '', read: '',sort:'', folder: '' }
}

function _createMails() {
  let mails = utilService.loadFromStorage(MAIL_KEY)
  if (!mails || !mails.length) {
    mails = [
      {
        id: 'e101',
        createdAt: 1551133930500,
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1551133930594,
        removedAt: null,
        from: 'momo@momo.com',
        to: 'user@appsus.com',
      },
      {
        id: 'e102',
        createdAt: 1551220330500,
        subject: 'Project update',
        body: 'The project is on track, we’ll finish soon!',
        isRead: false,
        sentAt: 1551220330594,
        removedAt: null,
        from: 'team@work.com',
        to: 'user@appsus.com',
      },
      {
        id: 'e103',
        createdAt: 1551306730500,
        subject: 'Dinner plans',
        body: 'Want to grab sushi this weekend?',
        isRead: true,
        sentAt: 1551306730594,
        removedAt: null,
        from: 'alex@friends.com',
        to: 'user@appsus.com',
      },
      {
        id: 'e104',
        createdAt: 1551393130500,
        subject: 'Invoice #12345',
        body: 'Please find attached invoice for February.',
        isRead: false,
        sentAt: 1551393130594,
        removedAt: null,
        from: 'billing@company.com',
        to: 'user@appsus.com',
      },
      {
        id: 'e105',
        createdAt: 1551479530500,
        subject: 'Event reminder',
        body: 'Don’t forget our event this Friday!',
        isRead: true,
        sentAt: 1551479530594,
        removedAt: null,
        from: 'events@calendar.com',
        to: 'user@appsus.com',
      },
      {
        id: 'e106',
        createdAt: 1551565930500,
        subject: 'Flight Itinerary',
        body: 'Your flight to Paris is confirmed.',
        isRead: false,
        sentAt: 1551565930594,
        removedAt: null,
        from: 'noreply@flights.com',
        to: 'user@appsus.com',
      },
      {
        id: 'e107',
        createdAt: 1551652330500,
        subject: 'Job Opportunity',
        body: 'We’d like to interview you for a role.',
        isRead: false,
        sentAt: 1551652330594,
        removedAt: null,
        from: 'hr@company.com',
        to: 'user@appsus.com',
      },
      {
        id: 'e108',
        createdAt: 1551738730500,
        subject: 'Discount just for you',
        body: 'Get 20% off your next purchase!',
        isRead: false,
        sentAt: 1551738730594,
        removedAt: null,
        from: 'promo@shop.com',
        to: 'user@appsus.com',
      },
      {
        id: 'e109',
        createdAt: 1551825130500,
        subject: 'Weekly digest',
        body: 'Here’s what you missed this week.',
        isRead: true,
        sentAt: 1551825130594,
        removedAt: null,
        from: 'updates@news.com',
        to: 'user@appsus.com',
      },
      {
        id: 'e110',
        createdAt: 1551911530500,
        subject: 'Your subscription is expiring',
        body: 'Renew now to avoid interruption.',
        isRead: false,
        sentAt: 1551911530594,
        removedAt: null,
        from: 'support@service.com',
        to: 'user@appsus.com',
      },
      {
        id: 'e111',
        createdAt: 1551997930500,
        subject: 'Congrats!',
        body: 'You’ve been selected as a winner!',
        isRead: true,
        sentAt: 1551997930594,
        removedAt: null,
        from: 'lottery@fun.com',
        to: 'user@appsus.com',
      },
      {
        id: 'e112',
        createdAt: 1552084330500,
        subject: 'Reminder: Password Reset',
        body: 'Click here to reset your password.',
        isRead: false,
        sentAt: 1552084330594,
        removedAt: null,
        from: 'security@account.com',
        to: 'user@appsus.com',
      },
      {
        id: 'e113',
        createdAt: 1552170730500,
        subject: 'Thanks for your order',
        body: 'Your order has been shipped.',
        isRead: true,
        sentAt: 1552170730594,
        removedAt: null,
        from: 'orders@store.com',
        to: 'user@appsus.com',
      },
      {
        id: 'e114',
        createdAt: 1552257130500,
        subject: 'Feedback request',
        body: 'Tell us what you thought about your visit.',
        isRead: false,
        sentAt: 1552257130594,
        removedAt: null,
        from: 'feedback@survey.com',
        to: 'user@appsus.com',
      },
      {
        id: 'e115',
        createdAt: 1552343530500,
        subject: 'Account Activity',
        body: 'New login detected from Tel Aviv.',
        isRead: false,
        sentAt: 1552343530594,
        removedAt: null,
        from: 'alerts@security.com',
        to: 'user@appsus.com',
      },
      {
        id: 'e116',
        createdAt: 1552429930500,
        subject: 'Book Club Meeting',
        body: 'Don’t forget to bring your book!',
        isRead: true,
        sentAt: 1552429930594,
        removedAt: null,
        from: 'club@readers.com',
        to: 'user@appsus.com',
      },
      {
        id: 'e117',
        createdAt: 1552516330500,
        subject: 'New comment on your post',
        body: 'Someone replied to your comment.',
        isRead: false,
        sentAt: 1552516330594,
        removedAt: null,
        from: 'notify@social.com',
        to: 'user@appsus.com',
      },
      {
        id: 'e118',
        createdAt: 1552602730500,
        subject: 'Exclusive Invite',
        body: 'Join us for a private event.',
        isRead: false,
        sentAt: 1552602730594,
        removedAt: null,
        from: 'vip@events.com',
        to: 'user@appsus.com',
      },
      {
        id: 'e119',
        createdAt: 1552689130500,
        subject: 'We missed you',
        body: 'Come back for new surprises!',
        isRead: false,
        sentAt: 1552689130594,
        removedAt: null,
        from: 'hello@service.com',
        to: 'user@appsus.com',
      },
      {
        id: 'e120',
        createdAt: 1552775530500,
        subject: 'System Maintenance',
        body: 'Service will be unavailable tomorrow.',
        isRead: true,
        sentAt: 1552775530594,
        removedAt: null,
        from: 'admin@system.com',
        to: 'user@appsus.com',
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
const sort = searchParams.get('sort') || ''
  const folder = searchParams.get('folder') || ''
  return {
    txt,
    read,
    sort,
    folder,
  }
}

const loggedinUser = { email: 'user@appsus.com', fullname: 'Mahatma Appsus' }
