from datetime import datetime, timedelta, timezone
from dataclasses import dataclass
from typing import Any, Literal, TypedDict
from dotenv import load_dotenv
from pathlib import Path
import requests
import math
import json
import csv
import os

def fp_chk(fp : Path | str) -> None:
    if not os.path.exists(fp):
        raise FileNotFoundError(f"Filepath doesnt exists : {fp}")

    return None

MONKEYTYPE_USE_CSV = True
ROOT_FILEPATH = Path(__file__).parent.parent.parent.parent
SCRIPTS_FILEPATH = ROOT_FILEPATH / "scripts"
INPUT_FILEPATH = SCRIPTS_FILEPATH / "input_folder"
ENV_FILEPATH = ROOT_FILEPATH / ".env"

OUTPUT_FILENAME = "results.json"

DATA_FILEPATH = ROOT_FILEPATH / "src" / "assets" / "data"
GITHUB_FILEPATH = DATA_FILEPATH / "github"
LEETCODE_FILEPATH = DATA_FILEPATH / "leetcode"
MONKEYTYPE_FILEPATH = DATA_FILEPATH / "monkeytype"

MONKEYTYPE_CSV = INPUT_FILEPATH / "results.csv"

GITHUB_OUTPUT_FILEPATH = DATA_FILEPATH / OUTPUT_FILENAME
LEETCODE_OUTPUT_FILEPATH = DATA_FILEPATH / OUTPUT_FILENAME
MONKEYTYPE_OUTPUT_FILEPATH = DATA_FILEPATH / OUTPUT_FILENAME

GITHUB_GRAPHQL_FILEPATH = INPUT_FILEPATH / "github_graph.graphql"
LEETCODE_GRAPHQL_FILEPATH = INPUT_FILEPATH / "leetcode_graph.graphql"

GITHUB_GRAPHQL_URL = "https://api.github.com/graphql"
LEETCODE_GRAPHQL_URL = "https://leetcode.com/graphql"

MONKEYTYPE_USERNAME = "slimez7"
GITHUB_USERNAME = "SlimeZZZ-S1"
LEETCODE_USERNAME = "slimezzz-s1"

START_UTC = datetime(2026, 5, 4, tzinfo = timezone.utc)
END_UTC = datetime.now(tz = timezone.utc)

def get_variables(source : Literal["github", "monkeytype", "leetcode"]) -> dict[str, Any]:
    match source:
        case "github":
            return {
                "login" : GITHUB_USERNAME,
                "from" : START_UTC.isoformat(),
                "tp" : END_UTC.isoformat()
            }
        case "leetcode":
            return {
                "username" : LEETCODE_USERNAME,
                "year" : START_UTC.year
            }
        case "monkeytype":
            return {}
        case _:
            return {}

def get_headers(source : Literal["github", "monkeytype", "leetcode"], token : str | None = None) -> dict[str, Any]:
    match source:
        case "github":
            if not token:
                raise ValueError("where is token?")
            
            return {
                "Authorization": f"Bearer {token}"
            }
        case "leetcode":
            return {
                "Referer": "https://leetcode.com",
                "User-Agent": "Mozilla/5.0"
            }
        case "monkeytype":
            return {}
        case _:
            return {}

if MONKEYTYPE_USE_CSV:
    fp_chk(MONKEYTYPE_CSV)

fp_chk(ROOT_FILEPATH)
fp_chk(ENV_FILEPATH)
fp_chk(SCRIPTS_FILEPATH)
fp_chk(INPUT_FILEPATH)
fp_chk(DATA_FILEPATH)
fp_chk(GITHUB_FILEPATH)
fp_chk(LEETCODE_FILEPATH)
fp_chk(MONKEYTYPE_FILEPATH)
fp_chk(GITHUB_GRAPHQL_FILEPATH)
fp_chk(LEETCODE_GRAPHQL_FILEPATH)

load_dotenv(ENV_FILEPATH)

