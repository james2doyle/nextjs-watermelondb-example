// model/schema.js
import { appSchema, tableSchema } from '@nozbe/watermelondb';

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'comments', // table name
      columns: [
        {
          name: 'body',
          type: 'string'
        }
      ]
    })
  ]
});
