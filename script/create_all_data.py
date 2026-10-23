from dataclasses import dataclass
from enum import Enum
from pathlib import Path
from typing import Any, Literal
import csv
import json
import math

ROOT_PATH : Path = Path(__file__).parent.parent
DATA_PATH : Path = ROOT_PATH / "src" / "assets" / "data" / "monkey-type"
INPUT_PATH : Path = DATA_PATH / "results.csv"
OUTPUT_PATH : Path = DATA_PATH / "results.json"


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
            quit

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

def write_file(text : str, filepath : str | Path = OUTPUT_PATH) -> None:
    with open(filepath, "w", encoding = "utf-8") as f:
        f.write(text)

def json_encode(data : list[dict[str, Any]] | dict[str, Any]) -> str:
    if not type(data) in [list, dict]:
        raise TypeError(f"{type(data)} is not either a list or a dict!")

    def encode(value : Any, indent_level : int = 0) -> str:
        indent = "\t" * indent_level
        inner_indent = "\t" * (indent_level + 1)

        match value:
            case None:
                return "null"
            
            case bool():
                return "true" if value else "false"
            
            case int():
                return str(value)
            
            case float():
                if math.isnan(value) or math.isinf(value):
                    return "null"
                
                return str(value)
            
            case str():
                return json.dumps(value, ensure_ascii = False)
            
            case list():
                if not value:
                    return "[]"
                
                items = [inner_indent + encode(v, indent_level = indent_level + 1) for v in value]
                return "[\n" + ",\n".join(items) + "\n]"
            
            case dict():
                if not value:
                    return "{}"
                
                items = [
                    f"{inner_indent}{json.dumps(str(k), ensure_ascii = False)}: {encode(v, indent_level + 1)}" for k, v in value.items()
                ]
                return "{\n" + ",\n".join(items) + "\n" + indent + "}"
            
            case _:
                raise TypeError(f"cannot encode type {type(value).__name__}")

        return encode(data, 0)
    
    return encode(data)

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
    ...

def main() -> None:
    init()

    dict_data = [item for item in csv_encode(sort_key = "wpm", sort_reverse = True) if item["wpm"] >= 70]
    # json_string = json_encode(dict_data)

    # format_data : dict[str, dict[str, Any]] = {
    #     "average" : sum(item["wpm"] for item in dict_data) / len(dict_data),
    #     "fastest" : max(dict_data, key = lambda data : data["wpm"])
    #     # "fastest" : {
    #     #     key : max()
    #     # }
    # }

    format_data : dict[str, dict[str, Any]] = {
        category : {mode : {md2 : filter_by_category(filter_by_mode(dict_data, mode, md2), category) for md2 in mode2} for mode, mode2 in MODES.items()} for category in CATEGORIES
    }

    # print(filter_by_mode(dict_data, "time", "120"))
    # write_file(text = json_encode(filter_by_mode(dict_data, "time", "15", with_mode2 = True)))
    write_file(text = json_encode(format_data))

    # print(format_data)

    # write_file(text = json_encode(format_data))

    # write_file(filepath = DATA_PATH / "test.txt", text = str(sorted(dict_data, key = lambda item : item["wpm"], reverse = True)))
    # print(max(dict_data, key = lambda data : data["wpm"]))
    # print(sum(item["wpm"] for item in dict_data) / len(dict_data))

    return None

if __name__ == '__main__':
    main()