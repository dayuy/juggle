# OpenAI API Quickstart - Node.js example app

This is an example pet name generator app used in the OpenAI API [quickstart tutorial](https://platform.openai.com/docs/quickstart). It uses the [Next.js](https://nextjs.org/) framework with [React](https://reactjs.org/). Check out the tutorial or follow the instructions below to get set up.


## Setup

1. Install the requirements

   ```bash
   $ npm install
   ```

2. Make a copy of the example environment variables file

   On Linux systems: 
   ```bash
   $ cp .env.example .env
   ```
   On Windows:
   ```powershell
   $ copy .env.example .env
   ```
3. Add your [API key](https://platform.openai.com/account/api-keys) to the newly created `.env` file

4. Run the app

   ```bash
   $ npm run dev
   ```

You should now be able to access the app at [http://localhost:3000](http://localhost:3000)! For the full context behind this example app, check out the [tutorial](https://platform.openai.com/docs/quickstart).
