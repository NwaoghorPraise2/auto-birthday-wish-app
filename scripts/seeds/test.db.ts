import db from '../../api/config/db';
import { generateId } from '../../api/config/db';


const run = async () => {
  await db.user.createMany({
    data: [
        {
        id: generateId(),
        username: 'XXXX1',
        password: 'XXXXXXXXXXX',
        email: 'john@example.com',
      },
      {
        id: generateId(),
        username: 'XXXXrttjhbjhvhgch',
        password: 'XXXXXXXXXXX',
        email: 'jane@example.com',
      }
    ]
  })
}


// To auto run sript
if (require.main === module) {
    run().then(() => {
        console.log('Data seed done!')
        process.exit()
    });
}