def read_file(fp : str | Path) -> str:
    with open(fp, "r", encoding = "utf-8") as f:
        return f.read()

def write_file(text : str, fp : str | Path, force_overwrite : bool = True) -> None:
    if not force_overwrite and os.path.exists(fp):
        if not input(f"Filepath exists, overwrite it?\ny/N\n>>> ").lower().startswith("y"):
            return None

    with open(fp, "w", encoding = "utf-8") as f:
        f.write(text)

    return None

def generate_date(start : datetime = datetime(2026, 1, 1), end : datetime = datetime(2026, 12, 31)) -> list[datetime]:
    return [start + timedelta(days = i) for i in range((end - start).days + 1)]

def generate_date_strs(start : datetime = datetime(2026, 1, 1), end : datetime = datetime(2026, 12, 31)) -> list[str]:
    return [format_date(start + timedelta(days = i)) for i in range((end - start).days + 1)]

def fill_empty_dates_rows(data: dict[str, int]) -> dict[str, int]:
    result = {date : 0 for date in generate_date_strs()}
    result.update({key: value for key, value in data.items() if key in result})

    return result

def fill_empty_dates_results(data : list[str]) -> dict[str, int]:
    result = {format_date(date) : 0 for date in generate_date()}

    for date in data:
        result[date] += 1

    return result

def json_encode(data : list[dict[str, Any]] | dict[str, Any]) -> str:
    if not type(data) in (list, dict):
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
                return "[\n" + ",\n".join(items) + "\n" + indent + "]"
            
            case dict():
                if not value:
                    return "{}"
                
                items = [f"{inner_indent}{json.dumps(str(k), ensure_ascii = False)}: {encode(v, indent_level + 1)}" for k, v in value.items()]
                return "{\n" + ",\n".join(items) + "\n" + indent + "}"

            case _:
                raise TypeError(f"cannot encode type {type(value).__name__}")

        return encode(data, 0)
    
    return encode(data)

def fetch_data(url : str, variables : dict[str, Any], query : str, headers : dict[str, Any]) -> dict[str, Any]:
    response = requests.post(
        url,
        json = {
            "query" : query,
            "variables" : variables
        },
        headers = headers
    )

    response.raise_for_status()
    return response.json()

def csv_to_json(fp : str | Path) -> list[dict[str, Any]]:
    result : list[dict[str, Any]] = []
    raw = read_file(fp)
    reader = csv.DictReader(raw.splitlines())

    for row in reader:
        result.append({key : value for key, value in row.items()})

    return result

type Result = dict[str, Any]
type Results = list[Result]

@dataclass
class Field:
    name : str
    raw_name : str | None = None
    field_type : type = str

    def __post_init__(self):
        if self.raw_name is None:
            self.raw_name = self.name

