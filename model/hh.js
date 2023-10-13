const myPromise = new Promise((res,rej=>{

      res('dghdgdh')
      rej(new Error('f,kfjfk'))
}))

myPromise.then(()=>{}).then(()=>{}).catch(()=>{})


async function test(){
      try{
            const data = await myPromise
            if (condition) {
                  
            }
            const myvar = await myPromise2
            const myvar1 = await myPromise3
      }catch(err){
            console.log(err);

            return myvar1
      }
}
const result= async()=>{
      return await test()
}

 for (let index = 0; index < 100; index++) {
                  console.log(index);;
            }
