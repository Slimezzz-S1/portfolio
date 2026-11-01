import monkey_type_csv
import fetch_data
import format_data

overwrite_files = True
monkeytype_use_csv = True

def main() -> None:
    while True:
        if input("Generate data?\ny/N?\n>>> ").lower().startswith("y"):
            break
        else:
            print("okay bye")
            quit(0)

    if monkeytype_use_csv:
        monkey_type_csv.generate()

    fetch_data.main()
    format_data.main()
    return None

if __name__ == "__main__":
    main()