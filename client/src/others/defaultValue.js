export const defaultValue = {
    java: `public class HelloWorld 
    { 
        // Your program begins with a call to main(). 
        // Prints "Hello, World" to the terminal window. 
        public static void main(String args[]) 
        { 
            System.out.println("Hello, World"); 
        } 
    } 
    `,
    python: `print("Hello World")`,
    ruby: `puts "Hello World!"`,
    golang: `package main 
    
    import "fmt"
    
    // Main function 
    func main() { 
    
    fmt.Println("!... Hello World ...!") 
    } 
    `,
    csharp: `using System; 
    
    // namespace declaration 
    namespace HelloWorldApp { 
    
    // Class declaration 
    class Geeks { 
        
        // Main Method 
        static void Main(string[] args) { 
        
        // statement 
        // printing Hello World! 
        Console.WriteLine("Hello World!"); 
        
        // To prevents the screen from 
        // running and closing quickly 
        Console.ReadKey(); 
        } 
    } 
    } `,
    elixir: `IO.puts("Hello, World!")`
};

