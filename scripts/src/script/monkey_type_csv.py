from goodies import json_encode, write_file
from dataclasses import dataclass
from typing import Any, Literal
from pathlib import Path
from enum import Enum
import csv

from script import MONKEYTYPE_FILEPATH, MONKEYTYPE_OUTPUT_FILEPATH

INPUT_PATH : Path = MONKEYTYPE_FILEPATH / "results.csv"
OUTPUT_PATH : Path = MONKEYTYPE_OUTPUT_FILEPATH

#
# OPTIONS
#

FORCE_IF_FILE_EXISTS : bool = True

def init() -> None:
    if not INPUT_PATH.is_file():
        raise FileNotFoundError(f"{f"{INPUT_PATH}"} does not exist")

    if not FORCE_IF_FILE_EXISTS and OUTPUT_PATH.is_file():
        user_confirm : str = input(f"The output file {OUTPUT_PATH} already exists, do you want to continue?\ny/n\n>>> ")

        if not user_confirm.lower() in ["y", "yes"]:
            quit()

    return None

###             ###
###     INIT    ###
###             ###

# FIELDS
# _id,
# isPb,
# wpm,
# acc,
# rawWpm,
# consistency,
# charStats,
# mode,
# mode2,
# quoteLength,
# restartCount,
# testDuration,
# afkDuration,
# incompleteTestSeconds,
# punctuation,
# numbers,
# language,
# funbox,
# difficulty,
# lazyMode,
# blindMode,
# bailedOut,
# tags,
# timestamp

class FieldType(Enum):
    STR = "str"
    INT = "int"
    FLOAT = "float"
    # TIMESTAMP_MS = "timestamp_ms"

    def convert(self, value : str):
        if value == "":
            return None
        match self:
            case FieldType.INT:
                return int(value)
            case FieldType.FLOAT:
                return float(value)
            # case FieldType.TIMESTAMP_MS:
            #     return datetime.fromtimestamp(float(value) / 1000, tz=timezone.utc)
            case FieldType.STR:
                return value

@dataclass
class Field:
    name : str
    rawName : str | None = None
    fieldType : FieldType = FieldType.STR

    def __post_init__(self):
        if self.rawName is None:
            self.rawName = self.name
        

FIELDS : list[Field] = [
    Field("timestamp", fieldType = FieldType.FLOAT),
    Field("wpm", fieldType = FieldType.FLOAT),
    Field("rawWpm", fieldType = FieldType.FLOAT),
    Field("accuracy", "acc", fieldType = FieldType.FLOAT),
    Field("mode"),
    Field("mode2")
]

MODES : dict[str, list[str]] = {
    "words" : [
        "10",
        "25",
        "50",
        "100"
    ],
    "time" : [
        "15",
        "30",
        "60",
        "120"
    ]
}

CATEGORIES = [
    "average",
    "fastest",
    "first"
]

type Modes = Literal["words", "time"]
type Modes2 = Literal["10", "25", "50", "100", "15", "30", "60", "120"]

def csv_encode(filepath : Path | str = INPUT_PATH, fields : list[Field] = FIELDS, sort_key : str = FIELDS[0].name, sort_reverse : bool = False) -> list[dict[str, Any]]:
    result : list[dict[str, Any]] = []

    with open(filepath, "r", encoding = "utf-8") as f:
        reader = csv.DictReader(f)

        for row in reader:
            item : dict[str, Any] = {field.name: field.fieldType.convert(row[field.rawName]) for field in fields}
            result.append(item)

    result.sort(key = lambda item : item[sort_key], reverse = sort_reverse)
    return result

def filter_by_mode(data : list[dict[str, Any]], mode : Modes | str, mode2 : Modes2 | str, with_mode2 : bool = True) -> list[dict[str, Any]]:
    if with_mode2 and not mode2:
        raise ValueError("no value in mode2!")

    if with_mode2 and not mode2 in MODES[mode]:
        raise ValueError(f"mode2 '{mode2}' doesnt exist in mode {mode}'")

    if with_mode2:
        return [item for item in data if item["mode"] == mode and item["mode2"] == mode2]

    return [item for item in data if item["mode"] == mode]

def filter_by_category(data : list[dict[str, Any]], category : str) -> dict[str, Any]:
    if not category in CATEGORIES:
        raise ValueError(f"category '{category}' does not exist in '{CATEGORIES}'")

    match category:
        case "average":
            avg = sum(d["wpm"] for d in data) / len(data)
            return min(data, key=lambda d: abs(d["wpm"] - avg))
        
        case "fastest":
            return max(data, key = lambda d: d["wpm"])
        
        case "first":
            return min(data, key = lambda d: d["timestamp"])
        
        case _:
            raise ValueError("where is the category?")

def generate() -> None:
    dict_data = [item for item in csv_encode(sort_key = "wpm", sort_reverse = True) if item["wpm"] >= 70]

    format_data : dict[str, dict[str, Any]] = {
        category : {mode : {md2 : filter_by_category(filter_by_mode(dict_data, mode, md2), category) for md2 in mode2} for mode, mode2 in MODES.items()} for category in CATEGORIES
    }

    write_file(filepath = OUTPUT_PATH, text = json_encode(format_data))


def main() -> None:
    init()

    generate()
    return None

if __name__ == '__main__':
    main()