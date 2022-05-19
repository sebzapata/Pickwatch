import { NextApiRequest, NextApiResponse } from 'next';

import postToDB from '@src/backend/postToDB';
import { FormData } from '@src/types/formData';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const formData: FormData = req.body;

  if (!formData.name || !formData.email || !formData.message) {
    res.status(400).send('Please submit a name, email and message');
  } else {
    try {
      await postToDB(formData);
      res.status(200).send('API success');
    } catch {
      res.status(500).send('API error');
    }
  }
}