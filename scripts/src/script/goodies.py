from pathlib import Path
from typing import Any

def write_file(text : str, filepath : str | Path) -> None:
    with open(filepath, "w", encoding = "utf-8") as f:
        f.write(text)

import json
import math
from typing import Any

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