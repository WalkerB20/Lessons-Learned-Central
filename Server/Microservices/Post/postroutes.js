import express from 'express';
import cors from 'cors';

const router = express.Router();

const postroutes = (db) => {
  router.use(cors());
  router.use(express.json());
  router.options('*', cors());

  router.post('/form', async (req, res, next) => {
    const formData = req.body;
    try {
      await db.transaction(async trx => {
        const commentIds = await Promise.all(formData.sections.map(async section => {
          const [commentId] = await trx(`${section.type.charAt(0).toUpperCase() + section.type.slice(1)}_Comment`).insert({
            [`${section.type.charAt(0).toUpperCase() + section.type.slice(1)}_Comment_Type`]: section.type,
            [`${section.type.charAt(0).toUpperCase() + section.type.slice(1)}_Comment_Title`]: section.title,
            [`${section.type.charAt(0).toUpperCase() + section.type.slice(1)}_Comment_Discussion`]: section.comments,
            [`${section.type.charAt(0).toUpperCase() + section.type.slice(1)}_Comment_Recommendation`]: section.recommendations
          }).returning(`${section.type.charAt(0).toUpperCase() + section.type.slice(1)}_Comment_ID`);

          return { type: section.type, id: commentId[0] };
        }));

        const sustain_comment_id = commentIds.find(comment => comment.type === 'sustain')?.id;
        const improve_comment_id = commentIds.find(comment => comment.type === 'improve')?.id;

        const [aarId] = await trx('AAR').insert({
          AAR_Name: formData.eventTitle,
          AAR_Location: formData.eventLocation,
          AAR_Activity_Date: formData.eventDate,
          sustain_comment_id,
          improve_comment_id
        }).returning('AAR_ID');

        for (const commentId of commentIds) {
          await trx('AAR_Comment').insert({
            AAR_Comment_ID: aarId[0],
            [`${commentId.type.charAt(0).toUpperCase() + commentId.type.slice(1)}_Comment_ID`]: commentId.id
          });
        }

        const formattedEventType = formData.eventType.replace(/([a-z])([A-Z])/g, '$1_$2');
        const dbEventType = formattedEventType.charAt(0).toUpperCase() + formattedEventType.slice(1);

        const [eventId] = await trx(dbEventType).insert({
          [`${dbEventType}_Event_Type`]: formData.eventType,
          [`${dbEventType}_Event_Option`]: formData.additionalOptions,
          [`${dbEventType}_Event_Other`]: formData.additionalInput
        }).returning(`${dbEventType}_ID`);

        const [categoryId] = await trx('Category').insert({
          [`${dbEventType}_ID`]: eventId[0]
        }).returning('Category_ID');

        await trx('AAR_Category').insert({
          AAR_ID: aarId[0],
          Category_ID: categoryId[0]
        });
      });

      res.json({ success: true, message: 'Data inserted successfully' });
    } catch (err) {
      next({ message: 'Error occurred while inserting data', originalError: err });
    }
  });

  return router;
};

export default postroutes;