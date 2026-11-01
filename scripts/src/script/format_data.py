from typing import Any, TypedDict
from datetime import datetime
from goodies import json_encode, read_file, write_file
from script import GITHUB_RAW_FILEPATH, GITHUB_OUTPUT_FILEPATH, LEETCODE_RAW_FILEPATH, LEETCODE_OUTPUT_FILEPATH
import json

class Activity(TypedDict):
    date : datetime
    amount : int

class Activities(TypedDict):
    days : dict[str, int]

class GithubData(Activities):
    totalCommits : int
    totalPullRequests : int
    totalIssues : int
    totalPullRequestReviews : int
    totalContributions : int

class LeetCodeData(Activities):
    streak : int

def format_github() -> dict[str, Any]:
    result = dict.fromkeys(GithubData.__annotations__, None)
    raw_result = json.loads(read_file(GITHUB_RAW_FILEPATH))

    for res_key in result.keys():
        for raw_key, raw_value in raw_result.items():
            if res_key == raw_key:
                result[res_key] = raw_value
                continue

    result["totalContributions"] = raw_result["calendar"]["totalContributions"]

    result.pop("days")
    result["days"] = {day["date"] : day["amount"] for week in raw_result["calendar"]["weeks"] for day in week["days"]}

    return result

def format_leetcode() -> dict[str, Any]:
    result = {}
    raw_result = json.loads(read_file(LEETCODE_RAW_FILEPATH))

    result["streak"] = raw_result["streak"]
    result["days"] = {date.replace(" 00:00:00+00:00", "") : count for date, count in raw_result["submissions"].items()}

    return result

def main() -> None:
    write_file(GITHUB_OUTPUT_FILEPATH, json_encode(format_github()))
    write_file(LEETCODE_OUTPUT_FILEPATH, json_encode(format_leetcode()))
    return  None

if __name__ == "__main__":
    main()