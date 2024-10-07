## Pitstop Recycling

### Overview

This is a tool application that I build to assist me in a user tyres pick up and return process.
never intended to be shown to the public so the code is full of TODOs, secrets to be extracted to the env, and things
pending to be implemented since the objective was to get it out and functional as soon as possible.

The main goal of this application was to automate and standardize the process of picking up tyres from the customes,
automatically send invoices and keep track of the stock. The manual process consisted on arriving at the customer store,
pick up the used tyres, input in an order book how many tyres we got and of what type, make the customer sign and then
send a picture of it to my boss so he can create the invoice and send it to the customer.

This process, while simple, had a lot of glaring issues:

- We depended on our boss to have a computer close so he could create and send the invoice so the customer could pay.
  This was not always the case, and this need kept him away from spending time on getting more clients.
- We had to manually input the tyres in the order book, and after picking up tyres full of rain water inside, the notes
  were not clear enough to be read so we had to go back and forth with text messages while driving to the next customer,
  which was pretty dangerous.
- Lack of metrics. Since the process was completely manual, we were in the dark about important metrics like how many
  tyres we got, how much distance we needed to drive to make the trip worth it, at what rate each client were producing
  new tyres to be picked up and approximately how much time needed to pass to come back for more. This led to
  unproductive way of conducting the business.

This app aimed to solve those problems while giving certain structure to the business. Other feature like controlling
how many hours we work, how much we spent on fuel, and controlling where each driver is currently located, were also
thought of, to make this app a complete solution for this business, but they were not made since it was decided not to
invest on it.

### Technologies

The application is build with React native and typescript in the frontend and supabase as the backend, where a DB and a
small edge function are hosted. Said function is included in this repo inside supabase/functions/resend/ folder. For the
styling and UI we used and tailwind. Other libraries used are for data fetching and resend for email sending.

### Installation

Clone the repo into your local machine and install the dependencies. You need to have XCode installed on your machine or
an iphone with the expo app installed (I haven't tested it on android so I am not sure if it works). Start the app by
running `yarn start` or `npm start` in the root folder and press "i" to run on the iphone emulator. Alternatively, you
can
scan the QR code to open it on your phone.
