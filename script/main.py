from typing import Any

from csv_to_json import encode
import config
from pathlib import Path

RAW_DATA = config.DATA_PATH / "monkeyType" / "results.csv"
RESULT_FILEPATH = config.DATA_PATH / "monkeyType" / "results.json"

def createFile(filepath : Path | str = RESULT_FILEPATH, contents : str = "") -> None:
    if not contents:
        return None
    
    with open(filepath, "w", encoding = "utf-8") as f:
        f.write(contents)

    return None

def toJsonStr(data : dict[str, Any]) -> str:
    result : str = ""

    def escape(text : str) -> str:
        return (
            text.replace("\\", "\\\\")
            .replace('"', '\\"')
            .replace("\n", "\\n")
            .replace("\r", "\\r")
            .replace("\t", "\\t")
        )


    def add(text: str = "", level: int = 0, end: str = "") -> None:
        nonlocal result
        result += "\t" * level + text + end

    def writeValue(value: Any, level: int) -> None:
        match value:
            case None:
                add("null")

            case bool():
                add("true" if value else "false")

            case int() | float():
                add(str(value))

            case str():
                add(f'"{escape(value)}"')

            case dict() if not value:
                add("{}")

            case dict():
                add("{", end="\n")
                last = len(value) - 1

                for i, (k, v) in enumerate(value.items()):
                    add(f'"{escape(str(k))}": ', level + 1)
                    writeValue(v, level + 1)  # recursion
                    add("," if i < last else "", end="\n")
                add("}", level)

            case list() | tuple() if not value:
                add("[]")

            case list() | tuple():
                add("[", end="\n")
                last = len(value) - 1

                for i, v in enumerate(value):
                    add("", level + 1)
                    writeValue(v, level + 1)  # recursion
                    add("," if i < last else "", end="\n")

                add("]", level)

            case _:
                raise TypeError(f"Can't serialize {type(value).__name__}")

    writeValue(data, 0)

    return result

# print(toJsonStr(encode(RAW_DATA)))
createFile(RESULT_FILEPATH, str(toJsonStr(encode(RAW_DATA))))

# print(encode(RAW_DATA))


