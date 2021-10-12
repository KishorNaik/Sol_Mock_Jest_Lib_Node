import { Logic } from "./Logic";
import axios, { AxiosResponse } from "axios";

export class Target{
    private readonly logic:Logic;

    // constructor(logic:Logic){
    //     this.logic=logic;
    // }

    constructor(){
        this.logic=new Logic();
    }

    public InvokeTestMethod1=():void=>{
        this.logic.TestMethod1();
    }

    public InvokeTestMethod2(firstName:string,lastName:string):string{

        let nameInit:string=`${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`;

        return this.logic.TestMethod2(nameInit);
    }

    public async InvokeTestMethod3(firstName:string,lastName:string):Promise<string>{

        let nameInit:string=`${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`;

        return await this.logic.TestMethod3(nameInit);
    }

    public InvokeTestMethod4():string{
        return Logic.TestMethod4();
    }

    public async InvokeTestMethod5():Promise<AxiosResponse<never>>{
        var data= await axios.get("https://api.spacexdata/v4/launches/latest");

        return data;
    }

    public InvokeTestMethod6():string{
        return this.logic.TestMethod6();
    } 
}