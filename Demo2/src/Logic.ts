

export class Logic{


    constructor(){
        this.TestMethod6=this.TestMethod6.bind(this);
    }

    public TestMethod1():void{
        console.log("Logic => TestMethod 1");
    }

    public TestMethod2(nameInit:string):string{
        return nameInit;
    }

    public TestMethod3(nameInit:string):Promise<string>{
        return new Promise((resolve,reject)=>{
            try
            {
                resolve(nameInit);
            }
            catch(ex)
            {
                reject(ex);
                throw ex;
            }
        })
    }

    public static TestMethod4():string{
        return "Kishor Naik";
    }

    public TestMethod6=():string=>{
        return "Kishor Naik"
    }

}