FIELDS : list[Field] = [
    Field("timestamp", field_type = int),
    Field("wpm", field_type = float),
    Field("rawWpm", field_type = float),
    Field("accuracy", "acc", field_type = float),
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

def format_date(date : datetime) -> str:
    return date.strftime("%Y-%m-%d")

def filter_fields(data : Result, fields : list[Field] = FIELDS) -> Result:
    by_raw = {field.raw_name : field for field in fields}
    return {by_raw[key].name : by_raw[key].field_type(value) for key, value in data.items() if key in by_raw}

def filter_all_fields(data : Results, fields : list[Field] = FIELDS) -> Results:
    return [filter_fields(result, fields = fields) for result in data]

def filter_modes(data : Results, **criteria) -> list[dict[str, Any]]:
    return [result for result in data if all(result.get(key) == value for key, value in criteria.items())]

def create_categories(data : Results, categories : list[str] = CATEGORIES, subcategories : dict[str, list[str]] = MODES) -> dict[str, dict[str, Any]]:
    def average(data : Results, key : str) -> float | None:
        return sum(result[key] for result in data) / len(data) if data else None

    def per_mode(category : str, data : Results = data) -> dict[str, dict[str, Any]]:
        match category:
            case "fastest":
                return {
                    mode : {
                        mode2 : max(filter_modes(data, mode = mode, mode2 = mode2), key = lambda result : result["wpm"])
                        for mode2 in mode2_list
                    }
                    for mode, mode2_list in subcategories.items()
                }
            case "first":
                return {
                    mode : {
                        mode2: next(iter(filter_modes(data, mode=mode, mode2=mode2)), None)
                        for mode2 in mode2_list
                    }
                    for mode, mode2_list in subcategories.items()
                }
            case "average":
                return {
                    mode : {
                        mode2 : {
                            "wpm" : average(filter_modes(data, mode = mode, mode2 = mode2), "wpm"),
                            "rawWpm" : average(filter_modes(data, mode = mode, mode2 = mode2), "rawWpm"),
                            "accuracy" : average(filter_modes(data, mode = mode, mode2 = mode2), "accuracy"),
                        }
                        for mode2 in mode2_list
                    }
                    for mode, mode2_list in subcategories.items()
                }
            case _:
                return {}

    return {category : per_mode(category) for category in categories}

def monkeytype(use_csv : bool = True) -> None:
    raw = csv_to_json(MONKEYTYPE_CSV)
    filtered_results = filter_all_fields(raw)
    categories = create_categories(filtered_results)

    dates = [format_date(datetime.fromtimestamp(result["timestamp"] / 1000)) for result in filtered_results]
    dates.sort()
    results_count = fill_empty_dates_results(dates)

    result = categories | {
        "results" : results_count
    }

    write_file(json_encode(result), MONKEYTYPE_OUTPUT_FILEPATH)
    return None

def github() -> None:
    raw : dict[str, Any] = fetch_data(
        GITHUB_GRAPHQL_URL,
        get_variables("github"),
        read_file(GITHUB_GRAPHQL_FILEPATH),
        get_headers("github", os.environ["GITHUB_API_KEY"])
    )["data"]["user"]["contributionsCollection"]

    copy_fields = [
        "totalCommits",
        "totalPullRequests",
        "totalIssues",
        "totalPullRequestReviews"
    ]
    
    dates : dict[str, Any] = {day["date"] : day["amount"] for week in raw["calendar"]["weeks"] for day in week["days"]}
    results_counts = fill_empty_dates_rows(dates)

    result = {
        key : value for key, value in raw.items() if key in copy_fields
    }

    result = result | {
        "totalContributions" : raw["calendar"]["totalContributions"],
        "results" : results_counts
    }

    
    write_file(json_encode(result), GITHUB_OUTPUT_FILEPATH)
    return None

def leetcode() -> None:
    raw = fetch_data(
        LEETCODE_GRAPHQL_URL,
        get_variables("leetcode"),
        read_file(LEETCODE_GRAPHQL_FILEPATH),
        get_headers("leetcode")
    )["data"]["user"]

    submissions : dict[str, int] = json.loads(raw["calendar"]["submissions"])
    dates = {format_date(datetime.fromtimestamp(int(timestamp), tz=timezone.utc)): count for timestamp, count in submissions.items()}
    result = {
        "streak" : raw["calendar"]["streak"],
    }

    result = result | {
        "results" : fill_empty_dates_rows(dates)
    }

    write_file(json_encode(result), LEETCODE_OUTPUT_FILEPATH)
    return None

def main(force_overwrite : bool = False) -> None:
    if not force_overwrite and (os.path.exists(MONKEYTYPE_OUTPUT_FILEPATH) or os.path.exists(GITHUB_OUTPUT_FILEPATH) or os.path.exists(LEETCODE_OUTPUT_FILEPATH)):
        if not input("files exist, overwrite them?\nY/n\n>>> ").lower() in ["y", "yes"]:
            quit()

    monkeytype()
    github()
    leetcode()

    return None

if __name__ == "__main__":
    main()