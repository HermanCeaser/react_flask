from typing import List

from pydantic.dataclasses import dataclass

__all__ = ["OutputObject"]


@dataclass
class OutputObject:
    delay: int = None
    time: float = (None,)
    texts: List[str] = (None,)
    file_names: List[str] = (None,)
    byte_data_lengths: List[int] = (None,)
    webhook_endpoint: str = None
    tic: float = None
