import csv
from dataclasses import dataclass
from enum import Enum
import json
from pathlib import Path

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

    def convert(self, value : str):
        if value == "":
            return None
        match self:
            case FieldType.INT:
                return int(value)
            case FieldType.FLOAT:
                return float(value)
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

FIELD = [
    Field("timestamp", fieldType = FieldType.FLOAT),
    Field("wpm", fieldType = FieldType.FLOAT),
    Field("accuracy", "acc", fieldType = FieldType.FLOAT),
    Field("mode"),
    Field("modeDetailed", "mode2")
]

TEXT = {
    "mode",
    "mode2"
}

def encode(filePath : Path | str) -> list[dict[str, str | int | float | None]]:
    results : list[dict[str, str | int | float | None]] = []

    with open(r"src\assets\data\monkeyType\results.csv", mode = "r", newline = "", encoding = "utf-8") as f:
        for row in csv.DictReader(f):
            results.append({field.name : field.fieldType.convert(row[field.rawName]) for field in FIELD})

    results.sort(key = lambda r : r["timestamp"] or 0)
    
    return results

# print(results)