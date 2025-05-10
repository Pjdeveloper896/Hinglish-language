import sys
import argparse

# Tokenizer: Breaks the input code into tokens
def tokenize(code):
    tokens = code.split()
    return tokens

# Parser: Converts tokens into an Abstract Syntax Tree (AST)
def parse(tokens):
    ast = []
    i = 0
    while i < len(tokens):
        token = tokens[i]
        if token == "agar":  # "agar" means "if" in Hinglish
            condition = tokens[i + 1]  # Simple condition
            ast.append({"type": "IF", "condition": condition})
            i += 2
        elif token == "ghoom":  # "ghoom" means "loop" in Hinglish
            times = int(tokens[i + 1])
            ast.append({"type": "LOOP", "times": times})
            i += 2
        elif token.isidentifier():  # Assume it's a variable
            ast.append({"type": "VARIABLE", "name": token})
            i += 1
        else:
            i += 1  # Skip invalid tokens (can improve later)
    return ast

# Interpreter: Executes the AST
def interpret(ast):
    for node in ast:
        if node["type"] == "IF":
            # Simple condition: if the condition equals "true"
            if node["condition"] == "true":
                print("Condition met!")
            else:
                print("Condition not met.")
        elif node["type"] == "LOOP":
            for _ in range(node["times"]):
                print("Loop iteration.")
        elif node["type"] == "VARIABLE":
            print(f"Variable: {node['name']}")
        else:
            print("Unknown command.")

# Console Input Handler
def run_console():
    print("Welcome to Hinglish Interpreter!")
    print("Type 'exit' to quit.")
    
    while True:
        try:
            # Get user input
            code = input("Enter Hinglish code: ").strip()
            
            if code.lower() == 'exit':
                print("Exiting Hinglish Interpreter...")
                break
            
            # Tokenize, parse, and interpret the code
            tokens = tokenize(code)
            ast = parse(tokens)
            interpret(ast)
        
        except Exception as e:
            print(f"Error: {e}")

# File Input Handler
def run_file(file_path):
    try:
        with open(file_path, 'r') as file:
            code = file.read()
            
            # Tokenize, parse, and interpret the code
            tokens = tokenize(code)
            ast = parse(tokens)
            interpret(ast)
    
    except FileNotFoundError:
        print(f"Error: The file '{file_path}' was not found.")
    except Exception as e:
        print(f"An error occurred: {e}")

# CLI Handler
def main():
    parser = argparse.ArgumentParser(description="Hinglish Language Interpreter")
    parser.add_argument('--file', type=str, help='Path to the Hinglish source code file')
    parser.add_argument('--console', action='store_true', help='Run in console mode')
    args = parser.parse_args()

    if args.console:
        # Run in console mode
        run_console()
    elif args.file:
        # Run with file input
        run_file(args.file)
    else:
        print("Please provide either --console for interactive mode or --file <file_path> for file-based input.")
        sys.exit(1)

if __name__ == "__main__":
    main()
