import db from '../../api/config/db';



const run = async () => {
  await db.user.createMany({
    data: [
        {
        id: 'erbhfjrhrjfje',
        username: 'XXXX',
        password: 'XXXXXXXXXXX',
        email: 'john@example.com',
      },
      {
        id: 'erbhfjrhrkjfjef',
        username: 'XXXX',
        password: 'XXXXXXXXXXX',
        email: 'jane@example.com',
      }
    ]
  })
}


// const run = async ():Promise<void> => {
//   await db.users.createMany({
//     data: [
//         {
//         id: 'erbhfjrhrjfje',
//         username: 'XXXX',
//         password: 'XXXXXXXXXXX',
//         email: 'john@example.com',
//       },
//       {
//         id: 'erbhfjrhrkjfjef',
//         username: 'XXXX',
//         password: 'XXXXXXXXXXX',
//         email: 'jane@example.com',
//       }
//     ]
//   })
// }


// To auto run sript
if (require.main === module) {
    run().then(() => {
        console.log('Data seed done!')
        process.exit()
    });
}