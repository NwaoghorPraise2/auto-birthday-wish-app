import db from '../../api/config/db';
import { generateId } from '../../api/config/db';


const run = async ():Promise<void> => {
  await db.user.createMany({
    data: [
            {
            username: 'XXXX1',
            password: 'XXXXXXXXXXX',
            email: 'john@example.com',
            salt: 'XXXXXXXXXXXxdvdc'
          },
          {
            username: 'XXXXrttjhbjhvhgch',
            password: 'XXXXXXXXXXX',
            email: 'jane@example.com',
            salt: 'XXXXXXXXXXXxdvdcscscfsf'
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