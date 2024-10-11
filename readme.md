## Pitstop Recycling
### Overview
This is a tool application that I built to assist me in the tyre pick-up and return process. It was never intended to be shown to the public, so the code is full of TODOs, secrets that need to be extracted into the environment variables, and features pending implementation. The primary objective was to get it functional as quickly as possible.

The main goal of this application was to automate and standardize the process of picking up tyres from customers, automatically sending invoices, and keeping track of stock. The manual process involved arriving at the customer's store, picking up the used tyres, recording how many tyres we collected and of what type in an order book, making the customer sign, and then sending a picture of it to my boss so he could create the invoice and send it to the customer.

While simple, this process had several glaring issues:

- We depended on our boss having access to a computer to create and send the invoice so the customer could pay. This was not always the case, and this requirement often prevented him from focusing on acquiring new clients.
We had to manually input the tyres into the order book, and after picking up tyres full of rainwater, the notes were often unclear, forcing us to go back and forth with text messages while driving to the next customer—something that was quite dangerous.
- There was a lack of metrics. Since the process was entirely manual, we had no visibility into important data like how many tyres we collected, the distance required to make each trip worthwhile, the rate at which each client produced new tyres for pickup, and how much time needed to pass before a return visit was necessary. This led to an unproductive way of conducting business.
- This app was designed to address these issues while providing some structure to the business. Other features, such as tracking hours worked, fuel expenses, and the location of each driver, were considered to make the app a comprehensive solution for this business. However, these features were not implemented as it was decided not to invest further in the app.

### Technologies
The application is built with React Native and TypeScript on the frontend, and Supabase on the backend, where a database and a small edge function are hosted. The function is located in this repo inside the supabase/functions/resend/ folder. For styling and UI, we used Tailwind. Other libraries include those for data fetching and Resend for email sending.

### Installation 
Clone the repo to your local machine and install the dependencies. You need to have Xcode installed on your machine or an iPhone with the Expo app installed (I haven't tested it on Android, so I'm not sure if it works). Start the app by running yarn start or npm start in the root folder and press "i" to run it on the iPhone emulator. Alternatively, you can scan the QR code to open it on your phone.
