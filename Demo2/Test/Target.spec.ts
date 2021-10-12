//https://medium.com/nerd-for-tech/testing-typescript-with-jest-290eaee9479d
//https://medium.com/swlh/mock-a-library-in-jest-and-typescript-a8bec189efc3

// Actual Import
import {Logic} from "../src/Logic"
import axios, { AxiosResponse } from "axios";
import { Target } from "../src/Target";

// Mock Import Class
jest.mock("../src/Logic");
jest.mock("axios");

// Mock Functions
let mock_TestMethod1=jest.fn();
let mock_TestMethod2=jest.fn();
let mock_TestMethod3=jest.fn();
let mock_Static_TestMethod4=jest.fn();
let mock_Axios_Get_Method=jest.fn();
let mock_Arrow_function=jest.fn();

describe("Target-Demo",()=>{

    // Declaration
    let targetInstance:Target;

    beforeEach(()=>{
        targetInstance=new Target()

        mock_TestMethod1.mockClear();
        mock_TestMethod2.mockClear();
        mock_TestMethod3.mockClear();
        mock_Static_TestMethod4.mockClear();
        mock_Axios_Get_Method.mockClear();
    })

    test("Should mock class B",()=>{
       
      // Arrange
       jest.spyOn(Logic.prototype,"TestMethod1").mockImplementation(mock_TestMethod1.mockReturnValue(undefined));
      //  const mockedLogic=new Logic() as jest.Mocked<Logic>;
      //    mockedLogic.TestMethod1.mockReturnValue(undefined);

       // Act
       targetInstance.InvokeTestMethod1();

       // Assert
       expect(mock_TestMethod1).toHaveBeenCalledTimes(1);
       //expect(mockedLogic.TestMethod1).toHaveBeenCalledTimes(1);

    })

    
    test("Test Method Should be Return 'KN'",()=>{
        // Arrange
        
        jest.spyOn(Logic.prototype,"TestMethod2").mockImplementation(mock_TestMethod2.mockReturnValue('KN'));
 
        // Act
        let value:string =targetInstance.InvokeTestMethod2("Kishor","Naik");
 
        // Assert
        expect(mock_TestMethod2).toHaveBeenCalledTimes(1);
        expect(mock_TestMethod2).toHaveBeenCalledWith("KN");
        expect(value).toBe("KN");
 
     })

     test("Test Method Should be Return 'KN' async",async ()=>{
        // Arrange
        
        jest.spyOn(Logic.prototype,"TestMethod3").mockImplementation(mock_TestMethod3.mockResolvedValue('KN'));
 
        // Act
        let value:string =await targetInstance.InvokeTestMethod3("Kishor","Naik");
 
        // Assert
        expect(mock_TestMethod3).toHaveBeenCalledTimes(1);
        expect(mock_TestMethod3).toHaveBeenCalledWith("KN");
        expect(value).toBe("KN");
 
     })

     test("should mock static function named",()=>{

         //Arrange
         const mockLogic=Logic as jest.Mocked<typeof Logic>;
         mockLogic.TestMethod4.mockImplementation(mock_Static_TestMethod4.mockReturnValue("Kishor Naik"));

         // Act
         let value:string=targetInstance.InvokeTestMethod4();

         // Assert
         expect(mock_Static_TestMethod4).toHaveBeenCalledTimes(1);
         expect(value).toBe("Kishor Naik");
   
     })

     test("should mock static function named spyon",()=>{

        //Arrange
        jest.spyOn(Logic,"TestMethod4").mockImplementation(mock_Static_TestMethod4.mockReturnValue("Kishor Naik"));

        // Act
        let value:string=targetInstance.InvokeTestMethod4();

        // Assert
        expect(mock_Static_TestMethod4).toHaveBeenCalledTimes(1);
        expect(value).toBe("Kishor Naik");
  
    })

     test("axios test",async ()=>{

      // Arrange
      const mockedAxios = axios as jest.Mocked<typeof axios>;
            mockedAxios.get.mockResolvedValue({ data:{ name:"Kishor Naik"}, status:200,statusText:"OK" } as AxiosResponse<{name:string}>)

      // Act
      let value:AxiosResponse<{name:string}>=await targetInstance.InvokeTestMethod5();

      // Assert 
      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
      expect(value.data.name).toBe("Kishor Naik");

     })

     test("axios test jest spy",async ()=>{

        // Arrange
        // const mockedAxios = axios as jest.Mocked<typeof axios>;
        //       mockedAxios.get.mockResolvedValue({ data:{ name:"Kishor Naik"}, status:200,statusText:"OK" } as AxiosResponse<{name:string}>)
        jest.spyOn(axios,"get").mockImplementation(mock_Axios_Get_Method.mockResolvedValue({ data:{ name:"Kishor Naik"}, status:200,statusText:"OK" } as AxiosResponse<{name:string}>));
  
        // Act
        let value:AxiosResponse<{name:string}>=await targetInstance.InvokeTestMethod5();
  
        // Assert 
        expect(mock_Axios_Get_Method).toHaveBeenCalledTimes(1);
        expect(value.data.name).toBe("Kishor Naik");
  
       })

    test("Arrow-Function",()=>{

        //Arrange
        jest.spyOn(Logic.prototype,"TestMethod6").mockImplementation(mock_Arrow_function.mockReturnValue("Kishor Naik"));
        
        // Act
        let value:string=targetInstance.InvokeTestMethod6();

        // Assert
        expect(mock_Arrow_function).toHaveBeenCalledTimes(1);
        expect(value).toBe("Kishor Naik");
    })

})