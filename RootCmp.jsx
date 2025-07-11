const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from './cmps/AppHeader.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'
import { About } from './pages/About.jsx'
import { Home } from './pages/Home.jsx'
import { MailIndex } from './apps/mail/pages/MailIndex.jsx'
import { NoteIndex } from './apps/note/pages/NoteIndex.jsx'
import { MailPreview } from './apps/mail/cmps/MailPreview.jsx'
import { MailDetails } from './apps/mail/pages/MailDetails.jsx'
import { NoteEdit } from "./apps/note/pages/NoteEdit.jsx"
import { MailCompose } from './apps/mail/cmps/MailCompose.jsx'
import { NoteFilter } from './apps/note/pages/NoteFilter.jsx'

export function RootCmp() {
    return <Router>
        <section className="root-cmp">

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/mail" element={<MailIndex />}>
                    <Route path="/mail/:mailId" element={<MailDetails />} />
                    <Route path="/mail/newMail" element={<MailCompose />}></Route>
                </Route>

                <Route path="/mail" element={<MailIndex />} />
                <Route path="/note" element={<NoteIndex />} >
                    <Route path="/note/edit/:noteId" element={<NoteEdit />} />
                </Route>
                <Route path="/note/search" element={<NoteFilter />} />
            </Routes>
            <UserMsg />
        </section>
    </Router>
}
