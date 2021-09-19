import { Logic, UserModel } from "../src/Logic";
import { Target } from "../src/Target";


const mock_TestMethod1=jest.fn();
const mock_TestMethod2=jest.fn();
const mock_TestMethod3=jest.fn();
const mock_TestMethod4=jest.fn();
const mock_TestMethod5=jest.fn();
const mock_TestMethod6=jest.fn();
const mock_TestMethod7=jest.fn();
const mock_TestMethod8=jest.fn();
const mock_TestStaticMethod9=jest.fn();

jest.mock("../src/Logic",()=>({
    Logic:jest.fn().mockImplementation(()=> ({
        TestMethod1:mock_TestMethod1,
        TestMethod2:mock_TestMethod2,
        TestMethod3:mock_TestMethod3,
        TestMethod4:mock_TestMethod4,
        TestMethod5:mock_TestMethod5,
        TestMethod6:mock_TestMethod6,
        TestMethod7:mock_TestMethod7,
        TestMethod8:mock_TestMethod8,
        TestStaticMethod9:mock_TestStaticMethod9
    }))
}));

describe("Target-Mock-Test",()=>{

    // Declaration
    let targetInstance:Target;

    beforeEach(()=>{
        targetInstance=new Target(new Logic());

        mock_TestMethod1.mockClear();
        mock_TestMethod2.mockClear();
        mock_TestMethod3.mockClear();
        mock_TestMethod4.mockClear();
        mock_TestMethod5.mockClear();
        mock_TestMethod6.mockClear();
        mock_TestMethod7.mockClear();
        mock_TestMethod8.mockClear();
    });

    afterEach(()=>{
        jest.clearAllMocks();
    })

    test("TestMethod1",()=>{

        // Arrange
        mock_TestMethod1.mockImplementation(()=> { return undefined});

        // Act
        targetInstance.InvokeTestMethod1();

        //Assert
        expect(mock_TestMethod1).toHaveBeenCalledTimes(1);
    });

    test("TestMethod2",()=>{

        // Arrange
        mock_TestMethod2.mockImplementation(()=> { return undefined});

        // Act
        targetInstance.InvokeTestMethod2("Hello");

        // Assert
        expect(mock_TestMethod2).toHaveBeenCalledTimes(1);
        expect(mock_TestMethod2).toHaveBeenCalledWith("Hello");
    });

    test("TestMethod3",()=>{

        // Arrange
        mock_TestMethod3.mockReturnValue("Hello Mock");

        // Act
        let response:string= targetInstance.InvokeTestMethod3();

        // Assert
        expect(response).toBe("Hello Mock");
        expect(mock_TestMethod3).toHaveBeenCalledTimes(1);
    });

    test("TestMethod4",()=>{

        // Arrange
    
        let mockUserModel:UserModel={
            FirstName:"Eshaan",
            LastName:"Naik"
        };

        mock_TestMethod4.mockReturnValue(mockUserModel);
        
        // Act
        let userModel:UserModel=targetInstance.InvokeTestMethod4();

        // Assert
        expect(userModel).toMatchObject({ FirstName:"Eshaan", LastName:"Naik" } as UserModel);
        expect(mock_TestMethod4).toHaveBeenCalledTimes(1);

    })

    test("TestMethod5-> Record All Found",()=>{

        //Arrange
        let mockUserModelList:Array<UserModel>=new Array<UserModel>();
            mockUserModelList.push({ FirstName:"Kishor", LastName:"Naik"} as UserModel);
            mockUserModelList.push({ FirstName:"Eshaan", LastName:"Naik"} as UserModel);
            mockUserModelList.push({ FirstName:"Yogesh", LastName:"Naik"} as UserModel);

        mock_TestMethod5.mockReturnValue(mockUserModelList);

        // Act
        let response:UserModel[]= targetInstance.InvokeTestMethod5();

        // Assert
        expect(response).toMatchObject(
            [
                {
                    FirstName:"Kishor",LastName:"Naik"
                }, 
                {
                    FirstName:"Eshaan",LastName:"Naik"
                },
                {
                    FirstName:"Yogesh",LastName:"Naik"
                }
            ] as Array<UserModel>)
        
        expect(mock_TestMethod5).toHaveBeenCalledTimes(1);
        expect(response.length).toBeGreaterThan(1);
    })

    test("TestMethod5-> No Record Found",()=>{

        //Arrange
      

        mock_TestMethod5.mockReturnValue([] as Array<UserModel>);

        // Act
        let response:UserModel[]= targetInstance.InvokeTestMethod5();

        // Assert
        expect(response).toMatchObject(
            [
            ] as Array<UserModel>)
        
        expect(mock_TestMethod5).toHaveBeenCalledTimes(1);
        expect(response.length).toBe(0);
    })

    test("TestMethod5-> Single record found",()=>{

        //Arrange

        mock_TestMethod6.mockReturnValue({ FirstName:"Eshaan", LastName:"Naik"} as UserModel);

        // Act
        let response:UserModel= targetInstance.InvokeTestMethod6("Eshaan");

        // Assert
        expect(response).toMatchObject({ FirstName:"Eshaan", LastName:"Naik"} as UserModel);
        
        expect(mock_TestMethod6).toHaveBeenCalledTimes(1);
        expect(mock_TestMethod6).toHaveBeenCalledWith("Eshaan");
    })

    test("Test method 7 ->Resolved Value",async ()=>{

        // Arrange
        mock_TestMethod7.mockResolvedValue({FirstName:"Kishor", LastName:"Naik"} as UserModel);

        // Act
        let response:UserModel=await targetInstance.InvokeTestMethod7("Kishor");

        // Assert
        expect(response).toMatchObject({FirstName:"Kishor", LastName:"Naik"} as UserModel);
        expect(mock_TestMethod7).toHaveBeenCalledTimes(1);
        expect(mock_TestMethod7).toHaveBeenCalledWith("Kishor");
    })

    test("Test method 7 -> Reject Value",async ()=>{

        // Arrange
        mock_TestMethod7.mockRejectedValue( new Error("Hello error"));

        // Act
        try
        {
            await targetInstance.InvokeTestMethod7("Kishor");
        }
        catch(ex)
        {
             // Assert
            expect(ex).toMatchObject({message:"Hello error"} as Error);
        }
    })

    test("Test method 8",async ()=>{

        // Arrange
        mock_TestMethod8.mockImplementation(()=> Promise.resolve());

        // Act
        
            await targetInstance.InvokeTestMethod8();

        // Arrange
            
            expect(mock_TestMethod8).toHaveBeenCalledTimes(1);
      
    })

    test("Test static method 9", ()=>{

        // Arrange
        mock_TestStaticMethod9.mockImplementation(()=> { return undefined});
            // Bind Mock instance to Static Method
            Logic.TestStaticMethod9=mock_TestStaticMethod9;
        // Act
        
             targetInstance.InvokeTestMethod9();

        // Arrange
            
            expect(mock_TestStaticMethod9).toHaveBeenCalledTimes(1);
      
    })
})
