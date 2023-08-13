import { Configuration, OpenAIApi } from "openai";
import formidable, {errors as formidableErrors} from 'formidable';
import fs from 'node:fs';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  basePath: process.env.OPENAI_API_BASE_URL,
});
const openai = new OpenAIApi(configuration);

export const config = {
  api: {
    bodyParser: false,
  }
}

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  let fields;
  let files;
  try {
  console.log('----------req--2-')
      const form = formidable({});
      form.on('file', function(name, file) { 
  console.log('----------req--5-', name)

      });
      form.on('error', function(err) { 
  console.log('----------req--6-', err)

      });
      form.on('aborted', function() { 
  console.log('----------req--7-')

      });
      [fields, files] = await form.parse(req);
  console.log('----------req--3-')
  } catch (err) {
  console.log('----------req--4-')
      // example to check for a very specific error
      if (err.code === formidableErrors.maxFieldsExceeded) {
        console.log('formidableErrors: maxFieldsExceeded')
      }
      console.error(err);
      res.writeHead(err.httpCode || 400, { 'Content-Type': 'text/plain' });
      res.end(String(err));
      return;
  }

  console.log('-----file: ', fields, files)
  // const sentence = req.body.sentence || '';
  // if (sentence.trim().length === 0) {
  //   res.status(400).json({
  //     error: {
  //       message: "Please enter a sentence",
  //     }
  //   });
  //   return;
  // }
  if (!files || !files.file || files.file.length < 1) {
    res.status(400).json({
      error: {
        message: "Please select a file"
      }
    })
    return;
  }
  const file = files.file[0];
  console.log('------type: ', file)
  try {
    const completion = await openai.createTranscription(fs.createReadStream(file.filepath) as any, 'whisper-1', null, 'text');
    console.log('=======completion: ', completion)
    res.status(200).json({ result: completion.data.text });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

