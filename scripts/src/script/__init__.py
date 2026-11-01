from pathlib import Path
import os

###
### ROOT
###

WEB_ROOT_FILEPATH = Path(__file__).parent.parent.parent.parent
SCRIPTS_ROOT_FILEPATH = WEB_ROOT_FILEPATH / "scripts"
GRAPHQL_ROOT_FILEPATH = SCRIPTS_ROOT_FILEPATH / "graphql"
DATA_FILEPATH = WEB_ROOT_FILEPATH / "src" / "assets" / "data"

###
### GITHUB
###

GITHUB_USERNAME = "SlimeZZZ-S1"
GITHUB_GRAPHQL_FILEPATH = GRAPHQL_ROOT_FILEPATH / "github_graph.graphql"
GITHUB_FILEPATH = DATA_FILEPATH / "github"

GITHUB_RAW_FILENAME = "raw.json"
GITHUB_RAW_FILEPATH = GITHUB_FILEPATH / GITHUB_RAW_FILENAME

GITHUB_OUTPUT_FILENAME = "results.json"
GITHUB_OUTPUT_FILEPATH = GITHUB_FILEPATH / GITHUB_OUTPUT_FILENAME

###
### MONKEYTYPE
###

MONKEYTYPE_USERNAME = "slimez7"
MONKEYTYPE_FILEPATH = DATA_FILEPATH / "monkey-type"

MONKEYTYPE_RAW_FILENAME = "raw.json"
MONKEYTYPE_RAW_FILEPATH = MONKEYTYPE_FILEPATH / MONKEYTYPE_RAW_FILENAME

MONKEYTYPE_CSV_FILENAME = "results.csv"
MONKEYTYPE_CSV_FILEPATH = MONKEYTYPE_FILEPATH / MONKEYTYPE_FILEPATH

MONKEYTYPE_OUTPUT_FILENAME = "results.json"
MONKEYTYPE_OUTPUT_FILEPATH = MONKEYTYPE_FILEPATH / MONKEYTYPE_OUTPUT_FILENAME

###
### LEETCODE
###

LEETCODE_USERNAME = "slimezzz-s1"
LEETCODE_GRAPHQL_FILEPATH = GRAPHQL_ROOT_FILEPATH / "leetcode_graph.graphql"
LEETCODE_FILEPATH = DATA_FILEPATH / "leet-code"

LEETCODE_RAW_FILENAME = "raw.json"
LEETCODE_RAW_FILEPATH = LEETCODE_FILEPATH / LEETCODE_RAW_FILENAME

LEETCODE_OUTPUT_FILENAME = "results.json"
LEETCODE_OUTPUT_FILEPATH = LEETCODE_FILEPATH / LEETCODE_OUTPUT_FILENAME


def is_filepath_valid(filepath : str | Path, raise_error : bool = False) -> bool:
    if raise_error and not os.path.exists(filepath):
        raise FileNotFoundError(f"filepath '{filepath}' doesn't exists!")

    return True if os.path.exists(filepath) else False

###
### CHECK
###

is_filepath_valid(SCRIPTS_ROOT_FILEPATH, raise_error = True)
is_filepath_valid(WEB_ROOT_FILEPATH, raise_error = True)
is_filepath_valid(GRAPHQL_ROOT_FILEPATH, raise_error = True)

is_filepath_valid(GITHUB_FILEPATH, raise_error = True)
is_filepath_valid(MONKEYTYPE_FILEPATH, raise_error = True)
is_filepath_valid(LEETCODE_FILEPATH, raise_error = True)

###
### MAIN
###

def main() -> None:
    ...

if __name__ == "__main__":
    main()