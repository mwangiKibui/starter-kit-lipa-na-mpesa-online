### Lipa na Mpesa online tutorial.

Steps lipa na mpesa online using Node.js

- Clone the repository.
- Run the following command:

```bash
npm install
```

- Go through the `index.md` file.

- Enter your credentials on the `.env` file.

- Start the server:

```bash
npm run dev
```

- Start Ngrok

```bash
npm run ngrok
```
If ngrok setup doesn't work, use https://beeceptor.com/ to handle the Mpesa webhook.
On the beeceptor website input form, type a unique name that will automatically be prepended to beeceptor.com, 
which would act as your callback url. Whenever you receive data payload on your new beeceptor callback url, the 
beeceptor page will automatically update with the request body payload from a successful transaction. 
