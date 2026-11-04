// Single place for everything you may want to edit without touching components.

export const PRICE = 399
export const ORIGINAL_PRICE = 999

export const UPI_ID = 'paytm.s36oa7e@pty'
export const UPI_NAME = 'Datespot'
export const upiUrl = `upi://pay?pa=${UPI_ID}&pn=${UPI_NAME}&am=${PRICE}&cu=INR`

export const TELEGRAM_LINK = 'https://t.me/+wHPA3hSr4c85ZWY1'

// Google Apps Script endpoint that stores leads + payment screenshots.
export const SHEET_URL =
  'https://script.google.com/macros/s/AKfycby5yLNtWOTeTx1qI0Qv_-hiFri1UAn3Th4VzdaW4gDSKYNjPFftUWtKqiGaEGzfW4LC2g/exec'

export const MEMBERS = '548+'

export const REVIEWS = [
  { name: 'Rahul M.', area: 'Koramangala', text: 'Way better than any dating app I have tried. Met two amazing women so far, both real and verified.' },
  { name: 'Vikram Shetty.', area: 'Indiranagar', text: 'Finally ondhu genuine group sikthu. Admin is very responsive and the crowd is legit. Genuinely recommend.' },
  { name: 'Karan D.', area: 'HSR Layout', text: 'Real girls, real chats. Nothing like the fake bots on Tinder or Bumble. Worth every rupee.' },
  { name: 'Aditya P.', area: 'Whitefield', text: "Was skeptical at first but it's 100% worth it. The voice call feature is a great way to vibe before meeting." },
  { name: 'Rohan Gowda.', area: 'JP Nagar', text: 'Already arranged a meet within my first week. Active group, daily new faces. Super recommend bro.' },
  { name: 'Suresh Naik.', area: 'Marathahalli', text: 'Met my current girlfriend here lol. Very organised, zero spam and the admin actually screens people.' },
]

export const FAQS = [
  { q: 'Is this genuine?', a: 'Yes. Datespot has been running since 2021 with 548+ verified members. Every member is manually approved by Subhash Gowda before getting access.' },
  { q: 'How do I get access?', a: `Pay ₹${PRICE} via UPI, upload the payment screenshot, and you receive the Telegram group link instantly. The whole process takes under 2 minutes.` },
  { q: 'Are profiles verified?', a: 'Every profile is manually verified by the admin. Fake profiles, bots, and spam accounts are removed immediately — zero tolerance policy.' },
  { q: 'Is my privacy protected?', a: 'Absolutely. Your personal details are never shared with other members. The group has strict privacy rules and all screenshots of members are prohibited.' },
  { q: 'How quickly do I receive access?', a: 'Access is sent within minutes of payment confirmation, typically under 5 minutes. Admin support is available daily for any delays.' },
]
