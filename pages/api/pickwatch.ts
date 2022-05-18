import { NextApiRequest, NextApiResponse } from 'next';
import postToDB from '../../backend/postToDB';
import { FormData } from '../../types/formData';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const formData: FormData = req.body;

  try {
    await postToDB(formData);
    res.status(200).send('API success');
  } catch {
    res.status(500).send('API error');
  }
}