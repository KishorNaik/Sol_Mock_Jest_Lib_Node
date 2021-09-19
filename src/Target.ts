import { Logic, UserModel } from "./Logic";

export class Target{

    private readonly _logic:Logic;

    constructor(logic:Logic){
        this._logic=logic;
    }

    public InvokeTestMethod1():void{
        this._logic.TestMethod1();
    }

    public InvokeTestMethod2(value:string):void{
        this._logic.TestMethod2(value);
    }

    public InvokeTestMethod3():string{
        return this._logic.TestMethod3();
    }

    public InvokeTestMethod4():UserModel{
        return this._logic.TestMethod4();
    }

    public InvokeTestMethod5():UserModel[]{
        return this._logic.TestMethod5();
    }

    public InvokeTestMethod6(firstName:string ):UserModel{
        return this._logic.TestMethod6(firstName);
    }

    public InvokeTestMethod7(firstName:string): Promise<UserModel>{
        return this._logic.TestMethod7(firstName);
    }

    public InvokeTestMethod8():Promise<void>{
        return this._logic.TestMethod8();
    }

    public InvokeTestMethod9():void{
        Logic.TestStaticMethod9();
    }


}