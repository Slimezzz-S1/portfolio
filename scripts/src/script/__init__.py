from pathlib import Path
import os

WEB_ROOT_FILEPATH = Path(__file__).parent.parent.parent.parent
SCRIPTS_ROOT_FILEPATH = WEB_ROOT_FILEPATH / "scripts"

DATA_FILEPATH = WEB_ROOT_FILEPATH / "src" / "assets" / "data"

GITHUB_USERNAME = "SlimeZZZ-S1"
GITHUB_FILEPATH = DATA_FILEPATH / "github"
GITHUB_OUTPUT_FILENAME = "results.json"
GITHUB_OUTPUT_FILEPATH = GITHUB_FILEPATH / GITHUB_OUTPUT_FILENAME

MONKEYTYPE_USERNAME = "slimez7"
MONKEYTYPE_FILEPATH = DATA_FILEPATH / "monkey-type"
MONKEYTYPE_OUTPUT_FILENAME = "results.json"
MONKEYTYPE_OUTPUT_FILEPATH = MONKEYTYPE_FILEPATH / MONKEYTYPE_OUTPUT_FILENAME

LEETCODE_USERNAME = "slimezzz-s1"
LEETCODE_FILEPATH = DATA_FILEPATH / "leet-code"
LEETCODE_OUTPUT_FILENAME = "results.json"
LEETCODE_OUTPUT_FILEPATH = LEETCODE_FILEPATH / LEETCODE_OUTPUT_FILENAME

def is_filepath_valid(filepath : str | Path, raise_error : bool = False) -> bool:
    if raise_error and not os.path.exists(filepath):
        raise FileNotFoundError(f"filepath '{filepath}' doesn't exists!")

    return True if os.path.exists(filepath) else False

is_filepath_valid(WEB_ROOT_FILEPATH, raise_error = True)
is_filepath_valid(SCRIPTS_ROOT_FILEPATH, raise_error = True)
is_filepath_valid(DATA_FILEPATH, raise_error = True)
is_filepath_valid(GITHUB_FILEPATH, raise_error = True)
is_filepath_valid(MONKEYTYPE_FILEPATH, raise_error = True)
is_filepath_valid(LEETCODE_FILEPATH, raise_error = True)

def main() -> None:
    print("this is dunder init file")

if __name__ == "__main__":
    main()