from goodies import json_encode, write_file
from script import GITHUB_OUTPUT_FILEPATH, GITHUB_USERNAME, LEETCODE_USERNAME, LEETCODE_OUTPUT_FILEPATH
from datetime import datetime, timezone
from dotenv import load_dotenv
from pathlib import Path
from typing import Any
import requests
import json
import os

env_path = Path(__file__).parent.parent.parent.parent / ".env"

if not os.path.exists(env_path):
    raise FileNotFoundError(f".env file missing! {env_path}")

load_dotenv(env_path)

TOKEN = os.environ["GITHUB_API_KEY"]

from_utc = datetime(2026, 5, 4, 17, 0, tzinfo = timezone.utc)
to_utc = datetime.now(tz = timezone.utc)

def github() -> dict[str, Any]:
    variables = {
        "login" : GITHUB_USERNAME,
        "from" : from_utc.isoformat(),
        "to" : to_utc.isoformat()
    }

    query = """
    query($login: String!, $from: DateTime, $to: DateTime) {
    user(login: $login) {
        contributionsCollection(from: $from, to: $to) {
        totalCommitContributions
        totalPullRequestContributions
        totalIssueContributions
        totalPullRequestReviewContributions
        contributionCalendar {
            totalContributions
            weeks {
            contributionDays {
                date
                contributionCount
            }
            }
        }
        }
    }
    }
    """

    response = requests.post(
        "https://api.github.com/graphql",
        json={"query": query, "variables": variables},
        headers={"Authorization": f"Bearer {TOKEN}"},
    )

    response.raise_for_status()
    return response.json()["data"]["user"]["contributionsCollection"]

def leetcode() -> dict[str, Any]:
    query = """
    query userProfileCalendar($username: String!, $year: Int) {
    matchedUser(username: $username) {
        userCalendar(year: $year) {
        activeYears
        streak
        totalActiveDays
        submissionCalendar
        }
    }
    }
    """

    response = requests.post(
        "https://leetcode.com/graphql",
        json={"query": query, "variables": {"username": LEETCODE_USERNAME, "year": 2026}},
        headers={"Referer": "https://leetcode.com", "User-Agent": "Mozilla/5.0"},
    )
    response.raise_for_status()
    raw_data = response.json()["data"]["matchedUser"]["userCalendar"]

    submissions = {datetime.fromtimestamp(int(timestamp), tz = timezone.utc) : amount for timestamp, amount in json.loads(raw_data["submissionCalendar"]).items()}

    data = {key : value for key, value in raw_data.items() if key != "submissionCalendar"}
    data.setdefault("submissionCalendar", {})
    data["submissionCalendar"] = submissions

    return data

def main () -> None:
    # data_str = json_encode(github())
    # write_file(data_str, GITHUB_OUTPUT_FILEPATH)
    leetcode_data = json_encode(leetcode())
    write_file(leetcode_data, LEETCODE_OUTPUT_FILEPATH)
    return None


if __name__ == "__main__":
    main()