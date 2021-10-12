export interface UserModel{
    FirstName:string;
    LastName:string
}

export class Logic{


    public TestMethod1():void{
        console.log("Test Method 1");
    }

    public TestMethod2(value:string):void{
        console.log(value);
    }

    public TestMethod3():string{
        return "Hello Mock";
    }

    public TestMethod4():UserModel{
        return {
            FirstName:"Kishor",
            LastName:"Naik"
        };
    }

    public TestMethod5():Array<UserModel>{

        let userModelList=new Array<UserModel>();
            userModelList.push({ FirstName:"Kishor", LastName:"Naik"} as UserModel);
            userModelList.push({ FirstName:"Eshaan", LastName:"Naik"} as UserModel);
            userModelList.push({ FirstName:"Yogesh", LastName:"Naik"} as UserModel);

        return userModelList;
    }

    public TestMethod6(firstName:string):UserModel{

        let userModelList=new Array<UserModel>();
            userModelList.push({ FirstName:"Kishor", LastName:"Naik"} as UserModel);
            userModelList.push({ FirstName:"Eshaan", LastName:"Naik"} as UserModel);
            userModelList.push({ FirstName:"Yogesh", LastName:"Naik"} as UserModel);

        return userModelList.filter((element)=> element.FirstName===firstName)[0];
    }

    public TestMethod7(firstName:string): Promise<UserModel>{

        return new Promise<UserModel>((resolve,reject)=>{

            try
            {
                let userModelList=new Array<UserModel>();
                userModelList.push({ FirstName:"Kishor", LastName:"Naik"} as UserModel);
                userModelList.push({ FirstName:"Eshaan", LastName:"Naik"} as UserModel);
                userModelList.push({ FirstName:"Yogesh", LastName:"Naik"} as UserModel);
    
                resolve(userModelList.filter((element)=> element.FirstName===firstName)[0]);

            }
            catch(ex)
            {
                reject(ex);
                throw ex;
            }
        });
    }

    public TestMethod8():Promise<void>{
        return new Promise((resolve,reject)=>{
            try
            {
                console.log("Hello");
                resolve();
            }
            catch(ex)
            {
                reject(ex);
                throw ex;
            }
            
        });
    }

    public static TestStaticMethod9():void{
        console.log("Test Static Method");
    }

}