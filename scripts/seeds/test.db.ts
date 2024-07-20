import db from '../../api/config/db';


const run = async ():Promise<void> => {
  await db.user.createMany({
    data: [
            {
            username: 'XXXX1',
            password: 'XXXXXXXXXXX',
            email: 'john@example.com',
          },
          {
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